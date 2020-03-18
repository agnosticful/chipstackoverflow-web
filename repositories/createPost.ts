import * as firebase from "firebase";
import { PostTitle, PostBody, PostId } from "../models/Post";
import { UserId } from "../models/User";
import GameSituation from "../models/GameSituation";

export interface PostData {
  userId: UserId;
  title: PostTitle;
  body: PostBody;
  gameSituation: GameSituation;
}

export type CreatePost = (postData: PostData) => Promise<PostId>;

export function createCreatePost({
  firebaseApp
}: {
  firebaseApp: firebase.app.App;
}): CreatePost {
  return async ({ userId, title, body, gameSituation }: PostData) => {
    console.log(userId, title, body, gameSituation);

    const createPost = firebaseApp.functions().httpsCallable("createPost");

    const id = await createPost({
      title: title,
      body: body,
      gameSituation: gameSituation
    });

    console.log("-------------------id", id);

    return (id as unknown) as PostId;
  };
}
