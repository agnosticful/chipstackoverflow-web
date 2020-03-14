import * as firebase from "firebase/app";

export type SignOut = () => Promise<void>;

export function createSignOut({
  firebaseApp
}: {
  firebaseApp: firebase.app.App;
}) {
  async function signOut(): Promise<void> {
    await firebaseApp.auth().signOut();
  }

  return signOut;
}
