import * as firebase from "firebase/app";
import { Observable } from "rxjs";
import Post from "../models/Post";
import firestoreSnapshotToPost from "../serializers/firestoreSnapshotToPost";

export type SubscribeRecentPosts = (options: {
  limit: number;
}) => Observable<Post[]>;

export function createSubscribeRecentPosts({
  firebaseApp,
}: {
  firebaseApp: firebase.app.App;
}): SubscribeRecentPosts {
  return ({ limit }) =>
    new Observable<Post[]>((observer) => {
      const unsubscribe = firebaseApp
        .firestore()
        .collection("posts")
        .orderBy("lastUpdatedAt", "desc")
        .limit(limit)
        .onSnapshot((snapshot) => {
          const posts = snapshot.docs.map((doc) =>
            firestoreSnapshotToPost(doc)
          );

          observer.next(posts);
        });

      return () => unsubscribe();
    });
}
