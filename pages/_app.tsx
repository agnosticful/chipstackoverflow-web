import "antd/dist/antd.css";
import * as firebase from "firebase";
import { AppProps } from "next/app";
import * as React from "react";
import { Repository, RepositoryProvider } from "../hooks/useRepository";
import { createOnAuthenticationStateChanged } from "../repositories/onAuthenticationStateChanged";
import { createSignIn } from "../repositories/signIn";
import { createSignOut } from "../repositories/signOut";
import getFirebaseApp from "../utilities/getFirebaseApp";

export default function App({ Component, pageProps }: AppProps) {
  const firebaseApp = React.useMemo(() => getFirebaseApp(), []);
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
