import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { COLORS } from "../constants/colors";

export default function Goals() {
  return (
    <View style={styles.screenContainer}>
      <Text>Goals</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  screenContainer: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.background,
    flex: 1,
  },
});
