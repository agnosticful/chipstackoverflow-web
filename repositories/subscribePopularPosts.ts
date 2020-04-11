import * as firebase from "firebase/app";
import { Observable } from "rxjs";
import Post from "../models/Post";
import firestoreSnapshotToPost from "../serializers/firestoreSnapshotToPost";

export type SubscribePopularPosts = (options: {
  limit: number;
  acquisitionPeriodFrom: Date;
}) => Observable<Post[]>;

export function createSubscribePopularPosts({
  firebaseApp,
}: {
  firebaseApp: firebase.app.App;
}): SubscribePopularPosts {
  return ({ limit, acquisitionPeriodFrom }) =>
    new Observable<Post[]>((observer) => {
      const unsubscribe = firebaseApp
        .firestore()
        .collection("posts")
        .where("lastUpdatedAt", "<=", acquisitionPeriodFrom)
        .orderBy("totalLike", "desc")
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
