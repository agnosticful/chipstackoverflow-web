import * as firebase from "firebase/app";
import { Observable } from "rxjs";
import Answer from "../models/Answer";
import { PostId } from "../models/Post";
import firestoreSnapshotToAnswer from "../serializers/firestoreSnapshotToAnswer";

export type SubscribeAnswersByPostId = (postId: PostId) => Observable<Answer[]>;

export function createSubscribeAnswersByPostId({
  firebaseApp,
}: {
  firebaseApp: firebase.app.App;
}): SubscribeAnswersByPostId {
  return () =>
    new Observable<Answer[]>((observer) => {
      const unsubscribe = firebaseApp
        .firestore()
        .collection("answers")
        .orderBy("lastUpdatedAt", "desc")
        .limit(100)
        .onSnapshot((snapshot) => {
          const answers = snapshot.docs.map((doc) =>
            firestoreSnapshotToAnswer(doc)
          );

          observer.next(answers);
        });

      return () => unsubscribe();
    });
}
