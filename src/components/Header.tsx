import { Text, View, Image, StyleSheet, Pressable } from "react-native";
import React, { Component, useEffect, useState } from "react";
import { COLORS } from "../constants/colors";
import { useAuth } from "../contexts/AuthContext";
import NotificationIconCounter from "./NotificationIconCounter";
import { useUser } from "../contexts/UserContext";

export default function Header() {
  const { user } = useUser();
  const { logoutUser } = useAuth();

  return (
    <>
      <View style={styles.container}>
        {user && (
          <View style={styles.userContainer}>
            <Pressable onTouchStart={() => logoutUser()}>
              <Image
                source={{
                  uri: user?.profilePhotoURL ?? "",
                }}
                style={styles.userPhoto}
              />
            </Pressable>
            <View>
              <Text style={styles.title}>{user.name}</Text>
              <Text style={styles.subtitle}>
                {user.alreadyHavePartner
                  ? `💍 Com ${user.partnerName}`
                  : "Sem parceiro 😭"}{" "}
              </Text>
            </View>
          </View>
        )}
        <NotificationIconCounter />
      </View>
    </>
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
    justifyContent: "space-between",
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
  userContainer: {
    display: "flex",
    flexDirection: "row",
    gap: 10,
  },
  userPhoto: {
    width: 45,
    height: 45,
    borderRadius: 45,
  },
});
