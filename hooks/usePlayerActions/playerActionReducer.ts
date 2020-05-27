import { HandAction, HandStreet } from "@@/models/Hand";
import createEmptyGameStreetActions from "./createEmptyGameStreetActions";
import updateGameStreetActionAt from "./updateGameStreetActionAt";
import normalizeHandActions from "./normalizeGameStreetActions";

export enum ActionType {
  new = "NEW",
  update = "UPDATE",
}

interface ReducerAction {
  actionType: ActionType;
  street: HandStreet;
  playerLength?: number;
  index?: number;
  action?: HandAction;
}

export default function plyarActionReducer(
  actions: HandAction[],
  reducerAction: ReducerAction
) {
  const { actionType, street, playerLength, index, action } = reducerAction;

  switch (actionType) {
    case ActionType.new: {
      if (street === HandStreet.preflop && playerLength === undefined)
        throw new Error(
          "playerLength must be passed when createEmptyGameStreetActions"
        );

      return createEmptyGameStreetActions({
        street,
        playerLength: street === HandStreet.preflop ? playerLength! : 0,
      });
    }

    case ActionType.update: {
      if (street === undefined)
        throw new Error("street must be passed when updateGameStreetAction");
      if (index === undefined)
        throw new Error("index must be passed when updateGameStreetAction");
      if (action === undefined)
        throw new Error(
          "gameStreetAction must be passed when updateGameStreetAction"
        );

      const updatedActions = updateGameStreetActionAt({
        actions,
        index,
        action,
      });

      return normalizeHandActions({
        currentActions: updatedActions,
        activePlayerIndexes: new Set(
          updatedActions.map(({ playerIndex }) => playerIndex)
        ),
        isPreflop: street === HandStreet.preflop,
      });
    }
  }
}
