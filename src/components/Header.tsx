import { Text, View, Image, StyleSheet } from "react-native";
import React, { Component } from "react";
import image from "./../../assets/favicon.png";

export default function Header() {
  return (
    <View style={styles.container}>
      <Image source={image} width={30} height={30} />
      <View>
        <Text>Pedro Bertelli</Text>
        <Text>💍 Com Larissa Lima</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    marginVertical: 8,
  },
});
