import { GameStreetAction } from "../models/GameSituation";

export default function calculateFinalPot({
  playerLength,
  smallBlindSize,
  antiSize,
  preflopActions,
  flopActions,
  turnActions,
  riverActions
}: {
  playerLength: number;
  smallBlindSize: number;
  antiSize: number;
  preflopActions: GameStreetAction[];
  flopActions?: GameStreetAction[];
  turnActions?: GameStreetAction[];
  riverActions?: GameStreetAction[];
}): number {
  const preflopPot = preflopActions.reduce((sum, { playerIndex, betSize }) => {
    return playerIndex === 0 && betSize === 0
      ? sum + smallBlindSize
      : playerIndex === 1 && betSize === 0
      ? sum + 1
      : sum + betSize;
  }, 0);
  const flopPot = flopActions
    ? flopActions.reduce((sum, { betSize }) => sum + betSize, 0)
    : 0;
  const turnPot = turnActions
    ? turnActions.reduce((sum, { betSize }) => sum + betSize, 0)
    : 0;
  const riverPot = riverActions
    ? riverActions.reduce((sum, { betSize }) => sum + betSize, 0)
    : 0;

  return antiSize * playerLength + preflopPot + flopPot + turnPot + riverPot;
}
