import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Snackbar, useTheme } from 'react-native-paper';

interface ErrorSnackbarProps {
  visible: boolean;
  onDismiss: () => void;
  errorMessage: string;
}

const ErrorNotification: React.FC<ErrorSnackbarProps> = ({ visible, onDismiss, errorMessage }) => {
    const theme = useTheme();

    return (
        <Snackbar
            visible={visible}
            onDismiss={onDismiss}
            duration={2000}
            style={[styles.snackbar, { backgroundColor: theme.colors.error }]}
            action={{
                label: 'Dismiss',
                onPress: onDismiss,
                color: '#000',
            }}
        >
            <Text style={styles.errorText}>{errorMessage}</Text>
        </Snackbar>
    );
};

const styles = StyleSheet.create({
    snackbar: {
        position: 'absolute',
        bottom: 16,
        marginHorizontal: 16,
        borderRadius: 8,
    },
    errorText: {
        color: '#000',
    },
});

export default ErrorNotification;