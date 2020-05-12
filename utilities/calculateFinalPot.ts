import GameSituation from "../models/GameSituation";

export default function calculateFinalPot(
  gameSituation: GameSituation
): number {
  const lastPlayerBetSizesOnPreflop: number[] = new Array(
    gameSituation.players.length
  ).fill(0);
  for (const { playerIndex, betSize } of gameSituation.preflopActions) {
    lastPlayerBetSizesOnPreflop[playerIndex] = betSize;
  }

  const lastPlayerBetSizesOnFlopPot: number[] = new Array(
    gameSituation.players.length
  ).fill(0);
  for (const { playerIndex, betSize } of gameSituation.flopActions) {
    lastPlayerBetSizesOnFlopPot[playerIndex] = betSize;
  }

  const lastPlayerBetSizesOnTurnPot: number[] = new Array(
    gameSituation.players.length
  ).fill(0);
  for (const { playerIndex, betSize } of gameSituation.turnActions) {
    lastPlayerBetSizesOnTurnPot[playerIndex] = betSize;
  }

  const lastPlayerBetSizesOnRiverPot: number[] = new Array(
    gameSituation.players.length
  ).fill(0);
  for (const { playerIndex, betSize } of gameSituation.riverActions) {
    lastPlayerBetSizesOnRiverPot[playerIndex] = betSize;
  }

  return (
    gameSituation.antiSize * gameSituation.players.length +
    lastPlayerBetSizesOnPreflop.reduce((pre, curr) => pre + curr, 0) +
    lastPlayerBetSizesOnFlopPot.reduce((pre, curr) => pre + curr, 0) +
    lastPlayerBetSizesOnTurnPot.reduce((pre, curr) => pre + curr, 0) +
    lastPlayerBetSizesOnRiverPot.reduce((pre, curr) => pre + curr, 0)
  );
}
