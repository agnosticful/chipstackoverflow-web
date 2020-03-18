import * as firebase from "firebase/app";
import { UserId } from "../models/User";

export type SetUserIdForLogging = (userId: UserId) => void;

export function createSetUserIdForLogging({
  firebaseApp
}: {
  firebaseApp: firebase.app.App;
}): SetUserIdForLogging {
  return userId => firebaseApp.analytics().setUserId(userId, { global: true });
}
