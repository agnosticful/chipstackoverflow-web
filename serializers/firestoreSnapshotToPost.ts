import * as firebase from "firebase";
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
    likes: data.likes,
    dislikes: data.dislikes,
    gameSituation: data.gameSituation,
    createdAt: data.createdAt.toDate(),
    lastUpdatedAt: data.lastUpdatedAt.toDate()
  };
}
