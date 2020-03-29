import * as firebase from "firebase";
import Answer from "../models/Answer";
import ReactionType from "../models/ReactionType";
import User from "../models/User";

export type CreateAnswerReaction = (params: {
  answer: Answer;
  reactionType: ReactionType;
  user: User;
}) => Promise<void>;

export function createCreateAnswerReaction({
  firebaseApp
}: {
  firebaseApp: firebase.app.App;
}): CreateAnswerReaction {
  return async ({ answer, reactionType, user }) => {
    await firebaseApp
      .firestore()
      .collection("post")
      .doc(answer.post)
      .collection("answers")
      .doc(answer.id)
      .collection("reactions")
      .doc()
      .set({
        answer: firebaseApp
          .firestore()
          .collection("post")
          .doc(answer.post)
          .collection("answers")
          .doc(answer.id),
        user: firebaseApp
          .firestore()
          .collection("users")
          .doc(user.id),
        type: reactionType
      });
  };
}
