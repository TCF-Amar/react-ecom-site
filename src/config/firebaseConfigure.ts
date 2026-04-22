// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { env } from "./env";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: env.firebaseBaseApiKey,
    authDomain: env.firebaseBaseAuthDomain,
    databaseURL: env.firebaseBaseDatabaseURL,
    projectId: env.firebaseBaseProjectId,
    storageBucket: env.firebaseBaseStorageBucket,
    messagingSenderId: env.firebaseBaseMessagingSenderId,
    appId: env.firebaseBaseAppId,
    measurementId: env.firebaseBaseMeasurementId
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app);

