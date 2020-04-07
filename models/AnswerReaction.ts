import { AnswerId } from "./Answer";
import { PostId } from "./Post";
import ReactionType from "./ReactionType";
import { UserId } from "./User";

export default interface AnswerReaction {
  id: AnswerReactionId;
  post: PostId;
  answer: AnswerId;
  user: UserId;
  type: ReactionType;
}

export type AnswerReactionId = string & {
  _AnswerReactionIdBrand: never;
};
