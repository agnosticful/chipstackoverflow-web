import {
  GameStreetAction,
  GameStreetActionType,
} from "../../models/GameSituation";

export default function hasBestOrRaiseAfter(
  actions: GameStreetAction[],
  index: number
) {
  return actions
    .slice(index + 1)
    .some(
      ({ type }) =>
        type === GameStreetActionType.bet || type === GameStreetActionType.raise
    );
}
