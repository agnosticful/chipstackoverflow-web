import { GameStreetAction } from '../../models/GameSituation';
import { Street } from './playerActionReducer';

export default function addGameStreetAction({
  street,
  actions,
  index,
  action,
}: {
  street: Street;
  actions: GameStreetAction[];
  index: number;
  action: GameStreetAction;
}): GameStreetAction[] {
  if (index < 0 || actions.length < index)
    throw new Error('index must be more than or equal to 0 and less than or equal the street length');

  const newActions = Array.from(actions);

  if (index === street.length) {
    newActions.push(action);
  }

  if (index < street.length) {
    newActions.splice(index, 0, action);
  }

  return newActions;
}
