import Answer from "./Answer";
import GameSituation from "./GameSituation";
import User from "./User";

export default interface Post extends PostMinimum {
  author: User;
  answers: Answer[];
}

export interface PostMinimum {
  id: PostId;
  title: PostTitle;
  body: PostBody;
  likes: number;
  dislikes: number;
  gameSituation: GameSituation;
  createdAt: Date;
  lastUpdatedAt: Date;
}

export type PostId = string & {
  _PostIdBrand: never;
};

export type PostTitle = string & {
  _PostTitleBrand: never;
};

export type PostBody = string & {
  _PostBodyBrand: never;
};
