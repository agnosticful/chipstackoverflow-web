import {
  GameStreetAction,
  GameStreetActionType,
} from "../../models/GameSituation";

export default function getNextExpectedActionIndex(
  actions: GameStreetAction[],
  index: number
) {
  const playerIndexSet = new Set(actions.map(({ playerIndex }) => playerIndex));

  for (const { type, playerIndex } of actions.slice(0, index)) {
    if (type === GameStreetActionType.fold) {
      playerIndexSet.delete(playerIndex);
    }
  }

  const nextExpectedActionIndex = index + playerIndexSet.size;

  if (actions.length < nextExpectedActionIndex)
    throw new Error(
      "nextExpectedActionIndex must be less than or equal to length of gameStreetActions"
    );

  return nextExpectedActionIndex;
}
