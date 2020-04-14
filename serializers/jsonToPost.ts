import Post from "../models/Post";

export default function jsonToPost(json: Record<string, any>): Post {
  return {
    id: json.id,
    user: json.user,
    title: json.title,
    body: json.body,
    totalLikes: json.totalLikes,
    totalDislikes: json.totalDislikes,
    gameSituation: json.gameSituation,
    createdAt: new Date(json.createdAt),
    lastUpdatedAt: new Date(json.lastUpdatedAt),
  };
}
