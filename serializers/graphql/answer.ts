import Answer from "../../models/Answer";
import { toComment } from "./comment";
import { toUser } from "./user";

export function toAnswer(value: any): Answer {
  return {
    id: value.id,
    body: value.body,
    likes: value.likes,
    dislikes: value.dislikes,
    liked: value.liked,
    disliked: value.disliked,
    author: toUser(value.author),
    comments: value.comments.map((item: any) => toComment(item)),
    createdAt: new Date(),
    lastUpdatedAt: new Date(),
  };
}
