import "antd/dist/antd.css";
import * as firebase from "firebase/app";
import "firebase/analytics";
import "firebase/auth";
import "firebase/firestore";
import { AppProps } from "next/app";
import * as React from "react";
import { Repository, RepositoryProvider } from "../hooks/useRepository";
import { createGetRecentPosts } from "../repositories/getRecentPosts";
import { createGetUserById } from "../repositories/getUserById";
import { createOnAuthenticationStateChanged } from "../repositories/onAuthenticationStateChanged";
import { createSignIn } from "../repositories/signIn";
import { createSignOut } from "../repositories/signOut";
import { createSubscribeRecentPosts } from "../repositories/subscribeRecentPosts";
import { createSubscribeUserById } from "../repositories/subscribeUserById";
import getFirebaseApp from "../utilities/getFirebaseApp";

export default function App({ Component, pageProps }: AppProps) {
  const firebaseApp = React.useMemo(() => getFirebaseApp(), []);
  const repository = React.useMemo<Repository>(
    () => ({
      getRecentPosts: createGetRecentPosts({ firebaseApp }),
      onAuthenticationStateChanged: createOnAuthenticationStateChanged({
        firebaseApp
      }),
      getUserById: createGetUserById({ firebaseApp }),
      subscribeRecentPosts: createSubscribeRecentPosts({
        firebaseApp
      }),
      subscribeUserById: createSubscribeUserById({ firebaseApp }),
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
