import { initializeApp } from "firebase/app";
import { getAuth, updateProfile, onAuthStateChanged } from "firebase/auth";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytes,
  deleteObject,
} from "firebase/storage";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import defaultAvatar from "../public/defaultAvatar.png";

const firebaseConfig = {
  apiKey: "AIzaSyBAsEdvG_8uXIWakuVxFiRfb9eE1Vh5cmc",
  authDomain: "schh-413d6.firebaseapp.com",
  databaseURL:
    "https://schh-413d6-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "schh-413d6",
  storageBucket: "schh-413d6.appspot.com",
  messagingSenderId: "680386044609",
  appId: "1:680386044609:web:3d2dbb0797543b4f37ea40",
  measurementId: "G-85WQ5F5GF1",
};

const firebaseApp = initializeApp(firebaseConfig);
export const auth = getAuth(firebaseApp);
const storage = getStorage(firebaseApp);

export const useAuth = () => {
  const [currentUser, setCurrentUser] = useState();

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => setCurrentUser(user));
    return unsub;
  }, []);

  return currentUser;
};

export async function upload(file, currentUser, setLoading) {
  const fileRef = ref(storage, currentUser.uid + ".png");
  toast.info("عکس تغییر کرد", {
    theme: "colored",
  });

  setLoading(true);
  await uploadBytes(fileRef, file);
  const photoURL = await getDownloadURL(fileRef);

  updateProfile(currentUser, { photoURL });

  setLoading(false);
  setTimeout(() => {
    window.location.reload();
  }, 1000);
}

export async function deletePhoto(currentUser) {
  const fileRef = ref(storage, currentUser.uid + ".png");

  try {
    await deleteObject(fileRef);
    toast.error("عکس حذف شد", {
      theme: "colored",
    });

    await updateProfile(currentUser, { photoURL: defaultAvatar });
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  } catch (err) {
    console.error(err);
  }
}
