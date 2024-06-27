import React, { useState } from "react";
import { ThemedView } from "@/components/ThemedView";
import { ActivityIndicator } from "react-native-paper";
import useLogout from "@/hooks/useLogout";
import ErrorNotification from "@/components/ErrorNotification";

const LogoutScreen = () => {
  const { showAlert, isLoading, isError, error } = useLogout();
  const [errorMessage, setErrorMessage] = useState("");
  const [snackbarVisible, setSnackbarVisible] = useState(false);

  if (isLoading) {
    return (
      <ThemedView>
        <ActivityIndicator animating={true} size="large" />
      </ThemedView>
    );
  }

  if (isError && error) {
    setSnackbarVisible(true);
    setErrorMessage(error);
  }

  return (
    <ThemedView>
      <ErrorNotification
        visible={snackbarVisible}
        errorMessage={errorMessage}
        onDismiss={() => {
          setSnackbarVisible(false);
        }}
      />
    </ThemedView>
  );
};

export default LogoutScreen;
