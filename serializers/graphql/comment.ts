import { toUser } from "@@/serializers/graphql/user";

export function toComment(value: any) {
  return {
    id: value.id,
    body: value.body,
    likes: value.likes,
    dislikes: value.dislikes,
    liked: value.liked,
    disliked: value.disliked,
    author: toUser(value.author),
    createdAt: new Date(),
    lastUpdatedAt: new Date(),
  };
}
