import GameSituation from "../models/GameSituation";

export default function calculateFinalPot(
  gameSituation: GameSituation
): number {
  const preflopPot: number[] = new Array(gameSituation.playerLength).fill(0);
  gameSituation.preflop.actions.forEach(({ playerIndex, betSize }) => {
    if (betSize !== 0) preflopPot[playerIndex] = betSize;
  });

  const flopPot: number[] = new Array(gameSituation.playerLength).fill(0);
  if (gameSituation.flop)
    gameSituation.flop.actions.forEach(({ playerIndex, betSize }) => {
      if (betSize !== 0) flopPot[playerIndex] = betSize;
    });

  const turnPot: number[] = new Array(gameSituation.playerLength).fill(0);
  if (gameSituation.turn)
    gameSituation.turn.actions.forEach(({ playerIndex, betSize }) => {
      if (betSize !== 0) turnPot[playerIndex] = betSize;
    });

  const riverPot: number[] = new Array(gameSituation.playerLength).fill(0);
  if (gameSituation.river)
    gameSituation.river.actions.forEach(({ playerIndex, betSize }) => {
      if (betSize !== 0) riverPot[playerIndex] = betSize;
    });

  return (
    gameSituation.antiSize * gameSituation.playerLength +
    preflopPot.reduce((pre, curr) => pre + curr, 0) +
    flopPot.reduce((pre, curr) => pre + curr, 0) +
    turnPot.reduce((pre, curr) => pre + curr, 0) +
    riverPot.reduce((pre, curr) => pre + curr, 0)
  );
}
