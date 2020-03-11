import Post from "../models/Post";

export default function postToJSON(post: Post): Record<string, any> {
  return {
    id: post.id,
    user: post.user,
    title: post.title,
    body: post.body,
    likes: post.likes,
    dislikes: post.dislikes,
    gameSituation: post.gameSituation,
    createdAt: post.createdAt.toJSON(),
    lastUpdatedAt: post.lastUpdatedAt.toJSON()
  };
}
