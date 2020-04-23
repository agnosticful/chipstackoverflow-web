import { GameStreetAction } from '../../models/GameSituation';
import addGameStreetAction from './addGameStreetAction';
import createEmptyGameStreetActions from './createEmptyGameStreetActions';
import deleteGameStreetAction from './deleteGameStreetAction';
import updateGameStreetAction from './updateGameStreetAction';

interface ReducerAction {
  actionType: ActionType;
  street: Street;
  playerLength?: number;
  index?: number;
  action?: GameStreetAction;
  playerStackSizes?: number[];
}

export default function plyarActionReducer(actions: GameStreetAction[], reducerAction: ReducerAction) {
  const { actionType, street, playerLength, index, action, playerStackSizes } = reducerAction;

  switch (actionType) {
    case ActionType.new: {
      if (street === Street.preflop && playerLength === undefined)
        throw new Error('playerLength must be passed when createEmptyGameStreetActions');

      return createEmptyGameStreetActions({ street, playerLength: street === Street.preflop ? playerLength! : 0 });
    }

    case ActionType.update: {
      if (index === undefined) throw new Error('index must be passed when updateGameStreetAction');
      if (action === undefined) throw new Error('gameStreetAction must be passed when updateGameStreetAction');
      if (playerStackSizes === undefined)
        throw new Error('playerStackSizes must be passed when updateGameStreetAction');

      return updateGameStreetAction({ street, actions, index, action, playerStackSizes });
    }

    case ActionType.add:
      if (index === undefined) throw new Error('index must be passed when updateGameStreetAction');
      if (action === undefined) throw new Error('gameStreetAction must be passed when updateGameStreetAction');

      return addGameStreetAction({ street, actions, index, action });

    case ActionType.delete:
      if (index === undefined) throw new Error('index must be passed when updateGameStreetAction');

      return deleteGameStreetAction({ street, actions, index });
  }
}

export enum ActionType {
  new = 'NEW',
  add = 'ADD',
  delete = 'DELETE',
  update = 'UPDATE',
}

export enum Street {
  preflop = 'PREFLOP',
  flop = 'FLOP',
  turn = 'TURN',
  river = 'RIVER',
}
