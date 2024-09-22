import { View, Text, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import { COLORS } from "../constants/colors";
import NotificationsModal from "./modals/Notifications/NotificationsModal";
import { useNotification } from "../contexts/NotificationContext";

export default function NotificationIconCounter() {
  const { notifications, notificationCount } = useNotification();
  const [notificationModalIsOpen, setNotificationModalIsOpen] = useState(false);

  return (
    <>
      <View>
        <Ionicons
          name="notifications"
          size={30}
          color={COLORS.textDark}
          onPress={() => {
            setNotificationModalIsOpen(true);
          }}
        />
        <View
          style={[
            styles.notificationBadgeCounter,
            notificationCount == 0 ? { display: "none" } : {},
          ]}
        >
          <Text style={{ color: "white", fontSize: 10 }}>
            {notificationCount}
          </Text>
        </View>
      </View>
      <NotificationsModal
        isOpen={notificationModalIsOpen}
        setIsOpen={(x) => setNotificationModalIsOpen(x)}
      />
    </>
  );
}

const styles = StyleSheet.create({
  notificationBadgeCounter: {
    backgroundColor: COLORS.UTILITIES.red,
    width: 15,
    height: 15,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
    position: "absolute",
    top: 0,
    right: 0,
  },
});
