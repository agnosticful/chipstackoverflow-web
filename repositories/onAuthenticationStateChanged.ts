import * as firebase from "firebase";
import { Observable } from "rxjs";

export type OnAuthenticationStateChanged = Observable<boolean>;

export function createOnAuthenticationStateChanged({
  firebaseApp
}: {
  firebaseApp: firebase.app.App;
}): OnAuthenticationStateChanged {
  return new Observable(subscriber => {
    firebaseApp.auth().onAuthStateChanged(user => subscriber.next(!!user));

    return () => subscriber.unsubscribe();
  });
}
