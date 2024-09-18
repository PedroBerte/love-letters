import { View, Text } from "react-native";
import React, { useState } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import { COLORS } from "../constants/colors";
import NotificationsModal from "./modals/Notifications/NotificationsModal";

export default function NotificationIconCounter() {
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
          style={{
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
          }}
        >
          <Text style={{ color: "white", fontSize: 10 }}>5</Text>
        </View>
      </View>
      <NotificationsModal
        isOpen={notificationModalIsOpen}
        setIsOpen={(x) => setNotificationModalIsOpen(x)}
      />
    </>
  );
}
