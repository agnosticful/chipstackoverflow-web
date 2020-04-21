import { GameStreetAction } from '../../models/GameSituation';

export default function getActivePlayerIndexSet(gameStreetActions: GameStreetAction[]) {
  const activePlayerSet = new Set<number>();

  for (const streetAction of gameStreetActions) {
    if (activePlayerSet.has(streetAction.playerIndex)) break;

    activePlayerSet.add(streetAction.playerIndex);
  }

  return activePlayerSet;
}
