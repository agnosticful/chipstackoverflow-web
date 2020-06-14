import Post from "@@/models/Post";
import { fromAnswer, toAnswer } from "@@/serializers/json/answer";
import { fromHand, toHand } from "@@/serializers/json/hand";
import {
  fromUserProfile,
  toUserProfile,
} from "@@/serializers/json/userProfile";

export function fromPost(post: Post): Record<string, any> {
  return {
    ...post,
    hand: fromHand(post.hand),
    author: fromUserProfile(post.author),
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
      author: toUserProfile(json.author),
      answers: json.answers.map((answerJSON: any) => toAnswer(answerJSON)),
      createdAt: new Date(json.createdAt),
      lastUpdatedAt: new Date(json.lastUpdatedAt),
    } as Post
  );
}
