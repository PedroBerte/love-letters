import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { auth } from "../firebase-config";
import { updateProfile } from "firebase/auth";

export default async function insertProfilePicture(uri: string) {
  try {
    const response = await fetch(uri);
    const blob = await response.blob();

    const storage = getStorage();
    const storageRef = ref(storage, `profilePictures/${auth.currentUser?.uid}`);

    await uploadBytes(storageRef, blob);
    const downloadURL = await getDownloadURL(storageRef);

    return downloadURL;
  } catch (error) {
    console.error("Erro ao fazer upload da imagem:", error);
    return null;
  }
}
