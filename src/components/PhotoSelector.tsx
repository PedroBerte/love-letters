import { View, Text, StyleSheet, Pressable, Image } from "react-native";
import React, { useState } from "react";
import { COLORS } from "../constants/colors";
import CameraIcon from "../svgs/CameraIcon.svg";
import UploadIcon from "../svgs/UploadIcon.svg";
import * as ImagePicker from "expo-image-picker";
import updateProfilePicture from "../services/requests/insertProfilePicture";

type PhotoTypes = {
  size: number;
  setPhotoUriSelected: (uri: string) => void;
};

export default function PhotoSelector({
  size,
  setPhotoUriSelected,
}: PhotoTypes) {
  const [image, setImage] = useState("");
  const styles = StyleSheet.create({
    container: {
      width: size,
      height: size,
    },
    photoContainer: {
      width: size,
      height: size,
      borderColor: COLORS.secondaryGray,
      backgroundColor: COLORS.secondaryGray,
      borderRadius: size,
      borderWidth: 2,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    uploadIcon: {
      position: "absolute",
      width: size / 4,
      height: size / 4,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      bottom: 1,
      right: 1,
      borderRadius: size / 4,
      backgroundColor: COLORS.primaryPink,
    },
    image: {
      width: size,
      height: size,
      borderRadius: size,
    },
  });

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [3, 3],
      quality: 1,
    });
    if (!result.canceled) {
      setPhotoUriSelected(result.assets[0].uri);
      setImage(result.assets[0].uri);
    }
  };

  return (
    <Pressable style={styles.photoContainer} onPress={() => pickImage()}>
      {image ? (
        <Image style={styles.image} source={{ uri: image }} />
      ) : (
        <>
          <CameraIcon width={40} height={40} stroke={COLORS.primaryBrown} />
          <View style={styles.uploadIcon}>
            <UploadIcon height={30} fill={"#fff"} />
          </View>
        </>
      )}
    </Pressable>
  );
}
