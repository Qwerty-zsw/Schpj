import { initializeApp } from "firebase/app";
import { getAuth, updateProfile, onAuthStateChanged } from "firebase/auth";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { useState, useEffect } from "react";

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
  const fileRef = ref(storage, currentUser.uid + '.png');

  setLoading(true);
  
  const snapshot = await uploadBytes(fileRef, file);
  const photoURL = await getDownloadURL(fileRef);

  updateProfile(currentUser, {photoURL});
  
  setLoading(false);
  alert("Uploaded file!");
}