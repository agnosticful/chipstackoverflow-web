import * as firebase from "firebase/app";
import Post, { PostId } from "../models/Post";

export default function firestoreDataToPost(
  snapshot: firebase.firestore.DocumentSnapshot
): Post {
  const data = snapshot.data()!;

  return {
    id: (snapshot.id as unknown) as PostId,
    user: data.user.id,
    title: data.title,
    body: data.body,
    totalLikes: data.totalLikes,
    totalDislikes: data.totalDislikes,
    gameSituation: data.gameSituation,
    createdAt: data.createdAt.toDate(),
    lastUpdatedAt: data.lastUpdatedAt.toDate(),
  };
}
