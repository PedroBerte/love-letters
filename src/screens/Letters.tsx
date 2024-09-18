import { View, Text, StyleSheet } from "react-native";
import React, { useEffect } from "react";
import { COLORS } from "../constants/colors";
import Ionicons from "@expo/vector-icons/Ionicons";

export default function Letters() {
  const [dots, setDots] = React.useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      setDots((prevDots) => (prevDots.length < 3 ? prevDots + "." : ""));
    }, 500);

    return () => clearInterval(interval);
  }, []);

  return (
    <View style={styles.screenContainer}>
      <Ionicons
        name="construct"
        size={35}
        color={COLORS.textDark}
        onPress={() => {}}
      />
      <Text>Em construção{dots}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  screenContainer: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.background,
    flex: 1,
  },
});
