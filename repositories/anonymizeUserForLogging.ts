import * as firebase from "firebase/app";

export type AnonymizeUserForLogging = () => void;

export function createAnonymizeUserForLogging({
  firebaseApp,
  fullstory,
}: {
  firebaseApp: firebase.app.App;
  fullstory: any;
}): AnonymizeUserForLogging {
  return () => {
    firebaseApp.analytics().setUserId(null as any, { global: true });

    fullstory?.anonymize();
  };
}
