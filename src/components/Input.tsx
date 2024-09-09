import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TextInputProps,
} from "react-native";
import React from "react";
import { COLORS } from "../constants/colors";

interface InputProps extends TextInputProps {
  label?: string;
  inputInfo?: string;
  inputError?: string;
  required?: boolean;
}

export default function Input({
  label,
  placeholder,
  inputInfo,
  inputError,
  required,
  ...textInputProps
}: InputProps) {
  return (
    <View style={styles.inputContainer}>
      {label && (
        <Text style={styles.inputLabel}>
          {label} <Text style={{ color: "red" }}>*</Text>
        </Text>
      )}

      <TextInput
        style={styles.input}
        placeholder={placeholder}
        {...textInputProps}
      />
      <View style={{ width: "100%", alignItems: "flex-end" }}>
        <Text style={inputInfo ? styles.inputInfo : { display: "none" }}>
          {inputInfo}
        </Text>
      </View>
      <View style={{ width: "100%", alignItems: "flex-start" }}>
        <Text style={inputError ? styles.inputError : { display: "none" }}>
          {inputError}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    width: "100%",
    gap: 2,
  },
  input: {
    backgroundColor: "white",
    width: "100%",
    padding: 9,
    borderRadius: 8,
    fontFamily: "Poppins-Regular",
    lineHeight: 21,
    borderColor: COLORS.borderGray,
    borderWidth: 1,
  },
  inputLabel: {
    fontFamily: "Poppins-Regular",
    fontSize: 12,
  },
  inputInfo: {
    fontSize: 11,
    color: COLORS.primaryGray,
    marginLeft: 2,
    marginBottom: -12,
  },
  inputError: {
    fontSize: 11,
    color: COLORS.UTILITIES.red,
    marginLeft: 2,
  },
});
