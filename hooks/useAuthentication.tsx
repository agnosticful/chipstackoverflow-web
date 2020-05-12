import constate from "constate";
import * as firebase from "firebase/app";
import "firebase/auth";
import * as React from "react";

export const [AuthenticationProvider, useAuthentication] = constate((): {
  authenticationToken: string | null;
  isLoading: boolean;
  signIn: (objectId: string) => void;
  signOut: () => void;
} => {
  const firebaseApp = React.useMemo(() => {
    try {
      return firebase.app();
    } catch (_) {
      return firebase.initializeApp({
        apiKey: process.env.FIREBASE_API_KEY,
        authDomain: process.env.FIREBASE_AUTH_DOMAIN,
        databaseURL: process.env.FIREBASE_DATABASE_URL,
        projectId: process.env.FIREBASE_PROJECT_ID,
        storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
        messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
        appId: process.env.FIREBASE_APP_ID,
        measurementId: process.env.FIREBASE_MEASUREMENT_ID,
      });
    }
  }, []);
  const [authenticationToken, setAuthenticationToken] = React.useState<
    string | null
  >(null);
  const [isLoading, setLoading] = React.useState(true);

  const signIn = React.useCallback(async () => {
    try {
      const result = await firebaseApp
        .auth()
        .signInWithPopup(new firebase.auth.GoogleAuthProvider());

      if (!result.user) {
        throw new Error("");
      }
    } catch (error) {
      if (typeof error.code === "string") {
        if (error.code === "auth/popup-closed-by-user") return;
      }

      throw error;
    }
  }, [firebaseApp]);

  const signOut = React.useCallback(async () => {
    await firebaseApp.auth().signOut();
  }, [firebaseApp]);

  React.useEffect(() => {
    const unsubscribe = firebaseApp.auth().onAuthStateChanged(async (user) => {
      const token = (await user?.getIdToken()) ?? null;

      setAuthenticationToken(token);
      setLoading(false);
    });

    return () => {
      unsubscribe();
    };
  }, [firebaseApp]);

  return { authenticationToken, isLoading, signIn, signOut };
});

export default useAuthentication;
