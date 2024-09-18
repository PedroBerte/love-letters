import { Text, View, Image, StyleSheet } from "react-native";
import React, { Component, useEffect, useState } from "react";
import { COLORS } from "../constants/colors";
import { useAuth } from "../contexts/AuthContext";
import NotificationsModal from "./modals/Notifications/NotificationsModal";
import Ionicons from "@expo/vector-icons/Ionicons";
import NotificationIconCounter from "./NotificationIconCounter";

export default function Header() {
  const { user } = useAuth();

  return (
    <>
      <View style={styles.container}>
        {user && (
          <View style={styles.userContainer}>
            <Image
              source={{
                uri: user?.profilePhotoURL ?? "",
              }}
              style={styles.userPhoto}
            />
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
