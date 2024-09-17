import AsyncStorage from "@react-native-async-storage/async-storage";

export default async function deleteStorageUserData() {
  try {
    await AsyncStorage.removeItem("logged-user-data");
  } catch (e) {
    console.error(e);
  }
}
