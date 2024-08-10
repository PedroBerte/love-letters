import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { COLORS } from "../constants/colors";

export default function Home() {
  return (
    <View style={styles.screenContainer}>
      <Text>Home</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  screenContainer: {
    backgroundColor: COLORS.background,
    flex: 1,
  },
});
