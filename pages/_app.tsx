import * as firebase from "firebase/app";
import "firebase/analytics";
import "firebase/auth";
import "firebase/firestore";
import "firebase/functions";
import { AppProps } from "next/app";
import * as React from "react";
import "tippy.js/dist/tippy.css";
import "tippy.js/animations/shift-away-subtle.css";
import "tippy.js/themes/light.css";
import "../global.css";
import { Repository, RepositoryProvider } from "../hooks/useRepository";
import { createAnonymizeUserForLogging } from "../repositories/anonymizeUserForLogging";
import { createCreateAnswerReaction } from "../repositories/createAnswerReaction";
import { createCreatePost } from "../repositories/createPost";
import { createDeleteAnswerReaction } from "../repositories/deleteAnswerReaction";
import { createGetRecentPosts } from "../repositories/getRecentPosts";
import { createGetUserById } from "../repositories/getUserById";
import { createLogEvent } from "../repositories/logEvent";
import { createOnAuthenticationStateChanged } from "../repositories/onAuthenticationStateChanged";
import { createIdentifyUserForLogging } from "../repositories/identifyUserForLogging";
import { createSignIn } from "../repositories/signIn";
import { createSignOut } from "../repositories/signOut";
import { createSubscribeAnswersByPostId } from "../repositories/subscribeAnswersByPostId";
import { createSubscribeRecentPosts } from "../repositories/subscribeRecentPosts";
import { createSubscribeUserById } from "../repositories/subscribeUserById";
import getFirebaseApp from "../utilities/getFirebaseApp";

export default function App({ Component, pageProps, router }: AppProps) {
  const firebaseApp = React.useMemo(() => getFirebaseApp(), []);
  const repository = React.useMemo<Repository>(
    () => ({
      anonymizeUserForLogging: createAnonymizeUserForLogging({ firebaseApp }),
      createAnswerReaction: createCreateAnswerReaction({ firebaseApp }),
      createPost: createCreatePost({ firebaseApp }),
      deleteAnswerReaction: createDeleteAnswerReaction({ firebaseApp }),
      getRecentPosts: createGetRecentPosts({ firebaseApp }),
      logEvent: createLogEvent({ firebaseApp }),
      onAuthenticationStateChanged: createOnAuthenticationStateChanged({
        firebaseApp,
      }),
      getUserById: createGetUserById({ firebaseApp }),
      identifyUserForLogging: createIdentifyUserForLogging({ firebaseApp }),
      subscribeAnswersByPostId: createSubscribeAnswersByPostId({ firebaseApp }),
      subscribeRecentPosts: createSubscribeRecentPosts({ firebaseApp }),
      subscribeUserById: createSubscribeUserById({ firebaseApp }),
      signIn: createSignIn({
        firebaseApp,
        googleAuthProvider: new firebase.auth.GoogleAuthProvider(),
      }),
      signOut: createSignOut({ firebaseApp }),
    }),
    []
  );

  React.useEffect(() => {
    firebaseApp.analytics().setCurrentScreen(router.pathname);
  }, [router.pathname]);

  return (
    <RepositoryProvider repository={repository}>
      <Component {...pageProps} />
    </RepositoryProvider>
  );
}
