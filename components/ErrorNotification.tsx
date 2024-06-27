import React from "react";
import { Text, StyleSheet, View } from "react-native";
import { Snackbar, useTheme } from "react-native-paper";

interface ErrorSnackbarProps {
  visible: boolean;
  onDismiss?: () => void;
  errorMessage: string;
}

const ErrorNotification: React.FC<ErrorSnackbarProps> = ({
  visible,
  onDismiss = () => {},
  errorMessage,
}) => {
  const theme = useTheme();

  if (!visible) {
    return null;
  }

  return (
    <View style={styles.container}>
      <Snackbar
        visible={visible}
        onDismiss={onDismiss}
        duration={3000}
        style={[styles.snackbar, { backgroundColor: theme.colors.error }]}
        action={{
          label: "Dismiss",
          onPress: onDismiss,
          color: "#000",
        }}
      >
        <Text style={styles.errorText}>{errorMessage}</Text>
      </Snackbar>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 999,
    elevation: 6,
  },
  snackbar: {
    borderRadius: 8,
  },
  errorText: {
    color: "#000",
  },
});

export default ErrorNotification;
