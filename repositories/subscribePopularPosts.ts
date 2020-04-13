import * as firebase from "firebase/app";
import { Observable } from "rxjs";
import Post from "../models/Post";
import firestoreSnapshotToPost from "../serializers/firestoreSnapshotToPost";

export type SubscribePopularPosts = (options: {
  limit: number;
}) => Observable<Post[]>;

export function createSubscribePopularPosts({
  firebaseApp,
}: {
  firebaseApp: firebase.app.App;
}): SubscribePopularPosts {
  return ({ limit }) =>
    new Observable<Post[]>((observer) => {
      const unsubscribe = firebaseApp
        .firestore()
        .collection("posts")
        .orderBy("totalLikes", "desc")
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
