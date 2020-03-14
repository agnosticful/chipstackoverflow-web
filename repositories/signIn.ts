import * as firebase from "firebase/app";

export type SignIn = () => Promise<void>;

export function createSignIn({
  firebaseApp,
  googleAuthProvider
}: {
  firebaseApp: firebase.app.App;
  googleAuthProvider: firebase.auth.GoogleAuthProvider;
}): SignIn {
  async function signIn(): Promise<void> {
    let user: firebase.User;

    try {
      const result = await firebaseApp
        .auth()
        .signInWithPopup(googleAuthProvider);

      if (!result.user) {
        throw new Error("");
      }

      user = result.user;
    } catch (error) {
      if (typeof error.code === "string") {
        if (error.code === "auth/popup-closed-by-user") return;
      }

      throw error;
    }

    while (true) {
      const doc = await firebaseApp
        .firestore()
        .collection("users")
        .doc(user.uid)
        .get();

      if (doc.exists) break;

      await new Promise(resolve => setTimeout(resolve, 3000));
    }
  }

  return signIn;
}
