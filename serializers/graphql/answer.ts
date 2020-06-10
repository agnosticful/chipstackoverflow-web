import Answer from "@@/models/Answer";
import { toComment } from "@@/serializers/graphql/comment";
import { toUser } from "@@/serializers/graphql/user";

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
    createdAt: new Date(value.createdAt),
    lastUpdatedAt: new Date(value.lastUpdatedAt),
  };
}
