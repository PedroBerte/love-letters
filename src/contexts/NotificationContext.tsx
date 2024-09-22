import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import { InviteTypes } from "../types/InviteTypes";
import getResultFromQuery from "../services/querys/getResultsFromQuery";
import { query, collection, where } from "firebase/firestore";
import { db } from "../services/firebase-config";
import { UserTypes } from "../types/UserTypes";
import { useUser } from "./UserContext";
import { NotificationTypes } from "../types/NotificationTypes";

interface NotificationContextType {
  notifications: NotificationTypes[];
  notificationCount: number;
}

const NotificationContext = createContext<NotificationContextType | undefined>(
  undefined
);

export const NotificationProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const { user } = useUser();
  const [notifications, setNotifications] = useState<NotificationTypes[]>([]);
  const [notificationCount, setNotificationCount] = useState(0);

  useEffect(() => {
    async function getInvites() {
      var invites = await getResultFromQuery<InviteTypes>(
        query(collection(db, "invites"), where("uidInvited", "==", user?.uid))
      );
      console.log("INVITES: ", invites);
      if (!invites) return;
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

      var notifications = invites.map((invite) => {
        var partner = partners?.find((x) => x.uid === invite.uidInviter);
        console.log("PARTNER: ", partner);
        return {
          notificationImage: partner?.profilePhotoURL ?? "",
          notificationTitle: partner?.name ?? "",
          notificationSubtitle: `Te convidou para um relacionamento!`,
          notificationDate: invite.inviteDate.toDate(),
        };
      });
      console.log("NOTIFICATIONS: ", notifications);
      setNotificationCount(notifications.length);
      console.log("NOTIFICATIONS COUNT: ", notifications.length);
      setNotifications(notifications);
    }
    getInvites();
  }, [user]);

  return (
    <NotificationContext.Provider value={{ notifications, notificationCount }}>
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotification = (): NotificationContextType => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error(
      "useNotification must be used within a NotificationProvider"
    );
  }
  return context;
};
