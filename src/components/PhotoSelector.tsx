import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { COLORS } from "../constants/colors";
//import CameraIcon from "../svgs/CameraIcon.svg";

type PhotoTypes = {
  size: number;
};

export default function PhotoSelector({ size }: PhotoTypes) {
  const styles = StyleSheet.create({
    container: {
      width: size,
      height: size,
      borderColor: COLORS.secondaryGray,
      borderRadius: size,
      borderWidth: 2,
    },
  });

  return (
    <View style={styles.container}>
      {/* <CameraIcon width={30} height={30} stroke={COLORS.textDark} /> */}
    </View>
  );
}
