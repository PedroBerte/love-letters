import { View, Text, StyleSheet, Pressable } from "react-native";
import React from "react";
import { COLORS } from "../constants/colors";
import { signOut } from "firebase/auth";
import { auth } from "../services/firebase-config";

export default function Home() {
  return (
    <View style={styles.screenContainer}>
      <Text>Home</Text>
      <Pressable
        onPress={() => {
          signOut(auth);
        }}
      >
        <Text>teste</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  screenContainer: {
    backgroundColor: COLORS.background,
    flex: 1,
  },
});
