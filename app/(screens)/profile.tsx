import { FC, useState } from "react";
import { View, StyleSheet, Modal, TextInput, TouchableOpacity, Alert } from "react-native";
import { Avatar, Text, IconButton, Button } from "react-native-paper";
import { ThemedView } from "@/components/ThemedView";
import useProfile from "@/hooks/useProfile";
import ErrorNotification from "@/components/ErrorNotification";

const ProfileScreen: FC = () => {
    const {
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
        handleCancel,
        handleChangeProfilePicture,
        setModalVisible,
    } = useProfile();

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
                        {displayName}
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
                            value={modalName ?? ''}
                            onChangeText={setModalName}
                            style={styles.input}
                        />
                        <View style={styles.modalButtons}>
                            <Button mode="outlined" onPress={handleSave} disabled={isLoading}>
                                Save
                            </Button>
                            <Button mode="outlined" onPress={handleCancel} disabled={isLoading}>
                                Cancel
                            </Button>
                        </View>
                    </View>
                </View>
            </Modal>

            {isError &&
                <ErrorNotification visible={isError} errorMessage={errorMessage}
                    onDismiss={() => { setIsError(false) }} />}
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
    errorText: {
        color: 'red',
        marginTop: 10,
    },
});

export default ProfileScreen;
