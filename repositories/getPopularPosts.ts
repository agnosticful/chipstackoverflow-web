import * as firebase from "firebase/app";
import Post from "../models/Post";
import firestoreSnapshotToPost from "../serializers/firestoreSnapshotToPost";

export type GetPopularPosts = (options: {
  limit: number;
  acquisitionTermFrom: Date;
}) => Promise<Post[]>;

export function createGetPopularPosts({
  firebaseApp,
}: {
  firebaseApp: firebase.app.App;
}): GetPopularPosts {
  return async ({ limit, acquisitionTermFrom }) => {
    const snapshot = await firebaseApp
      .firestore()
      .collection("posts")
      .orderBy("createdAt")
      .startAt(acquisitionTermFrom)
      .get();

    const posts = snapshot.docs
      .map((doc) => firestoreSnapshotToPost(doc))
      .sort((a, b) => b.totalLikes - a.totalLikes)
      .slice(0, limit);

    return posts;
  };
}
