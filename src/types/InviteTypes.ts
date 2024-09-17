import { Timestamp } from "firebase/firestore";

export type InviteTypes = {
  uidInviter: string;
  uidInvited: string;
  inviteAccepted: boolean;
  inviteDate: Timestamp;
};
