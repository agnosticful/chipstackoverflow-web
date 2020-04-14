import * as firebase from "firebase/app";
import { Observable } from "rxjs";
import { UserId } from "../models/User";
import { UserEmail } from "../models/UserPrivate";

export type OnAuthenticationStateChanged = Observable<{
  id: UserId;
  email: UserEmail;
} | null>;

export function createOnAuthenticationStateChanged({
  firebaseApp,
}: {
  firebaseApp: firebase.app.App;
}): OnAuthenticationStateChanged {
  return new Observable((subscriber) => {
    firebaseApp
      .auth()
      .onAuthStateChanged((user) =>
        subscriber.next(
          user
            ? { id: user.uid as UserId, email: user.email as UserEmail }
            : null
        )
      );

    return () => subscriber.unsubscribe();
  });
}
