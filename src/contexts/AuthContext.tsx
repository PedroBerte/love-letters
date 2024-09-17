import {
  createUserWithEmailAndPassword,
  deleteUser,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
  useEffect,
} from "react";
import { auth, db } from "../services/firebase-config";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { UserTypes } from "../types/UserTypes";
import showToast from "../utils/showToast";
import insertProfilePicture from "../services/querys/insertProfilePicture";
import * as SplashScreen from "expo-splash-screen";
import getStorageUserData from "../utils/getStorageUserData";
import setStorageUserData from "../utils/setStorageUserData";
import deleteStorageUserData from "../utils/deleteStorageUserData";

type AuthContextTypes = {
  isLoggedIn: boolean;
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
  setUser: React.Dispatch<React.SetStateAction<UserTypes | null>>;
  registerUser: (
    name: string,
    email: string,
    password: string,
    photoUri: string
  ) => Promise<void>;
  loginUser: (email: string, password: string) => Promise<boolean>;
  logoutUser: () => Promise<void>;
  user: UserTypes | null;
};

type AuthProviderProps = {
  children: ReactNode;
};

const AuthContext = createContext<AuthContextTypes>({} as AuthContextTypes);

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<UserTypes | null>(null);

  useEffect(() => {
    const checkUserSession = async () => {
      const logged = await validateUserSession();
      setIsLoggedIn(logged);
      SplashScreen.hideAsync();
    };

    checkUserSession();
  }, []);

  async function validateUserSession() {
    console.log("Validating user session...");
    var storageUser = await getStorageUserData();
    console.log("Storage user: ", storageUser);
    var logged = false;
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

  async function registerUser(
    name: string,
    email: string,
    password: string,
    photoUri: string
  ): Promise<void> {
    await createUserWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        const user = userCredential.user;
        var photoUrl = await insertProfilePicture(photoUri);
        await updateProfile(user, {
          photoURL: photoUrl,
          displayName: name,
        });
        await setDoc(doc(db, "users", user.uid), {
          uid: user.uid,
          name: name,
          email: email,
          profilePhotoURL: photoUrl,
          alreadyHavePartner: false,
          partnerUID: null,
        } as UserTypes)
          .then(async () => {
            showToast({
              toastMessage: "Que bom ter você aqui! 😍",
              type: "success",
            });
            setIsLoggedIn(true);
          })
          .catch(async (error) => {
            await deleteUser(user);
            showToast({
              toastMessage: "Algo deu errado... Tente novamente mais tarde! 😭",
              type: "error",
            });
            console.log(error);
          });
      })
      .catch((error) => {
        showToast({
          toastMessage: "Algo deu errado... Tente novamente mais tarde! 😭",
          type: "error",
        });
        console.log(error);
      });
  }

  async function loginUser(email: string, password: string): Promise<boolean> {
    await signInWithEmailAndPassword(auth, email, password)
      .then(async (userCredentials) => {
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
        showToast({
          toastMessage: "Muito bom ter você de volta! 😍",
          type: "success",
        });
        setIsLoggedIn(true);
      })
      .catch((error) => {
        const errorCode = error.code;
        if (errorCode == "auth/invalid-credential") {
          showToast({
            toastMessage: "Email ou/e senha incorretas! 🧐",
            type: "error",
          });
          return false;
        }
        return false;
      })
      .catch(() => {
        showToast({
          toastMessage: "Algo deu errado... 🧐",
          type: "error",
        });
        return false;
      });
    return false;
  }

  async function logoutUser() {
    await deleteStorageUserData();
    await signOut(auth);
    setIsLoggedIn(false);
    setUser(null);
  }

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        registerUser,
        loginUser,
        user,
        setIsLoggedIn,
        setUser,
        logoutUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
