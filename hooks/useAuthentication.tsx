import * as firebase from "firebase/app";
import "firebase/auth";
import * as React from "react";
import { atom, useRecoilValue, useSetRecoilState } from "recoil";

const authenticationState = atom({
  key: "Authentication",
  default: {
    authenticationToken: null as string | null,
    isLoading: false,
    isInitialized: false,
  },
});

export default function useAuthentication() {
  const { authenticationToken, isLoading, isInitialized } = useRecoilValue(
    authenticationState
  );

  const signIn = React.useCallback(async () => {
    try {
      const result = await getSingletonFirebaseApp()
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
  }, []);

  const signOut = React.useCallback(async () => {
    await getSingletonFirebaseApp().auth().signOut();
  }, []);

  return {
    authenticationToken,
    isLoading: isLoading || !isInitialized,
    signIn,
    signOut,
  };
}

export function useAuthenticationObservation() {
  const setAuthenticationState = useSetRecoilState(authenticationState);

  React.useEffect(() => {
    const firebaseApp = getSingletonFirebaseApp();

    const unsubscribe = firebaseApp.auth().onAuthStateChanged(async (user) => {
      const authenticationToken = (await user?.getIdToken()) ?? null;

      setAuthenticationState({
        authenticationToken,
        isLoading: false,
        isInitialized: true,
      });
    });

    return () => {
      unsubscribe();
    };
  }, []);
}

function getSingletonFirebaseApp() {
  try {
    return firebase.app();
  } catch (_) {
    return firebase.initializeApp({
      apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
      authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
      databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
      projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
      storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
      messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
      appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
      measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
    });
  }
}
