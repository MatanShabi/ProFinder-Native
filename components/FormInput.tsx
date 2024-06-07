import React, { FC } from 'react';
import { StyleSheet, View } from 'react-native';
import { Text, TextInput } from 'react-native-paper';

interface FormInputProps {
    label: string;
    placeholder: string;
}

const FormInput: FC<FormInputProps> = ({ label, placeholder }) => {
    return (
        <View>
            <Text variant='bodyLarge'>{label}</Text>
            <TextInput
                mode='outlined'
                placeholder={placeholder}
                style={styles.input}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    input: {
        backgroundColor: '#1E1E2D',
    },
});

export default FormInput;
