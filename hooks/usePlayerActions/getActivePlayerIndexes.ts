import {
  GameStreetAction,
  GameStreetActionType,
} from "../../models/GameSituation";
import getActivePlayerIndexSet from "./getActivePlayerIndexSet";

export default function getActivePlayerIndexes(
  gameStreetActions: GameStreetAction[],
  currentIndex: number
) {
  const activePlayerIndexSet = getActivePlayerIndexSet(gameStreetActions);

  for (const { type, playerIndex } of gameStreetActions.slice(
    0,
    currentIndex
  )) {
    if (type === GameStreetActionType.fold) {
      activePlayerIndexSet.delete(playerIndex);
    }
  }

  const activePlayerIndexes = Array.from(activePlayerIndexSet);

  const index = activePlayerIndexes.indexOf(
    gameStreetActions[currentIndex].playerIndex
  );

  return [
    ...activePlayerIndexes.slice(index + 1),
    ...activePlayerIndexes.slice(0, index),
  ];
}
