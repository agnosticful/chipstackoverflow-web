import { GameStreetAction } from "../../models/GameSituation";
import createEmptyGameStreetActions from "./createEmptyGameStreetActions";
import updateGameStreetAction from "./updateGameStreetAction";

interface Action {
  actionType: ActionType;
  street: Street;
  playerLength?: number;
  index?: number;
  gameStreetAction?: GameStreetAction;
  playerStackSizes?: number[];
}

export default function plyarActionReducer(
  gameStreetActions: GameStreetAction[],
  action: Action
) {
  const {
    actionType,
    street,
    playerLength,
    index,
    gameStreetAction,
    playerStackSizes,
  } = action;

  switch (actionType) {
    case ActionType.new: {
      if (street === Street.preflop && playerLength === undefined)
        throw new Error(
          "playerLength must be passed when createEmptyGameStreetActions"
        );

      return street === Street.preflop
        ? createEmptyGameStreetActions(street, playerLength!)
        : createEmptyGameStreetActions(street);
    }

    case ActionType.update: {
      if (index === undefined)
        throw new Error("index must be passed when updateGameStreetAction");
      if (gameStreetAction === undefined)
        throw new Error(
          "gameStreetAction must be passed when updateGameStreetAction"
        );
      if (playerStackSizes === undefined)
        throw new Error(
          "playerStackSizes must be passed when updateGameStreetAction"
        );

      return updateGameStreetAction(
        ActionType.update,
        gameStreetActions,
        playerStackSizes,
        street,
        index,
        gameStreetAction
      );
    }

    case ActionType.add:
      throw new Error("actionType must not be add by user interaction");

    case ActionType.delete:
      throw new Error("actionType must not be delete by user interaction");
  }
}

export enum ActionType {
  new = "NEW",
  add = "ADD",
  delete = "DELETE",
  update = "UPDATE",
}

export enum Street {
  preflop = "PREFLOP",
  flop = "FLOP",
  turn = "TURN",
  river = "RIVER",
}
