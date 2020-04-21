import { GameStreetAction } from "../../models/GameSituation";

export default function getActivePlayerIndexSet(
  actions: GameStreetAction[]
): Set<number> {
  const activePlayerSet = new Set<number>();

  for (const action of actions) {
    if (activePlayerSet.has(action.playerIndex)) break;

    activePlayerSet.add(action.playerIndex);
  }

  return activePlayerSet;
}
