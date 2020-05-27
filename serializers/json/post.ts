import Post from "@@/models/Post";
import { fromAnswer, toAnswer } from "@@/serializers/json/answer";
import { fromHand, toHand } from "@@/serializers/json/hand";
import { fromUser, toUser } from "@@/serializers/json/user";

export function fromPost(post: Post): Record<string, any> {
  return {
    ...post,
    hand: fromHand(post.hand),
    author: fromUser(post.author),
    answers: post.answers.map((answer) => fromAnswer(answer)),
    createdAt: post.createdAt.toJSON(),
    lastUpdatedAt: post.lastUpdatedAt.toJSON(),
  };
}

export function toPost(json: Record<string, any>): Post {
  return (
    {
      ...json,
      hand: toHand(json.hand),
      author: toUser(json.author),
      answers: json.answers.map((answerJSON: any) => toAnswer(answerJSON)),
      createdAt: new Date(json.createdAt),
      lastUpdatedAt: new Date(json.lastUpdatedAt),
    } as Post
  );
}
