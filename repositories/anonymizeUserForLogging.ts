import * as firebase from "firebase/app";

export type AnonymizeUserForLogging = () => void;

export function createAnonymizeUserForLogging({
  firebaseApp,
}: {
  firebaseApp: firebase.app.App;
}): AnonymizeUserForLogging {
  return () => {
    firebaseApp.analytics().setUserId(null as any, { global: true });
  };
}
