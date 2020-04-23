import { GameStreetActionType } from '../../models/GameSituation';
import { Street } from './playerActionReducer';

export default function createEmptyGameStreetActions({
  street,
  playerLength,
}: {
  street: Street;
  playerLength: number;
}) {
  return street === Street.preflop
    ? Array.from({ length: playerLength }, (_, playerIndex) => ({
        type: GameStreetActionType.fold,
        playerIndex,
        betSize: 0,
      }))
    : [];
}
