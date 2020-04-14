import * as firebase from "firebase/app";
import Post from "../models/Post";
import firestoreSnapshotToPost from "../serializers/firestoreSnapshotToPost";

export type GetPopularPosts = (options: { limit: number }) => Promise<Post[]>;

export function createGetPopularPosts({
  firebaseApp,
}: {
  firebaseApp: firebase.app.App;
}): GetPopularPosts {
  return async ({ limit }) => {
    const snapshot = await firebaseApp
      .firestore()
      .collection("posts")
      .orderBy("totalLikes", "desc")
      .limit(limit)
      .get();

    return snapshot.docs.map((doc) => firestoreSnapshotToPost(doc));
  };
}
