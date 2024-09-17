import AsyncStorage from "@react-native-async-storage/async-storage";
import { UserTypes } from "../types/UserTypes";

export default async function setStorageUserData(user: UserTypes) {
  try {
    await AsyncStorage.setItem("logged-user-data", JSON.stringify(user));
  } catch (error) {}
}
