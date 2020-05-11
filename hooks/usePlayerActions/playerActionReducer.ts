import { GameStreetAction } from "../../models/GameSituation";
import createEmptyGameStreetActions from "./createEmptyGameStreetActions";
import updateGameStreetActionAt from "./updateGameStreetActionAt";
import adjustGameStreetActions from "./adjustGameStreetActions";

interface ReducerAction {
  actionType: ActionType;
  street: Street;
  playerLength?: number;
  index?: number;
  action?: GameStreetAction;
}

export default function plyarActionReducer(
  actions: GameStreetAction[],
  reducerAction: ReducerAction
) {
  const { actionType, street, playerLength, index, action } = reducerAction;

  switch (actionType) {
    case ActionType.new: {
      if (street === Street.preflop && playerLength === undefined)
        throw new Error(
          "playerLength must be passed when createEmptyGameStreetActions"
        );

      return createEmptyGameStreetActions({
        street,
        playerLength: street === Street.preflop ? playerLength! : 0,
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

      return adjustGameStreetActions({
        actions: newActions,
        activePlayers: Array.from(
          new Set(newActions.map((action) => action.playerIndex))
        ),
      });
    }
  }
}

export enum ActionType {
  new = "NEW",
  update = "UPDATE",
}

export enum Street {
  preflop = "PREFLOP",
  flop = "FLOP",
  turn = "TURN",
  river = "RIVER",
}
