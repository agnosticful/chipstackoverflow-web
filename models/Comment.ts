import { AnswerId } from "./Answer";
import { UserId } from "./User";
import { PostId } from "./Post";

export default interface Comment {
  id: CommentId;
  post: PostId;
  answer: AnswerId;
  user: UserId;
  body: CommentBody;
  likes: number;
  dislikes: number;
  createdAt: Date;
}

export type CommentId = string & {
  _CommentIdBrand: never;
};

export type CommentBody = string & {
  _CommentBodyBrand: never;
};
