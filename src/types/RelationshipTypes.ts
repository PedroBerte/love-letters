import { Timestamp } from "firebase/firestore";

export type RelationshipTypes = {
  partner1Uid: string;
  partner2Uid: string;
  status: "active" | "inactive";
  startDate: Timestamp;
  endDate: Timestamp | null;
};
