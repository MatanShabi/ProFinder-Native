import React from "react";
import { ThemedView } from "@/components/ThemedView";
import useLogout from "@/hooks/useLogout";

const LogoutScreen = () => {
    const { showAlert, isLoading, isError, error } = useLogout();

    if (isLoading) {
        return <ThemedView>Loading...</ThemedView>;
    }

    if (isError && error) {
        return <ThemedView>Error: {error}</ThemedView>;
    }

    return (
        <ThemedView>
        </ThemedView>
    );
};

export default LogoutScreen;
