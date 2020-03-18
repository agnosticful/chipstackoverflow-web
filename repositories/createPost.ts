import * as firebase from "firebase";
import GameSituation from "../models/GameSituation";
import { PostTitle, PostBody, PostId } from "../models/Post";

export interface PostData {
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
