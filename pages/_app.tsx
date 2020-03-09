import * as firebase from "firebase";
import { AppProps } from "next/app";
import * as React from "react";
import { Repository, RepositoryProvider } from "../hooks/useRepository";
import { createOnAuthenticationStateChanged } from "../repositories/onAuthenticationStateChanged";
import { createSignIn } from "../repositories/signIn";
import { createSignOut } from "../repositories/signOut";

export default function App({ Component, pageProps }: AppProps) {
  const firebaseApp = React.useMemo(() => {
    try {
      return firebase.app();
    } catch (_) {
      return firebase.initializeApp(
        JSON.parse(process.env.firebaseAppOptions!)
      );
    }
  }, []);
  const repository = React.useMemo<Repository>(
    () => ({
      onAuthenticationStateChanged: createOnAuthenticationStateChanged({
        firebaseApp
      }),
      signIn: createSignIn({
        firebaseApp,
        googleAuthProvider: new firebase.auth.GoogleAuthProvider()
      }),
      signOut: createSignOut({ firebaseApp })
    }),
    []
  );

  return (
    <RepositoryProvider repository={repository}>
      <Component {...pageProps} />
    </RepositoryProvider>
  );
}
