import * as React from "react";
import { HandAction, HandStreet } from "@@/models/Hand";
import createEmptyGameStreetActions from "./createEmptyGameStreetActions";
import updateGameStreetActionAt from "./updateGameStreetActionAt";

export default function usePlayerActions({}) {}

interface ReducerAction {
  actionType: ActionType;
  street: HandStreet;
  playerLength?: number;
  index?: number;
  action?: HandAction;
}

function plyarActionReducer(
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
      if (index === undefined)
        throw new Error("index must be passed when updateGameStreetAction");
      if (action === undefined)
        throw new Error(
          "gameStreetAction must be passed when updateGameStreetAction"
        );

      const newActions = updateGameStreetActionAt({
        actions,
        index,
        action,
      });
    }
  }
}

export enum ActionType {
  new = "NEW",
  update = "UPDATE",
}
