import GameSituation from "../models/GameSituation";

export default function calculateFinalPot(
  gameSituation: GameSituation
): number {
  const preflopPot: number[] = new Array(gameSituation.playerLength).fill(0);
  for (const { playerIndex, betSize } of gameSituation.preflop.actions) {
    preflopPot[playerIndex] = betSize;
  }

  const flopPot: number[] = new Array(gameSituation.playerLength).fill(0);
  if (gameSituation.flop)
    for (const { playerIndex, betSize } of gameSituation.flop.actions) {
      flopPot[playerIndex] = betSize;
    }

  const turnPot: number[] = new Array(gameSituation.playerLength).fill(0);
  if (gameSituation.turn)
    for (const { playerIndex, betSize } of gameSituation.turn.actions) {
      turnPot[playerIndex] = betSize;
    }

  const riverPot: number[] = new Array(gameSituation.playerLength).fill(0);
  if (gameSituation.river)
    for (const { playerIndex, betSize } of gameSituation.river.actions) {
      riverPot[playerIndex] = betSize;
    }

  return (
    gameSituation.antiSize * gameSituation.playerLength +
    preflopPot.reduce((pre, curr) => pre + curr, 0) +
    flopPot.reduce((pre, curr) => pre + curr, 0) +
    turnPot.reduce((pre, curr) => pre + curr, 0) +
    riverPot.reduce((pre, curr) => pre + curr, 0)
  );
}
