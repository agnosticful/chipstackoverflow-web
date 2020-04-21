import {
  GameStreetAction,
  GameStreetActionType,
} from "../../models/GameSituation";
import getActivePlayerIndexSet from "./getActivePlayerIndexSet";

export default function getActivePlayerIndexes(
  actions: GameStreetAction[],
  index: number
) {
  const activePlayerIndexSet = getActivePlayerIndexSet(actions);

  for (const { type, playerIndex } of actions.slice(0, index)) {
    if (type === GameStreetActionType.fold) {
      activePlayerIndexSet.delete(playerIndex);
    }
  }

  const activePlayerIndexes = Array.from(activePlayerIndexSet);

  const playerIndex = activePlayerIndexes.indexOf(actions[index].playerIndex);

  return [
    ...activePlayerIndexes.slice(playerIndex + 1),
    ...activePlayerIndexes.slice(0, playerIndex),
  ];
}
