import Post from "../models/Post";

export default function jsonToPost(json: Record<string, any>): Post {
  return {
    id: json.id,
    user: json.user,
    title: json.title,
    body: json.body,
    likes: json.likes,
    dislikes: json.dislikes,
    gameSituation: json.gameSituation,
    createdAt: new Date(json.createdAt),
    lastUpdatedAt: new Date(json.lastUpdatedAt),
  };
}
