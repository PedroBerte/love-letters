import { View, Text, Image, StyleSheet } from "react-native";
import React from "react";

type PartnerTypes = {
  name: string;
  photoURL: string;
};

export default function Partner({ name, photoURL }: PartnerTypes) {
  return (
    <View style={styles.container}>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          gap: 10,
        }}
      >
        <Image style={styles.userImage} source={{ uri: photoURL }} />
        <Text>{name}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    justifyContent: "space-between",
  },
  userImage: {
    width: 50,
    height: 50,
    borderRadius: 50,
  },
});
