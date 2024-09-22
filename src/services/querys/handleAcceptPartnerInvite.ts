import { doc, getDoc, runTransaction, Timestamp } from "firebase/firestore";
import { db } from "../firebase-config";
import { RelationshipTypes } from "../../types/RelationshipTypes";
import setStorageUserData from "../../utils/setStorageUserData";
import getStorageUserData from "../../utils/getStorageUserData";
import { UserTypes } from "../../types/UserTypes";

export default async function handleAcceptPartnerInvite(
  userUid: string,
  uidInviter: string
) {
  try {
    var uidsKey = `${uidInviter}${userUid}`;
    await runTransaction(db, async (transaction) => {
      console.log("Transaction started");
      const inviteRef = doc(db, "invites", uidsKey);
      const relationshipRef = doc(db, "relationships", uidsKey);
      const userLoggedRef = doc(db, "users", userUid);
      const userInviterRef = doc(db, "users", uidInviter);

      const userLogged = await getDoc(userLoggedRef);
      const userInviter = await getDoc(userInviterRef);

      transaction.update(inviteRef, { inviteAccepted: true });

      transaction.set(relationshipRef, {
        partner1Uid: uidInviter,
        partner2Uid: userUid,
        status: "active",
        startDate: Timestamp.now(),
        endDate: null,
      } as RelationshipTypes);

      transaction.update(userLoggedRef, {
        alreadyHavePartner: true,
        partnerUID: uidInviter,
        partnerName: userInviter.data()?.name,
      });

      transaction.update(userInviterRef, {
        alreadyHavePartner: true,
        partnerUID: userUid,
        partnerName: userLogged.data()?.name,
      });

      var userStorageData = await getStorageUserData();
      var newUserData = {
        ...userStorageData,
        alreadyHavePartner: true,
        partnerName: userInviter.data()?.name,
        partnerUID: uidInviter,
      } as UserTypes;
      setStorageUserData(newUserData);
    });
    console.log("Transaction successfully committed!");
  } catch (e) {
    console.log("Transaction failed: ", e);
  }
}
