import { HandAction, HandActionType } from "@@/models/Hand";
import normalizeHandActions from "./normalizeGameStreetActions";
import updateGameStreetActionAt from "./updateGameStreetActionAt";
import { PlayerActions } from "./usePlayerActions";
import validatePlayerActions from "./validatePlayerAcitions";

export enum ActionType {
  new = "NEW",
  update = "UPDATE",
  normalize = "NORMALIZE",
}

interface ReducerAction {
  actionType: ActionType;
  playerLength?: number;
  isPreflop?: boolean;
  index?: number;
  action?: HandAction;
  activePlayerIndexes?: Set<number>;
}

export default function plyarActionReducer(
  playerActions: PlayerActions,
  reducerAction: ReducerAction
) {
  const {
    actionType,
    isPreflop,
    playerLength,
    index,
    action,
    activePlayerIndexes,
  } = reducerAction;

  switch (actionType) {
    case ActionType.new: {
      if (playerLength === undefined)
        throw new Error("playerLength must be passed when actionType is new");
      if (isPreflop === undefined)
        throw new Error("isPreflop must be passed when actionType is new");

      return {
        actions: isPreflop
          ? Array.from({ length: playerLength }, (_, playerIndex) => ({
              type: HandActionType.fold,
              playerIndex,
              betSize: 0,
            }))
          : [],
        validations: [],
        activePlayerLength: isPreflop ? playerLength : 0,
      };
    }

    case ActionType.update: {
      if (index === undefined)
        throw new Error("index must be passed for update");
      if (action === undefined)
        throw new Error("gameStreetAction must be passed for update");

      const { actions } = playerActions;

      const nextActions = updateGameStreetActionAt({ actions, index, action });

      return {
        actions: nextActions,
        validations: validatePlayerActions({ playerActions: nextActions }),
        activePlayerLength: new Set(nextActions).size,
      };
    }

    case ActionType.normalize: {
      if (activePlayerIndexes === undefined)
        throw new Error("activePlayerIndexes must be passed for normalize");

      const { actions } = playerActions;

      const nextActions = normalizeHandActions({
        currentActions: actions,
        activePlayerIndexes,
      });

      return {
        actions: nextActions,
        validations: validatePlayerActions({ playerActions: nextActions }),
        activePlayerLength: new Set(nextActions).size,
      };
    }
  }
}
