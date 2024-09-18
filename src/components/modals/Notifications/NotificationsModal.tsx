import { View, Text, Modal, ScrollView, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import { COLORS } from "../../../constants/colors";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useAuth } from "../../../contexts/AuthContext";
import { query, collection, where } from "firebase/firestore";
import { db } from "../../../services/firebase-config";
import getResultFromQuery from "../../../services/querys/getResultsFromQuery";
import { InviteTypes } from "../../../types/InviteTypes";
import Partner from "../../Partner";
import { UserTypes } from "../../../types/UserTypes";
import moment from "moment";
import { Timestamp } from "firebase/firestore";

type NotificationTypes = {
  setIsOpen: (isOpen: boolean) => void;
  isOpen: boolean;
};

export default function NotificationsModal(props: NotificationTypes) {
  const { user } = useAuth();

  const [invites, setInvites] = useState<InviteTypes[]>();
  const [partners, setPartners] = useState<UserTypes[]>();

  useEffect(() => {
    async function getInvites() {
      var invites = await getResultFromQuery<InviteTypes>(
        query(collection(db, "invites"), where("uidInvited", "==", user?.uid))
      );
      setInvites(invites);

      var partners = await getResultFromQuery<UserTypes>(
        query(
          collection(db, "users"),
          where(
            "uid",
            "in",
            invites?.map((x) => x.uidInviter)
          )
        )
      );
      setPartners(partners);
    }
    getInvites();
  }, []);

  return (
    <View style={styles.container}>
      <Modal visible={props.isOpen} transparent={true} animationType="fade">
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <View style={styles.modalHeader}>
              <View>
                <Text style={styles.modalTitle}>Suas Notificações 📩</Text>
              </View>
              <Ionicons
                name="close"
                size={30}
                color={COLORS.textDark}
                onPress={() => props.setIsOpen(false)}
              />
            </View>
            <ScrollView style={{ maxHeight: 350 }}>
              <View style={styles.invitesContainer}>
                {invites ? (
                  invites?.map((invite, index) => {
                    if (invite.inviteAccepted) return null;
                    var partner =
                      partners?.find((x) => x.uid === invite.uidInviter) ??
                      ({} as UserTypes);
                    return (
                      <Partner
                        key={index}
                        uid={invite.uidInviter}
                        name={partner.name}
                        photoURL={partner.profilePhotoURL}
                        isInvite={true}
                        description={`Te convidou em ${moment(
                          invite.inviteDate.toDate()
                        ).format("DD/MM/yyyy")}`}
                      />
                    );
                  })
                ) : (
                  <Text>Sem Convites!</Text>
                )}
              </View>
            </ScrollView>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
  },
  modalHeader: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  modalBackground: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContainer: {
    width: 350,
    padding: 12,
    backgroundColor: "white",
    borderRadius: 8,
    gap: 10,
  },
  modalTitle: {
    fontSize: 16,
  },
  modalSubtitle: {
    fontSize: 14,
    color: COLORS.primaryGray,
  },
  invitesContainer: {
    gap: 10,
  },
});
