export const env = {
    baseUrl: import.meta.env.VITE_API_URL || "http://localhost:3000",
    firebaseBaseApiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    firebaseBaseAuthDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    firebaseBaseDatabaseURL: import.meta.env.VITE_FIREBASE_DATABASE_URL,
    firebaseBaseProjectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    firebaseBaseStorageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
    firebaseBaseMessagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    firebaseBaseAppId: import.meta.env.VITE_FIREBASE_APP_ID,
    firebaseBaseMeasurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
}