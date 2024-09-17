import { View, Text, Modal, StyleSheet, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import { UserTypes } from "../../../types/UserTypes";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../../services/firebase-config";
import Partner from "../../Partner";
import { COLORS } from "../../../constants/colors";
import Input from "../../Input";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useAuth } from "../../../contexts/AuthContext";
import getResultFromQuery from "../../../services/querys/getResultsFromQuery";
import { InviteTypes } from "../../../types/InviteTypes";

export default function PartnerSelectorModal() {
  const { user } = useAuth();

  const [partners, setPartners] = useState<UserTypes[]>();
  const [invites, setInvites] = useState<InviteTypes[]>();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    async function getAllUsers() {
      try {
        var partners = await getResultFromQuery<UserTypes>(
          query(
            collection(db, "users"),
            where("alreadyHavePartner", "==", false)
          )
        );
        var invites = await getResultFromQuery<InviteTypes>(
          query(collection(db, "invites"), where("uidInviter", "==", user?.uid))
        );

        setInvites(invites);
        setPartners(partners?.filter((x) => x.uid !== user?.uid));
      } catch (error) {
        console.error(error);
      }
    }
    if (!user?.alreadyHavePartner) {
      getAllUsers();
      setIsOpen(true);
    }
  }, []);

  return (
    <View style={styles.container}>
      <Modal visible={isOpen} transparent={true} animationType="fade">
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <View style={styles.modalHeader}>
              <View>
                <Text style={styles.modalTitle}>
                  Que triste 😭 Ainda sem parceiro?
                </Text>
                <Text style={styles.modalSubtitle}>
                  Vamos te ajudar nisso! 💍
                </Text>
              </View>

              <Ionicons
                name="close"
                size={30}
                color={COLORS.textDark}
                onPress={() => setIsOpen(false)}
              />
            </View>
            <Input placeholder="Filtrar" />
            <ScrollView style={{ maxHeight: 350 }}>
              <View style={styles.partnerSelectorContainer}>
                {partners &&
                  partners.map((partner, index) => (
                    <Partner
                      key={index}
                      uid={partner.uid}
                      name={partner.name}
                      photoURL={partner.profilePhotoURL}
                      isAlreadyInvited={invites?.some(
                        (x) => x.uidInvited === partner.uid
                      )}
                    />
                  ))}
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
  partnerSelectorContainer: {
    gap: 10,
  },
});
