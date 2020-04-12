import * as firebase from "firebase/app";
import { Observable } from "rxjs";
import Post from "../models/Post";
import firestoreSnapshotToPost from "../serializers/firestoreSnapshotToPost";

export type SubscribePopularPosts = (options: {
  limit: number;
  acquisitionTermFrom: Date;
}) => Observable<Post[]>;

export function createSubscribePopularPosts({
  firebaseApp,
}: {
  firebaseApp: firebase.app.App;
}): SubscribePopularPosts {
  return ({ limit, acquisitionTermFrom }) =>
    new Observable<Post[]>((observer) => {
      const unsubscribe = firebaseApp
        .firestore()
        .collection("posts")
        .orderBy("createdAt")
        .startAt(acquisitionTermFrom)
        .onSnapshot((snapshot) => {
          const posts = snapshot.docs
            .map((doc) => firestoreSnapshotToPost(doc))
            .sort((post, _post) => _post.totalLikes - post.totalLikes)
            .slice(0, limit);

          observer.next(posts);
        });

      return () => unsubscribe();
    });
}
