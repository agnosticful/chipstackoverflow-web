import {
  GameStreetAction,
  GameStreetActionType,
} from "../../models/GameSituation";

export default function isBetOrRaiseExistOnFollowingActions(
  gameStreetActions: GameStreetAction[],
  currentIndex: number
) {
  for (const { type } of gameStreetActions.slice(currentIndex + 1)) {
    if (
      type === GameStreetActionType.bet ||
      type === GameStreetActionType.raise
    )
      return true;
  }

  return false;
}
