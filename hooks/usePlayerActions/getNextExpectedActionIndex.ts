import { GameStreetAction } from "../../models/GameSituation";
import getActivePlayerIndexes from "./getActivePlayerIndexes";

export default function getNextExpectedActionIndex(
  gameStreetActions: GameStreetAction[],
  currentIndex: number
) {
  const activePlayerIndexes = getActivePlayerIndexes(
    gameStreetActions,
    currentIndex
  );
  const nextExpectActionIndex = currentIndex + activePlayerIndexes.length + 1;

  if (gameStreetActions.length < nextExpectActionIndex)
    throw new Error(
      "nextExpectActionIndex must be less than or equal to gameStreetActions length"
    );

  return nextExpectActionIndex;
}
