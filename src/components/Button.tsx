import {
  View,
  Text,
  Pressable,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import React, { useState } from "react";
import { COLORS } from "../constants/colors";

type buttonProps = {
  onPress: () => any;
  title: string;
  isLoading?: boolean;
  size?: "small" | "medium" | "large";
  backgroundColor?: string;
  disabled?: boolean;
};

type stylesProps = {
  fontSize: number;
  horizontalPadding?: number;
  verticalPadding?: number;
};

export default function Button({
  onPress,
  title,
  isLoading = false,
  size,
  backgroundColor,
  disabled = false,
}: buttonProps) {
  function getStyles(size?: string): stylesProps {
    switch (size) {
      case "small":
        return {
          fontSize: 14,
          verticalPadding: 6,
          horizontalPadding: 8,
        };
      case "medium":
        return {
          fontSize: 16,
          verticalPadding: 8,
          horizontalPadding: 10,
        };
      case "large":
        return {
          fontSize: 18,
          verticalPadding: 10,
          horizontalPadding: 12,
        };
      default:
        return {
          fontSize: 16,
          verticalPadding: 8,
          horizontalPadding: 10,
        };
    }
  }

  const styles = StyleSheet.create({
    button: {
      alignItems: "center",
      justifyContent: "center",
      paddingVertical: getStyles(size).verticalPadding,
      paddingHorizontal: getStyles(size).horizontalPadding,
      borderRadius: 6,
      backgroundColor: backgroundColor ?? COLORS.primaryPink,
      opacity: disabled ? 0.7 : 1,
      width: "100%",
    },
    text: {
      fontSize: getStyles(size).fontSize,
      fontFamily: "Poppins-Bold",
      lineHeight: 21,
      color: "white",
    },
  });

  return (
    <Pressable style={styles.button} disabled={disabled} onTouchEnd={onPress}>
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
