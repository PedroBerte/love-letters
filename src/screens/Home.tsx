import { View, Text, StyleSheet, Pressable } from "react-native";
import React from "react";
import { COLORS } from "../constants/colors";
import { signOut } from "firebase/auth";
import { auth } from "../services/firebase-config";
import PartnerSelectorModal from "../components/modals/PartnerSelector/PartnerSelectorModal";
import deleteStorageUserData from "../utils/deleteStorageUserData";
import { useAuth } from "../contexts/AuthContext";
import Notifications from "../components/modals/Notifications/NotificationsModal";
import getStorageUserData from "../utils/getStorageUserData";

export default function Home() {
  const { logoutUser } = useAuth();
  return (
    <View style={styles.screenContainer}>
      <Text>Home</Text>
      <Pressable
        onPress={async () => {
          await logoutUser();
        }}
      >
        <Text>teste</Text>
      </Pressable>
      <PartnerSelectorModal />
    </View>
  );
}

const styles = StyleSheet.create({
  screenContainer: {
    backgroundColor: COLORS.background,
    flex: 1,
  },
});
