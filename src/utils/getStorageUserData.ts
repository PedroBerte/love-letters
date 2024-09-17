import AsyncStorage from "@react-native-async-storage/async-storage";
import { UserTypes } from "../types/UserTypes";

export default async function getStorageUserData() {
  try {
    const value = await AsyncStorage.getItem("logged-user-data");
    if (value !== null) {
      var user = JSON.parse(value) as UserTypes;
      return user;
    }
    return null;
  } catch (e) {
    console.error(e);
  }
}
