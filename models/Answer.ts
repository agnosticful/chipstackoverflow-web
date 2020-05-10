import Comment from "./Comment";
import User from "./User";

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
