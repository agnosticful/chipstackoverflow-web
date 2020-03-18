import * as firebase from "firebase/app";

export default function getFirebaseApp() {
  try {
    return firebase.app();
  } catch (_) {
    return firebase.initializeApp(JSON.parse(process.env.firebaseAppOptions!));
  }
}
