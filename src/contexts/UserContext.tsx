import {
  onAuthStateChanged,
  updateProfile,
  UserCredential,
  deleteUser as excludeUser,
  User,
  deleteUser,
} from "firebase/auth";
import { getDoc, doc, setDoc } from "firebase/firestore";
import React, { createContext, useState, ReactNode } from "react";
import { auth, db } from "../services/firebase-config";
import { UserTypes } from "../types/UserTypes";
import getStorageUserData from "../utils/getStorageUserData";
import setStorageUserData from "../utils/setStorageUserData";
import deleteStorageUserData from "../utils/deleteStorageUserData";

interface UserContextProps {
  user: UserTypes | null;
  setUser: (user: UserTypes | null) => void;
  validateUserSession: () => Promise<boolean>;
  createNewUser: (
    credentials: UserCredential,
    name: string,
    email: string,
    photoUri: string
  ) => Promise<void>;
  deleteUser: (user: User) => Promise<void>;
  storageUserWithFirebaseCredentials: (
    userCredentials: UserCredential
  ) => Promise<void>;
}

interface UserProviderProps {
  children: ReactNode;
}

const UserContext = createContext<UserContextProps | undefined>(undefined);

export const UserProvider = ({ children }: UserProviderProps) => {
  const [user, setUser] = useState<UserTypes | null>(null);

  async function validateUserSession() {
    var logged = false;
    console.log("Validating user session...");

    var storageUser = await getStorageUserData();
    console.log("Storage user: ", storageUser);
    //Caso ele não encontre o usuário no storage, ele vai buscar no firebase.
    if (!storageUser) {
      onAuthStateChanged(auth, async (userCredentials) => {
        if (userCredentials) {
          var userDocs = await getDoc(doc(db, "users", userCredentials.uid));
          var user = {
            uid: userCredentials.uid,
            name: userCredentials.displayName,
            email: userCredentials.email,
            profilePhotoURL: userCredentials.photoURL,
            alreadyHavePartner: userDocs.data()?.alreadyHavePartner,
            partnerUID: userDocs.data()?.partnerUID,
            partnerName: userDocs.data()?.partnerName,
          } as UserTypes;
          await setStorageUserData(user);
          setUser(user);
          logged = true;
        }
      });
    } else {
      setUser(storageUser);
      logged = true;
    }
    return logged;
  }

  async function createNewUser(
    credentials: UserCredential,
    name: string,
    email: string,
    photoUri: string
  ) {
    try {
      //var photoUrl = await insertProfilePicture(photoUri);
      await updateProfile(credentials.user, {
        photoURL: photoUri,
        displayName: name,
      });
      await setDoc(doc(db, "users", credentials.user.uid), {
        uid: credentials.user.uid,
        name: name,
        email: email,
        profilePhotoURL: photoUri,
        alreadyHavePartner: false,
        partnerUID: null,
      } as UserTypes);
    } catch (error: any) {
      throw new Error(error);
    }
  }

  async function storageUserWithFirebaseCredentials(
    userCredentials: UserCredential
  ) {
    var userDocs = await getDoc(doc(db, "users", userCredentials.user.uid));
    var user = {
      uid: userCredentials.user.uid,
      name: userCredentials.user.displayName,
      email: userCredentials.user.email,
      profilePhotoURL: userCredentials.user.photoURL,
      alreadyHavePartner: userDocs.data()?.alreadyHavePartner,
      partnerUID: userDocs.data()?.partnerUID,
      partnerName: userDocs.data()?.partnerName,
    } as UserTypes;
    await setStorageUserData(user);
  }

  async function deleteUser(user: User) {
    if (user) {
      await deleteStorageUserData();
      await excludeUser(user);
      setUser(null);
    }
  }

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        validateUserSession,
        createNewUser,
        deleteUser,
        storageUserWithFirebaseCredentials,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = React.useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
