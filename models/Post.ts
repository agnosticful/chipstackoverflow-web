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

export interface PostId extends String {
  _PostIdBrand: never;
}

export interface PostTitle extends String {
  _PostTitleBrand: never;
}

export interface PostBody extends String {
  _PostBodyBrand: never;
}
