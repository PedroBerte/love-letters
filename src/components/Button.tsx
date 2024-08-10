import {
  View,
  Text,
  Pressable,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import React from "react";
import { COLORS } from "../constants/colors";

type buttonProps = {
  onPress: () => any;
  title: string;
  isLoading?: boolean;
};
export default function Button({
  onPress,
  title,
  isLoading = false,
}: buttonProps) {
  return (
    <Pressable style={styles.button} onPress={onPress}>
      {!isLoading ? (
        <Text style={styles.text}>{title}</Text>
      ) : (
        <ActivityIndicator
          animating={isLoading}
          style={{ transform: [{ scaleX: 1.5 }, { scaleY: 1.5 }] }}
          color="white"
        />
      )}
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
