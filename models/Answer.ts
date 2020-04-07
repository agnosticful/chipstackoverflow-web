import { PostId } from "./Post";
import { UserId } from "./User";

export default interface Answer {
  id: AnswerId;
  post: PostId;
  user: UserId;
  body: AnswerBody;
  likes: number;
  dislikes: number;
  createdAt: Date;
}

export type AnswerId = string & {
  _AnswerIdBrand: never;
};

export type AnswerBody = string & {
  _AnswerBodyBrand: never;
};
