import "antd/dist/antd.css";
import * as firebase from "firebase";
import { AppProps } from "next/app";
import * as React from "react";
import { Repository, RepositoryProvider } from "../hooks/useRepository";
import { createGetRecentPosts } from "../repositories/getRecentPosts";
import { createOnAuthenticationStateChanged } from "../repositories/onAuthenticationStateChanged";
import { createSignIn } from "../repositories/signIn";
import { createSignOut } from "../repositories/signOut";
import { createSubscribeRecentPosts } from "../repositories/subscribeRecentPosts";
import getFirebaseApp from "../utilities/getFirebaseApp";

export default function App({ Component, pageProps }: AppProps) {
  const firebaseApp = React.useMemo(() => getFirebaseApp(), []);
  const repository = React.useMemo<Repository>(
    () => ({
      getRecentPosts: createGetRecentPosts({ firebaseApp }),
      onAuthenticationStateChanged: createOnAuthenticationStateChanged({
        firebaseApp
      }),
      subscribeRecentPosts: createSubscribeRecentPosts({
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
