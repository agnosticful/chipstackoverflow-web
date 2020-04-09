import * as firebase from "firebase/app";
import UserPrivate from "../models/UserPrivate";

export type IdentifyUserForLogging = (userPrivate: UserPrivate) => void;

export function createIdentifyUserForLogging({
  firebaseApp,
  fullstory,
}: {
  firebaseApp: firebase.app.App;
  fullstory: any;
}): IdentifyUserForLogging {
  return (userPrivate: UserPrivate) => {
    firebaseApp.analytics().setUserId(userPrivate.id, { global: true });

    fullstory?.identify(userPrivate.id, {
      displayName: userPrivate.name,
      email: userPrivate.email,
    });
  };
}
