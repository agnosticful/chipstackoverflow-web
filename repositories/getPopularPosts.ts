import * as firebase from "firebase/app";
import Post from "../models/Post";
import firestoreSnapshotToPost from "../serializers/firestoreSnapshotToPost";

export type GetPopularPosts = (options: {
  limit: number;
  tillWhen: Date;
}) => Promise<Post[]>;

export function createGetPopularPosts({
  firebaseApp,
}: {
  firebaseApp: firebase.app.App;
}): GetPopularPosts {
  return async ({ limit, tillWhen }) => {
    const snapshot = await firebaseApp
      .firestore()
      .collection("posts")
      .where("lastUpdatedAt", "<=", tillWhen)
      .orderBy("totalLike", "desc")
      .limit(limit)
      .get();

    return snapshot.docs.map((doc) => firestoreSnapshotToPost(doc));
  };
}
