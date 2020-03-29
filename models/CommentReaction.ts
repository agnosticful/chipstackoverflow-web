import { AnswerId } from "./Answer";
import { CommentId } from "./Comment";
import { PostId } from "./Post";
import ReactionType from "./ReactionType";
import { UserId } from "./User";

export default interface CommentReaction {
  id: CommentReactionId;
  post: PostId;
  answer: AnswerId;
  comment: CommentId;
  user: UserId;
  type: ReactionType;
}

export type CommentReactionId = string & {
  _CommentReactionIdBrand: never;
};
