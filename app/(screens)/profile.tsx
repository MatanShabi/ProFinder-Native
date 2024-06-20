import { ThemedView } from "@/components/ThemedView";
import useUser from "@/hooks/useUser";
import { FC, useState, useEffect } from "react";
import { TouchableOpacity, View, StyleSheet, Modal, TextInput, Alert } from "react-native";
import { Avatar, Text, IconButton, Button } from "react-native-paper";
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from "../../config/firebase";
import useSignUp from "@/hooks/useSignUp";
import * as ImagePicker from 'expo-image-picker';

const ProfileScreen: FC = () => {
    const { user } = useUser();

    const { updateUserProfile } = useSignUp();
    const [displayName, setDisplayName] = useState<string | undefined>(undefined);
    const [modalName, setModalName] = useState<string | undefined>(undefined);
    const [modalVisible, setModalVisible] = useState(false);
    const [imageUrl, setImageUrl] = useState<string | null>(user?.photoURL || `https://via.placeholder.com/120`);


    useEffect(() => {
        if (user && user.displayName) {
            setDisplayName(user.displayName);
            setModalName(user.displayName);
            setImageUrl(user.photoURL || `https://via.placeholder.com/120`);
        }
    }, [user]);

    const handleEdit = () => {
        setModalVisible(true);
        console.log('user', user   )
    };

    const handleChange = (text: string) => {
        setModalName(text);
    };

    const uriToBlob = (uri: string) => {
        return new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest()
            xhr.onload = function () {
                resolve(xhr.response)
            }
            xhr.onerror = function () {
                reject(new Error('uriToBlob failed'))
            }
            xhr.responseType = 'blob'
            xhr.open('GET', uri, true)

            xhr.send(null)
        })
    }

    const generateRandomName = () => {
        const characters = '0123456789abcdefghijklmnop';
        let result = '';
        for (let i = 0; i < 40; i++) {
            result += characters.charAt(Math.floor(Math.random() * characters.length));
        }
        return result + '.png';
    };


    const handleSave = () => {
        if (modalName && modalName.trim().length > 0) {
            if (user) {
                setDisplayName(modalName);
                updateUserProfile(user, modalName, '', user.photoURL || 'https://via.placeholder.com/120');
            }
            setModalVisible(false);
        } else {
            Alert.alert('Invalid Name', 'Display name cannot be empty.');
        }
    };

    const handleCancel = () => {
        setModalName(displayName);
        setModalVisible(false);
    };



    const handleChangeProfilePicture = async () => {
        const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (!permissionResult.granted) {
            Alert.alert('Permission Denied', 'Permission to access photo library is required.');
            return;
        }

        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            quality: 1,
        });

        if (result.canceled) {
            return;
        }

        if (!user || !result.assets || !result.assets[0].uri) {
            Alert.alert('Error', 'User is not logged in or image selection failed.');
            return;
        }

        try {
            const assetUri = result.assets[0].uri;
            const blob = await uriToBlob(assetUri)
            const fileName = generateRandomName();
            const storageRef = ref(storage, `profilePictures/${fileName}`);

            await uploadBytes(storageRef, blob as Blob | Uint8Array | ArrayBuffer);
            const downloadURL = await getDownloadURL(storageRef);
            setImageUrl(downloadURL);
            if (user.displayName && user.displayName.trim().length > 0) {
                updateUserProfile(user, user.displayName, '', downloadURL || 'https://via.placeholder.com/120');
            }
        }
        catch (error) {
            console.error(error);
            Alert.alert('Upload failed', 'Could not upload the image. Please try again.');
        }
    }
    if (!displayName) {
        return null;
    }

    return (
        <ThemedView>
            <View style={styles.container}>
                <TouchableOpacity onPress={handleChangeProfilePicture}>
                    <Avatar.Image
                        size={120}
                        source={{ uri: imageUrl || 'https://via.placeholder.com/120' }}
                        style={styles.avatar}
                    />
                </TouchableOpacity>
                <View style={styles.infoContainer}>
                    <Text variant="titleLarge" style={styles.name}>
                        {displayName || 'User Name'}
                    </Text>
                    <IconButton
                        icon="pencil"
                        size={24}
                        onPress={handleEdit}
                        style={styles.editButton}
                    />
                </View>
            </View>

            <Modal
                visible={modalVisible}
                animationType="slide"
                transparent={true}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text>Edit Display Name</Text>
                        <TextInput
                            value={modalName || ''}
                            onChangeText={handleChange}
                            style={styles.input}
                        />
                        <View style={styles.modalButtons}>
                            <Button mode="outlined" onPress={handleSave}>Save</Button>
                            <Button mode="outlined" onPress={handleCancel}>Cancel</Button>
                        </View>
                    </View>
                </View>
            </Modal>
        </ThemedView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        padding: 16,
    },
    avatar: {
        marginBottom: 16,
    },
    infoContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    name: {
        marginRight: 8,
    },
    editButton: {
        marginLeft: 8,
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        elevation: 5,
        minWidth: 300,
    },
    input: {
        borderBottomWidth: 1,
        borderColor: '#ccc',
        marginBottom: 10,
        paddingVertical: 5,
    },
    modalButtons: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginTop: 10,
    },
});

export default ProfileScreen;
