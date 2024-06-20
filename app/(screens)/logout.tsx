import React from "react";
import { ThemedView } from "@/components/ThemedView";
import { ActivityIndicator } from "react-native-paper";
import useLogout from "@/hooks/useLogout";
import ErrorNotification from "@/components/ErrorNotification";

const LogoutScreen = () => {
    const { showAlert, isLoading, isError, error } = useLogout();

    if (isLoading) {
        return (<ThemedView>
            <ActivityIndicator animating={true} size="large" />
        </ThemedView>);
    }

    if (isError && error) {
        return (<ThemedView>
            <ErrorNotification error={error} onClose={() => { }} />
        </ThemedView>

        )
    }

    return (
        <ThemedView>
        </ThemedView>
    );
};

export default LogoutScreen;