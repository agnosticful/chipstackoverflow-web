import Comment from "@@/models/Comment";
import { fromUser, toUser } from "@@/serializers/json/user";

export function fromComment(comment: Comment): Record<string, any> {
  return {
    ...comment,
    author: fromUser(comment.author),
    createdAt: comment.createdAt.toJSON(),
    lastUpdatedAt: comment.lastUpdatedAt.toJSON(),
  };
}

export function toComment(json: Record<string, any>): Comment {
  return (
    {
      ...json,
      author: toUser(json.author),
      createdAt: new Date(json.createdAt),
      lastUpdatedAt: new Date(json.lastUpdatedAt),
    } as Comment
  );
}
