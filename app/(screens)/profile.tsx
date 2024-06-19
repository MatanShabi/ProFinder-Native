import { ThemedView } from "@/components/ThemedView";
import useUser from "@/hooks/useUser";
import { FC } from "react";
import { View, StyleSheet } from "react-native";
import { Avatar, Text, IconButton } from "react-native-paper";

const ProfileScreen: FC = () => {
    const { user } = useUser();
    console.log('User:', user);

    const handleEdit = () => {
        // Implement the edit functionality here
        // It can involve navigation to another screen or opening a modal
    };

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
                    {user?.displayName || 'User Name'}
                </Text>
                <IconButton
                    icon="pencil"
                    size={24}
                    onPress={handleEdit}
                    style={styles.editButton}
                />
            </View>
        </View>
        </ThemedView >
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
});

export default ProfileScreen;
