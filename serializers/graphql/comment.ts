import { toUserProfile } from "@@/serializers/graphql/userProfile";

export function toComment(value: any) {
  return {
    id: value.id,
    body: value.body,
    likes: value.likes,
    dislikes: value.dislikes,
    liked: value.liked,
    disliked: value.disliked,
    author: toUserProfile(value.author),
    createdAt: new Date(value.createdAt),
    lastUpdatedAt: new Date(value.lastUpdatedAt),
  };
}
