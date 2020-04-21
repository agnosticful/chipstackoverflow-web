import { GameStreetAction } from "../../models/GameSituation";

export default function getActivePlayerIndexSet(actions: GameStreetAction[]) {
  const activePlayerSet = new Set<number>();

  for (const streetAction of actions) {
    if (activePlayerSet.has(streetAction.playerIndex)) break;

    activePlayerSet.add(streetAction.playerIndex);
  }

  return activePlayerSet;
}
