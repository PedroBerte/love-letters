import { Text, View, Image, StyleSheet } from "react-native";
import React, { Component, useEffect, useState } from "react";
import image from "./../../assets/favicon.png";
import { COLORS } from "../constants/colors";
import { auth } from "../services/firebase-config";
import { User } from "firebase/auth";

export default function Header() {
  const [user, setUser] = useState<User>();

  useEffect(() => {
    if (auth.currentUser) setUser(auth.currentUser);
  }, [auth]);

  return (
    <View style={styles.container}>
      {user && (
        <>
          <Image
            source={{
              uri: user?.photoURL ?? "",
            }}
            style={styles.userPhoto}
          />
          <View>
            <Text style={styles.title}>{user.displayName}</Text>
            <Text style={styles.subtitle}>💍 Com Larissa Lima</Text>
          </View>
        </>
      )}
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
  userPhoto: {
    width: 45,
    height: 45,
    borderRadius: 45,
  },
});
