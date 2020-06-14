import Answer from "@@/models/Answer";
import Hand from "@@/models/Hand";
import User from "@@/models/UserProfile";

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
  hand: Hand;
  heroIndex: number;
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
