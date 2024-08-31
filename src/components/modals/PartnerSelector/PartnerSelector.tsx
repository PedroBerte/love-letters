import {
  View,
  Text,
  Modal,
  StyleSheet,
  Button,
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import { UserTypes } from "../../../types/UserTypes";
import {
  and,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { auth, db } from "../../../services/firebase-config";
import Partner from "./components/Partner";

export default function PartnerSelector() {
  const [partners, setPartners] = useState<UserTypes[]>();

  useEffect(() => {
    async function getAllUsers() {
      const q = query(
        collection(db, "users"),
        where("alreadyHavePartner", "==", false),
        where("uid", "!=", auth.currentUser?.uid)
      );
      const partners = await getDocs(q);
      setPartners(
        partners.docs.map((x) => x.data() as UserTypes) as UserTypes[]
      );
    }
    getAllUsers();
  }, []);

  return (
    <View style={styles.container}>
      <Modal visible={true} transparent={true} animationType="slide">
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <View>
              <Text style={styles.modalTitle}>
                Que triste 😭 Ainda sem parceiro?
              </Text>
              <Text style={styles.modalSubtitle}>
                Vamos te ajudar nisso! 💍
              </Text>
            </View>
            <ScrollView>
              {partners &&
                partners.map((partner) => (
                  <Partner
                    name={partner.name}
                    photoURL={partner.profilePhotoURL}
                  />
                ))}
            </ScrollView>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
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
  },
  modalTitle: {
    fontSize: 16,
  },
  modalSubtitle: {
    fontSize: 14,
  },
});
