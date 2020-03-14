import * as firebase from "firebase";
import User, { UserId } from "../models/User";
import firestoreSnapshotToUser from "../serializers/firestoreSnapshotToUser";

export type GetUserById = (id: UserId) => Promise<User>;

export function createGetUserById({
  firebaseApp
}: {
  firebaseApp: firebase.app.App;
}): GetUserById {
  return async id => {
    const snapshot = await firebaseApp
      .firestore()
      .collection("users")
      .doc(id)
      .get();

    return firestoreSnapshotToUser(snapshot);
  };
}
