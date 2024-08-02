import { View, Text, Pressable, StyleSheet } from "react-native";
import React from "react";
import { COLORS } from "../constants/colors";

type buttonProps = {
  onPress: () => any;
  title: string;
};

export default function Button({ onPress, title }: buttonProps) {
  return (
    <Pressable style={styles.button} onPress={onPress}>
      <Text style={styles.text}>{title}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    borderRadius: 6,
    backgroundColor: COLORS.primaryPink,
    width: "100%",
  },
  text: {
    fontSize: 16,
    fontFamily: "Poppins-Bold",
    lineHeight: 21,
    color: "white",
  },
});
