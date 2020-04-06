import * as firebase from "firebase/app";
import Post from "../models/Post";
import firestoreSnapshotToPost from "../serializers/firestoreSnapshotToPost";

export type GetRecentPosts = (options: { limit: number }) => Promise<Post[]>;

export function createGetRecentPosts({
  firebaseApp,
}: {
  firebaseApp: firebase.app.App;
}): GetRecentPosts {
  return async ({ limit }) => {
    const snapshot = await firebaseApp
      .firestore()
      .collection("posts")
      .orderBy("lastUpdatedAt", "desc")
      .limit(limit)
      .get();

    return snapshot.docs.map((doc) => firestoreSnapshotToPost(doc));
  };
}
