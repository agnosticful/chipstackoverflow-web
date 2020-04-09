import * as firebase from "firebase/app";
import Post, { PostId } from "../models/Post";
import firestoreSnapshotToPost from "../serializers/firestoreSnapshotToPost";

export type GetPostById = (postId: PostId) => Promise<Post | null>;

export function createGetPostById({
  firebaseApp,
}: {
  firebaseApp: firebase.app.App;
}): GetPostById {
  return async (postId) => {
    const snapshot = await firebaseApp
      .firestore()
      .collection("posts")
      .doc(postId)
      .get();

    return snapshot.exists ? firestoreSnapshotToPost(snapshot) : null;
  };
}
