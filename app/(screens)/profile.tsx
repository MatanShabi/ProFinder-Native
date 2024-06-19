import { ThemedView } from "@/components/ThemedView";
import useUser from "@/hooks/useUser";
import { FC, useState, useEffect } from "react";
import { TouchableOpacity, View, StyleSheet, Modal, TextInput, Alert } from "react-native";
import { Avatar, Text, IconButton, Button } from "react-native-paper";
import useSignUp from "@/hooks/useSignUp";
import * as ImagePicker from 'expo-image-picker';


import storage from '@react-native-firebase/storage';

const ProfileScreen: FC = () => {
    const { user } = useUser();

    const { updateUserProfile } = useSignUp();
    const [displayName, setDisplayName] = useState<string | undefined>(undefined);
    const [modalName, setModalName] = useState<string | undefined>(undefined);
    const [modalVisible, setModalVisible] = useState(false);

    useEffect(() => {
        if (user && user.displayName) {
            setDisplayName(user.displayName);
            setModalName(user.displayName);
        }
    }, [user]);

    const handleEdit = () => {
        setModalVisible(true);
    };

    const handleChange = (text: string) => {
        setModalName(text);
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
        console.log("REUT");

        const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (!permissionResult.granted) {
            Alert.alert('Permission Denied', 'Permission to access photo library is required.');
            return;
        }

        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1],
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
            const fileName = assetUri.substring(assetUri.lastIndexOf('/') + 1);
            // const reference = storage().ref(`/profile_pictures/${user.uid}/${fileName}`);
            console.log("fileName", fileName)
            // Upload the file to Firebase Storage
            // const task = reference.putFile(assetUri);

            // task.on('state_changed', taskSnapshot => {
            //     console.log(`${taskSnapshot.bytesTransferred} transferred out of ${taskSnapshot.totalBytes}`);
            // });

            // await task;
            // const downloadURL = await reference.?getDownloadURL();
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
                            source={{ uri: user?.photoURL || 'https://via.placeholder.com/120' }}
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
