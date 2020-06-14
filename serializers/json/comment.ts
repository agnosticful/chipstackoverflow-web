import Comment from "@@/models/Comment";
import {
  fromUserProfile,
  toUserProfile,
} from "@@/serializers/json/userProfile";

export function fromComment(comment: Comment): Record<string, any> {
  return {
    ...comment,
    author: fromUserProfile(comment.author),
    createdAt: comment.createdAt.toJSON(),
    lastUpdatedAt: comment.lastUpdatedAt.toJSON(),
  };
}

export function toComment(json: Record<string, any>): Comment {
  return (
    {
      ...json,
      author: toUserProfile(json.author),
      createdAt: new Date(json.createdAt),
      lastUpdatedAt: new Date(json.lastUpdatedAt),
    } as Comment
  );
}
