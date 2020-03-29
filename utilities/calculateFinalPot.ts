import GameSituation from "../models/GameSituation";

export default function calculateFinalPot(
  gameSituation: GameSituation
): number {
  const lastPlayerBetSizesOnPreflop: number[] = new Array(
    gameSituation.playerLength
  ).fill(0);
  for (const { playerIndex, betSize } of gameSituation.preflop.actions)
    lastPlayerBetSizesOnPreflop[playerIndex] = betSize;

  const lastPlayerBetSizesOnFlopPot: number[] = new Array(
    gameSituation.playerLength
  ).fill(0);
  if (gameSituation.flop) {
    for (const { playerIndex, betSize } of gameSituation.flop.actions)
      lastPlayerBetSizesOnFlopPot[playerIndex] = betSize;
  }

  const lastPlayerBetSizesOnTurnPot: number[] = new Array(
    gameSituation.playerLength
  ).fill(0);
  if (gameSituation.turn) {
    for (const { playerIndex, betSize } of gameSituation.turn.actions)
      lastPlayerBetSizesOnTurnPot[playerIndex] = betSize;
  }

  const lastPlayerBetSizesOnRiverPot: number[] = new Array(
    gameSituation.playerLength
  ).fill(0);
  if (gameSituation.river) {
    for (const { playerIndex, betSize } of gameSituation.river.actions)
      lastPlayerBetSizesOnRiverPot[playerIndex] = betSize;
  }

  return (
    gameSituation.antiSize * gameSituation.playerLength +
    lastPlayerBetSizesOnPreflop.reduce((pre, curr) => pre + curr, 0) +
    lastPlayerBetSizesOnFlopPot.reduce((pre, curr) => pre + curr, 0) +
    lastPlayerBetSizesOnTurnPot.reduce((pre, curr) => pre + curr, 0) +
    lastPlayerBetSizesOnRiverPot.reduce((pre, curr) => pre + curr, 0)
  );
}
