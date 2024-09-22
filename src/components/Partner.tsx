import { View, Text, Image, StyleSheet } from "react-native";
import React from "react";
import Button from "./Button";
import { doc, setDoc, Timestamp } from "firebase/firestore";
import { db } from "../services/firebase-config";
import { useAuth } from "../contexts/AuthContext";
import { InviteTypes } from "../types/InviteTypes";
import { COLORS } from "../constants/colors";
import handleAcceptPartnerInvite from "../services/querys/handleAcceptPartnerInvite";
import { useUser } from "../contexts/UserContext";

type PartnerTypes = {
  uid: string;
  name: string;
  photoURL: string;
  description?: string;
  isAlreadyInvited?: boolean;
  isInvite?: boolean;
};

export default function Partner({
  uid,
  name,
  photoURL,
  isAlreadyInvited,
  description,
  isInvite = false,
}: PartnerTypes) {
  const { user } = useUser();

  async function handlePressButton() {
    if (isInvite) handleAcceptInvite();
    else handleInvitePartner(uid);
  }

  async function handleAcceptInvite() {
    try {
      await handleAcceptPartnerInvite(user?.uid ?? "", uid);
    } catch (error) {
      console.log(error);
    }
  }

  async function handleInvitePartner(partnerUid: string) {
    try {
      await setDoc(doc(db, "invites", `${user?.uid ?? ""}${partnerUid}`), {
        inviteAccepted: false,
        inviteDate: Timestamp.now(),
        uidInvited: partnerUid,
        uidInviter: user?.uid,
      } as InviteTypes);
    } catch (error) {
      console.log(error);
    }
  }

  function getButtonText() {
    if (isInvite) {
      return "Aceitar";
    } else {
      return isAlreadyInvited ? "Enviado" : "Convidar";
    }
  }

  return (
    <View style={styles.container}>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          gap: 10,
        }}
      >
        <Image style={styles.userImage} source={{ uri: photoURL }} />
        <View>
          <Text>{name}</Text>
          {description && (
            <Text style={styles.descriptionText}>{description}</Text>
          )}
        </View>
      </View>
      <View>
        <Button
          size="small"
          title={getButtonText()}
          onPress={() => {
            handlePressButton();
          }}
          disabled={isAlreadyInvited}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  userImage: {
    width: 45,
    height: 45,
    borderRadius: 45,
  },
  descriptionText: {
    fontSize: 12,
    color: COLORS.primaryGray,
  },
});
