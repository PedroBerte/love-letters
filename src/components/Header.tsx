import { Text, View, Image, StyleSheet } from "react-native";
import React, { Component } from "react";
import image from "./../../assets/favicon.png";
import { COLORS } from "../constants/colors";

export default function Header() {
  return (
    <View style={styles.container}>
      <Image source={image} width={30} height={30} />
      <View>
        <Text style={styles.title}>Pedro Bertelli</Text>
        <Text style={styles.subtitle}>💍 Com Larissa Lima</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    marginVertical: 8,
    paddingHorizontal: 12,
    gap: 12,
    alignItems: "center",
  },
  title: {
    fontFamily: "Poppins-Regular",
    fontSize: 16,
    marginBottom: -4,
  },
  subtitle: {
    fontFamily: "Poppins-Regular",
    fontSize: 12,
    color: COLORS.primaryGray,
  },
});
