import { useState, useEffect } from 'react';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { Alert } from "react-native";
import { storage } from '@/config/firebase';
import { deleteUser } from "firebase/auth";
import { auth } from "@/config/firebase";
import * as ImagePicker from 'expo-image-picker';
import useUser from '@/hooks/useUser';
import useSignUp from '@/hooks/useSignUp';
import { generateRandomName } from "../scripts/generateRandomName";

const useProfile = () => {
    const { user } = useUser();
    const { updateUserProfile } = useSignUp();
    const [displayName, setDisplayName] = useState<string>('');
    const [modalName, setModalName] = useState<string>('');
    const [modalVisible, setModalVisible] = useState<boolean>(false);
    const [imageUrl, setImageUrl] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isError, setIsError] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string>('');

    useEffect(() => {
        if (user) {
            setDisplayName(user.displayName || '');
            setModalName(user.displayName || '');
            setImageUrl(user.photoURL || 'https://via.placeholder.com/120');
        }
    }, [user]);

    const handleEdit = () => {
        setModalVisible(true);
    };

    const handleSave = async () => {
        if (!modalName.trim()) {
            setIsError(true);
            setErrorMessage('Display name cannot be empty.');
            return;
        }
        try {
            setIsLoading(true);
            await updateUserProfile(user!, modalName, '', imageUrl || '');
            setDisplayName(modalName);
            setModalVisible(false);
        } catch (error) {
            setIsError(true);
            setErrorMessage('Failed to update profile');
        } finally {
            setIsLoading(false);
        }
    };

    const handleCancel = () => {
        setModalName(displayName);
        setModalVisible(false);
    };

    const handleDelete = async () => {
        Alert.alert(
            "Confirm Deletion",
            "Are you sure you want to delete the account?",
            [
                {
                    text: "Cancel",
                    style: "cancel",
                },
                {
                    text: "Delete",
                    style: "destructive",
                    onPress: async () => {
                        setIsLoading(true);
                        setIsError(false);
                        console.log('Deleting user account...');
                        try {
                            if (user) {
                                await deleteUser(user);
                            } 
                            console.log('User account deleted successfully.');
                        } catch (error: any) { 
                            setIsError(true);
                            setErrorMessage(error.message || 'Failed to delete user account. Please try again later.');
                        } finally {
                            setIsLoading(false);
                        }
                    },
                },
            ],
            { cancelable: true }
        );
    };

    const handleChangeProfilePicture = async () => {
        try {
            const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (!permissionResult.granted) {
                setIsError(true);
                setErrorMessage('Permission to access photo library is required.');
                return;
            }

            const result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                quality: 1,
            });

            if (result.canceled || !result.assets || !result.assets[0].uri) {
                return;
            }

            setIsLoading(true);
            const assetUri = result.assets[0].uri;
            const blob = await uriToBlob(assetUri);
            const fileName = generateRandomName() + '.png';
            const storageRef = ref(storage, `profilePictures/${fileName}`);
            await uploadBytes(storageRef, blob as Blob | Uint8Array | ArrayBuffer);
            const downloadURL = await getDownloadURL(storageRef);
            setImageUrl(downloadURL);
            if (user && displayName) {
                await updateUserProfile(user, displayName, '', downloadURL);
            }
        } catch (error) {
            setIsError(true);
            setErrorMessage('Failed to upload image');
        } finally {
            setIsLoading(false);
        }
    };

    const uriToBlob = (uri: string): Promise<Blob> => {
        return new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.onload = function () {
                resolve(xhr.response);
            };
            xhr.onerror = function () {
                reject(new Error('uriToBlob failed'));
            };
            xhr.responseType = 'blob';
            xhr.open('GET', uri, true);
            xhr.send(null);
        });
    };

    return {
        displayName,
        modalName,
        imageUrl,
        modalVisible,
        isLoading,
        isError,
        errorMessage,
        setModalName,
        setIsError,
        handleEdit,
        handleSave,
        handleDelete,
        handleCancel,
        handleChangeProfilePicture,
        setModalVisible,
    };
};

export default useProfile;
