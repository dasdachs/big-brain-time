import { initializeApp, FirebaseApp } from "firebase/app";
import { browserLocalPersistence, getAuth, setPersistence } from "firebase/auth"
import { useState } from "react";

async function setPersistenceStorage(firebaseApp: FirebaseApp) {
    const auth = getAuth(firebaseApp)
    await setPersistence(auth, browserLocalPersistence)
}

export function useInitFirebaseApp() {
    const [initializing, setInitializing] = useState(true)
    const [error, setError] = useState<null | Error>(null)

    const app = initializeApp({
        apiKey: process.env.REACT_APP_API_KEY ?? "",
        authDomain: process.env.REACT_APP_AUTH_DOMAIN ?? "",
        databaseURL: process.env.REACT_APP_DATABASE_URL ?? "",
        projectId: process.env.REACT_APP_PROJECT_ID ?? "",
        storageBucket: process.env.REACT_APP_STORAGE_BUCKET ?? "",
        messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID ?? "",
        appId: process.env.REACT_APP_APP_ID ?? "",
        measurementId: process.env.REACT_APP_MEASUREMENT_ID ?? "",
    })

    setPersistenceStorage(app)
        .catch((e) => setError(e as Error))
        .finally(() => setInitializing(false))

    return {error, initializing}
}