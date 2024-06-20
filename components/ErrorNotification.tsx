import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Snackbar, useTheme } from 'react-native-paper';

interface ErrorNotificationProps {
    error: string;
    onClose: () => void;
}

const ErrorNotification: React.FC<ErrorNotificationProps> = ({ error, onClose }) => {
    const theme = useTheme();
    const [visible, setVisible] = useState<boolean>(!!error);

    const onDismissSnackBar = () => {
        setVisible(false);
        onClose();
    };

    return (
        <Snackbar
            visible={visible}
            onDismiss={onDismissSnackBar}
            duration={Snackbar.DURATION_LONG}
            style={[styles.snackbar, { backgroundColor: theme.colors.error }]}
            action={{
                label: 'Dismiss',
                onPress: onDismissSnackBar,
                color: '#fff',
            }}
        >
            <Text style={styles.errorText}>{error}</Text>
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
        color: '#fff',
    },
});

export default ErrorNotification;
