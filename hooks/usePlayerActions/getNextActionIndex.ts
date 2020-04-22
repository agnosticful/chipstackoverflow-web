import { GameStreetAction } from "../../models/GameSituation";

export default function getNextActionIndex(
  gameStreetActions: GameStreetAction[],
  currentIndex: number,
  playerIndex: number
) {
  return gameStreetActions
    .slice(currentIndex)
    .findIndex(
      (gameStreetAction) => gameStreetAction.playerIndex === playerIndex
    );
}
