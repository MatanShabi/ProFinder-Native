import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

import { FIREBASE_API_KEY, FIREBASE_AUTH_DOMAIN, FIREBASE_DATABASE_URL, FIREBASE_PROJECT_ID, FIREBASE_STORAGE_BUCKET, FIREBASE_MESSAGING_SENDER_ID, FIREBASE_APP_ID } from "@env";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";

// Initialize Firebase
export const app = initializeApp({
    apiKey: FIREBASE_API_KEY,
    authDomain: FIREBASE_AUTH_DOMAIN,
    databaseURL: FIREBASE_DATABASE_URL,
    projectId:FIREBASE_PROJECT_ID,
    storageBucket: FIREBASE_STORAGE_BUCKET,
    messagingSenderId:FIREBASE_MESSAGING_SENDER_ID, 
    appId:FIREBASE_APP_ID
});

export const db = getFirestore(app);
export const storage = getStorage(app)
export const auth = getAuth(app);




