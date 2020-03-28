import * as firebase from "firebase/app";
import Answer, { AnswerId } from "../models/Answer";

export default function firestoreDataToAnswer(
  snapshot: firebase.firestore.DocumentSnapshot
): Answer {
  const data = snapshot.data()!;

  return {
    id: (snapshot.id as unknown) as AnswerId,
    post: data.post.id,
    user: data.user.id,
    body: data.body,
    likes: data.likes,
    dislikes: data.dislikes,
    createdAt: data.createdAt.toDate()
  };
}
