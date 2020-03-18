import * as firebase from "firebase/app";
import { Observable } from "rxjs";
import User, { UserId } from "../models/User";
import firestoreSnapshotToUser from "../serializers/firestoreSnapshotToUser";

export type SubscribeUserById = (id: UserId) => Observable<User | null>;

export function createSubscribeUserById({
  firebaseApp
}: {
  firebaseApp: firebase.app.App;
}): SubscribeUserById {
  return userId =>
    new Observable<User | null>(observer => {
      const unsubscribe = firebaseApp
        .firestore()
        .collection("users")
        .doc(userId)
        .onSnapshot(snapshot => {
          if (!snapshot.exists) {
            return observer.next(null);
          }

          observer.next(firestoreSnapshotToUser(snapshot));
        });

      return () => unsubscribe();
    });
}
