import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
  useEffect,
} from "react";
import { auth } from "../services/firebase-config";
import showToast from "../utils/showToast";
import * as SplashScreen from "expo-splash-screen";
import deleteStorageUserData from "../utils/deleteStorageUserData";
import { useUser } from "./UserContext";

type AuthContextTypes = {
  isLoggedIn: boolean;
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
  registerUser: (
    name: string,
    email: string,
    password: string,
    photoUri: string
  ) => Promise<void>;
  loginUser: (email: string, password: string) => Promise<boolean>;
  logoutUser: () => Promise<void>;
};

type AuthProviderProps = {
  children: ReactNode;
};

const AuthContext = createContext<AuthContextTypes>({} as AuthContextTypes);

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const {
    validateUserSession,
    setUser,
    createNewUser,
    deleteUser,
    storageUserWithFirebaseCredentials,
  } = useUser();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkUserSession = async () => {
      const logged = await validateUserSession();
      setIsLoggedIn(logged);
      SplashScreen.hideAsync();
    };
    checkUserSession();
  }, []);

  async function registerUser(
    name: string,
    email: string,
    password: string,
    photoUri: string
  ): Promise<void> {
    await createUserWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        await createNewUser(userCredential, name, email, photoUri)
          .then(async () => {
            showToast({
              toastMessage: "Que bom ter você aqui! 😍",
              type: "success",
            });
            setIsLoggedIn(true);
          })
          .catch(async (error) => {
            await deleteUser(userCredential.user);
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
        await storageUserWithFirebaseCredentials(userCredentials);
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
        setIsLoggedIn,
        logoutUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
