import Comment from "@@/models/Comment";
import User from "@@/models/User";

export default interface Answer {
  id: AnswerId;
  body: AnswerBody;
  likes: number;
  dislikes: number;
  liked: boolean;
  disliked: boolean;
  author: User;
  comments: Comment[];
  createdAt: Date;
  lastUpdatedAt: Date;
}

export type AnswerId = string & {
  _AnswerIdBrand: never;
};

export type AnswerBody = string & {
  _AnswerBodyBrand: never;
};
