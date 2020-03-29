import * as firebase from "firebase/app";
import { Observable } from "rxjs";
import { AnswerId } from "../models/Answer";
import AnswerReaction from "../models/AnswerReaction";
import { PostId } from "../models/Post";
import { UserId } from "../models/User";
import firestoreSnapshotToAnswerReaction from "../serializers/firestoreSnapshotToAnswerReaction";

export type SubscribeMyAnswerReactionsByAnswer = (params: {
  postId: PostId;
  answerId: AnswerId;
  userId: UserId;
}) => Observable<AnswerReaction | null>;

export function createSubscribeMyAnswerReactionsByAnswer({
  firebaseApp
}: {
  firebaseApp: firebase.app.App;
}): SubscribeMyAnswerReactionsByAnswer {
  return ({ postId, answerId, userId }) =>
    new Observable<AnswerReaction | null>(observer => {
      const unsubscribe = firebaseApp
        .firestore()
        .collection("posts")
        .doc(postId)
        .collection("answer")
        .doc(answerId)
        .collection("reactions")
        .where(
          "user",
          "==",
          firebaseApp
            .firestore()
            .collection("users")
            .doc(userId)
        )
        .limit(1)
        .onSnapshot(snapshot => {
          if (snapshot.empty) {
            return observer.next(null);
          }

          observer.next(firestoreSnapshotToAnswerReaction(snapshot.docs[0]));
        });

      return () => unsubscribe();
    });
}
