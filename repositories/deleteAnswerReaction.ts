import * as firebase from "firebase";
import AnswerReaction from "../models/AnswerReaction";

export type DeleteAnswerReaction = (
  answerReaction: AnswerReaction
) => Promise<void>;

export function createDeleteAnswerReaction({
  firebaseApp
}: {
  firebaseApp: firebase.app.App;
}): DeleteAnswerReaction {
  return async answerReaction => {
    await firebaseApp
      .firestore()
      .collection("post")
      .doc(answerReaction.post)
      .collection("answers")
      .doc(answerReaction.answer)
      .collection("reactions")
      .doc(answerReaction.id)
      .delete();
  };
}
