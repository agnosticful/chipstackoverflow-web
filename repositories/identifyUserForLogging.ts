import * as firebase from "firebase/app";
import UserPrivate from "../models/UserPrivate";

export type IdentifyUserForLogging = (userPrivate: UserPrivate) => void;

export function createIdentifyUserForLogging({
  firebaseApp,
}: {
  firebaseApp: firebase.app.App;
}): IdentifyUserForLogging {
  return (userPrivate: UserPrivate) => {
    firebaseApp.analytics().setUserId(userPrivate.id, { global: true });
  };
}
