import {
  createUserWithEmailAndPassword,
  deleteUser,
  onAuthStateChanged,
  signInWithEmailAndPassword,
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
import { doc, setDoc } from "firebase/firestore";
import { UserTypes } from "../types/UserTypes";
import showToast from "../utils/showToast";
import insertProfilePicture from "../services/requests/insertProfilePicture";

type AuthContextTypes = {
  isLoggedIn: boolean;
  registerUser: (
    name: string,
    email: string,
    password: string,
    photoUri: string
  ) => Promise<void>;
  loginUser: (email: string, password: string) => Promise<boolean>;
};

type AuthProviderProps = {
  children: ReactNode;
};

const AuthContext = createContext<AuthContextTypes>({} as AuthContextTypes);

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  onAuthStateChanged(auth, (user) => {
    if (user) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  });

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
          .catch(async () => {
            await deleteUser(user);
            showToast({
              toastMessage: "Algo deu errado... Tente novamente mais tarde! 😭",
              type: "error",
            });
          });
      })
      .catch((error) => {
        showToast({
          toastMessage: "Algo deu errado... Tente novamente mais tarde! 😭",
          type: "error",
        });
      });
  }

  async function loginUser(email: string, password: string): Promise<boolean> {
    await signInWithEmailAndPassword(auth, email, password)
      .then(() => {
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
  return (
    <AuthContext.Provider value={{ isLoggedIn, registerUser, loginUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
