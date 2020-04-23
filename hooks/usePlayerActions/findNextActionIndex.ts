import { GameStreetAction } from "../../models/GameSituation";

export default function findNextActionIndex({
  playerIndex,
  actions,
  start,
}: {
  playerIndex: number;
  actions: GameStreetAction[];
  start: number;
}) {
  const nextActionIndex = actions
    .slice(start)
    .findIndex((action) => action.playerIndex === playerIndex);

  return nextActionIndex === -1 ? -1 : start + nextActionIndex;
}
