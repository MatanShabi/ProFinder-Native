import { ThemedView } from "@/components/ThemedView";
import useUser from "@/hooks/useUser";
import { FC, useState, useEffect } from "react";
import { View, StyleSheet, Modal, TextInput, Alert } from "react-native";
import { Avatar, Text, IconButton, Button } from "react-native-paper";
import useSignUp from "@/hooks/useSignUp";

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

    const handleChangeProfilePicture = () => {
        console.log('Change profile picture');
    };

    if (!displayName) {
        return null;
    }

    return (
        <ThemedView>
            <View style={styles.container}>
                <Avatar.Image
                    size={120}
                    source={{ uri: user?.photoURL || 'https://via.placeholder.com/120' }}
                    style={styles.avatar}
                />
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
