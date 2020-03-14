import * as firebase from "firebase/app";
import { Observable } from "rxjs";
import { UserId } from "../models/User";

export type OnAuthenticationStateChanged = Observable<UserId | null>;

export function createOnAuthenticationStateChanged({
  firebaseApp
}: {
  firebaseApp: firebase.app.App;
}): OnAuthenticationStateChanged {
  return new Observable(subscriber => {
    firebaseApp
      .auth()
      .onAuthStateChanged(user =>
        subscriber.next(user ? (user.uid as UserId) : null)
      );

    return () => subscriber.unsubscribe();
  });
}
