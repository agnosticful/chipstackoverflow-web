import * as firebase from "firebase/app";
import Post from "../models/Post";
import firestoreSnapshotToPost from "../serializers/firestoreSnapshotToPost";

export type GetPopularPosts = (options: {
  limit: number;
  acquisitionPeriodFrom: Date;
}) => Promise<Post[]>;

export function createGetPopularPosts({
  firebaseApp,
}: {
  firebaseApp: firebase.app.App;
}): GetPopularPosts {
  return async ({ limit, acquisitionPeriodFrom }) => {
    const snapshot = await firebaseApp
      .firestore()
      .collection("posts")
      .where("lastUpdatedAt", "<=", acquisitionPeriodFrom)
      .orderBy("totalLike", "desc")
      .limit(limit)
      .get();

    return snapshot.docs.map((doc) => firestoreSnapshotToPost(doc));
  };
}
