import GameSituation from '../models/GameSituation';

export default function calculateFinalPot(gameSituation: GameSituation): number {
  const preflopPot = gameSituation.preflop.actions.reduce((sum, { betSize }) => sum + betSize, 0);
  const flopPot = gameSituation.flop ? gameSituation.flop.actions.reduce((sum, { betSize }) => sum + betSize, 0) : 0;
  const turnPot = gameSituation.turn ? gameSituation.turn.actions.reduce((sum, { betSize }) => sum + betSize, 0) : 0;
  const riverPot = gameSituation.river ? gameSituation.river.actions.reduce((sum, { betSize }) => sum + betSize, 0) : 0;

  return preflopPot + flopPot + turnPot + riverPot;
}
