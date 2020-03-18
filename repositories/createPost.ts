import * as firebase from "firebase";
import GameSituation from "../models/GameSituation";
import { PostTitle, PostBody, PostId } from "../models/Post";

export interface PostData {
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
  return async ({ title, body, gameSituation }: PostData) => {
    const createPost = firebaseApp.functions().httpsCallable("createPost");
    const id = await createPost({
      title: title,
      body: body,
      gameSituation: gameSituation
    });

    return (id as unknown) as PostId;
  };
}
