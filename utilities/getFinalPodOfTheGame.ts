import GameSituation from '../models/GameSituation';

export default function getFinalPodOfTheGame(gameSituation: GameSituation): number {
  const preflopPod = gameSituation.preflop.actions.reduce((sum, { betSize }) => sum + betSize, 0);
  const flopPod = gameSituation.flop ? gameSituation.flop.actions.reduce((sum, { betSize }) => sum + betSize, 0) : 0;
  const turnPod = gameSituation.turn ? gameSituation.turn.actions.reduce((sum, { betSize }) => sum + betSize, 0) : 0;
  const riverPod = gameSituation.river ? gameSituation.river.actions.reduce((sum, { betSize }) => sum + betSize, 0) : 0;

  return preflopPod + flopPod + turnPod + riverPod;
}
