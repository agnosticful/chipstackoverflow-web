import * as firebase from "firebase/app";
import AnswerReaction, { AnswerReactionId } from "../models/AnswerReaction";

export default function firestoreDataToAnswerReaction(
  snapshot: firebase.firestore.DocumentSnapshot
): AnswerReaction {
  const data = snapshot.data()!;

  return {
    id: (snapshot.id as unknown) as AnswerReactionId,
    post: data.answer.parent.parent.id,
    answer: data.answer.id,
    user: data.user.id,
    type: data.type
  };
}
