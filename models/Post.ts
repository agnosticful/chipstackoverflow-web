import GameSituation from "./GameSituation";
import { UserId } from "./User";

export default interface Post {
  id: PostId;
  user: UserId;
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
