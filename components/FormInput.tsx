import React, { FC } from "react";
import {
  NativeSyntheticEvent,
  StyleSheet,
  TextInputChangeEventData,
  View,
} from "react-native";
import { Text, TextInput } from "react-native-paper";

interface FormInputProps {
  label: string;
  value: string;
  placeholder: string;
  onChange: (e: NativeSyntheticEvent<TextInputChangeEventData>) => void;
}

const FormInput: FC<FormInputProps> = ({
  label,
  placeholder,
  value,
  onChange,
}) => {
  return (
    <View>
      <Text variant="bodyLarge">{label}</Text>
      <TextInput
        mode="outlined"
        value={value}
        placeholder={placeholder}
        style={styles.input}
        onChange={onChange}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    backgroundColor: "#1E1E2D",
  },
});

export default FormInput;
