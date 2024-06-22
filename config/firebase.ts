import { initializeApp } from "firebase/app";
import firestore from "@react-native-firebase/firestore";
import { getStorage } from "firebase/storage";
import "@react-native-firebase/storage";
import { firebaseConfig } from "./env";
import { getFirestore } from "firebase/firestore";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
// export const db = firestore();

export const storage = getStorage(app);

export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});