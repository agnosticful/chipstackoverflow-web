import * as firebase from "firebase";
import GameSituation from "../models/GameSituation";
import { PostTitle, PostBody, PostId } from "../models/Post";
import { UserId } from "../models/User";

export interface PostData {
  userId: UserId;
  title: PostTitle;
  body: PostBody;
  gameSituation: GameSituation;
}

export type CreateNewPost = (postData: PostData) => Promise<PostId>;

export function createCreateNewPost({
  firebaseApp
}: {
  firebaseApp: firebase.app.App;
}): CreateNewPost {
  return async ({ userId, title, body, gameSituation }: PostData) => {
    const now = Date.now();

    const firestore = firebaseApp.firestore();
    const ref = await firestore.collection("posts").add({
      user: firestore.collection("users").doc((userId as unknown) as string),
      title: title,
      body: body,
      likes: 0,
      dislikes: 0,
      gameSituation: gameSituation,
      createdAt: now,
      lastUpdatedAt: now
    });

    return (ref.id as unknown) as PostId;
  };
}
