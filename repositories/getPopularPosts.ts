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
      .orderBy("createdAt")
      .startAt(acquisitionPeriodFrom)
      .get();

    const posts = snapshot.docs
      .map((doc) => firestoreSnapshotToPost(doc))
      .sort((post, _post) => _post.totalLikes - post.totalLikes)
      .slice(0, limit);

    return posts;
  };
}
