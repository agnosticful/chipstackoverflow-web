import * as firebase from "firebase";
import { Observable, BehaviorSubject } from "rxjs";

export type OnAuthenticationStateChanged = Observable<boolean>;

export function createOnAuthenticationStateChanged({
  firebaseApp
}: {
  firebaseApp: firebase.app.App;
}): OnAuthenticationStateChanged {
  const onAuthenticationStateChanged = new BehaviorSubject<boolean>(
    !!firebaseApp.auth().currentUser
  );

  firebaseApp
    .auth()
    .onAuthStateChanged(user => onAuthenticationStateChanged.next(!!user));

  return onAuthenticationStateChanged;
}
