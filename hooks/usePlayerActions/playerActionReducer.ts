import { HandAction, HandStreet, HandActionType } from "@@/models/Hand";
import normalizeHandActions from "./normalizeGameStreetActions";
import updateGameStreetActionAt from "./updateGameStreetActionAt";
import { PlayerActions } from "./usePlayerActions";
import validatePlayerActions from "./validatePlayerAcitions";

export enum ActionType {
  new = "NEW",
  update = "UPDATE",
}

interface ReducerAction {
  actionType: ActionType;
  playerLength: number;
  street?: HandStreet;
  index?: number;
  action?: HandAction;
}

export default function plyarActionReducer(
  actions: PlayerActions,
  reducerAction: ReducerAction
) {
  const { actionType, street, playerLength, index, action } = reducerAction;

  switch (actionType) {
    case ActionType.new: {
      if (playerLength === undefined)
        throw new Error(
          "playerLength must be passed when createEmptyGameStreetActions"
        );

      return {
        actions: {
          preflop: Array.from({ length: playerLength }, (_, playerIndex) => ({
            type: HandActionType.fold,
            playerIndex,
            betSize: 0,
          })),
          flop: [],
          turn: [],
          river: [],
        },
        validations: {
          preflop: [],
          flop: [],
          turn: [],
          river: [],
        },
      };
    }

    case ActionType.update: {
      if (street === undefined)
        throw new Error("street must be passed for update");
      if (index === undefined)
        throw new Error("index must be passed for update");
      if (action === undefined)
        throw new Error("gameStreetAction must be passed for update");

      let { preflop, flop, turn, river } = actions.actions;

      if (street === HandStreet.preflop) {
        preflop = updateGameStreetActionAt({ actions: preflop, index, action });
      }

      preflop = normalizeHandActions({
        currentActions: preflop,
        activePlayerIndexes: new Set(
          Array.from({ length: playerLength }, (_, playerIndex) => playerIndex)
        ),
        isPreflop: true,
      });

      if (street === HandStreet.flop) {
        flop = updateGameStreetActionAt({ actions: flop, index, action });
      }

      flop = normalizeHandActions({
        currentActions: flop,
        activePlayerIndexes: new Set(
          preflop.map(({ playerIndex }) => playerIndex)
        ),
      });

      if (street === HandStreet.turn) {
        turn = updateGameStreetActionAt({ actions: turn, index, action });
      }

      turn = normalizeHandActions({
        currentActions: turn,
        activePlayerIndexes: new Set(
          flop.map(({ playerIndex }) => playerIndex)
        ),
      });

      if (street === HandStreet.river) {
        river = updateGameStreetActionAt({ actions: river, index, action });
      }

      river = normalizeHandActions({
        currentActions: river,
        activePlayerIndexes: new Set(
          turn.map(({ playerIndex }) => playerIndex)
        ),
      });

      return {
        actions: {
          preflop,
          flop,
          turn,
          river,
        },
        validations: {
          preflop: validatePlayerActions({ playerActions: preflop }),
          flop: validatePlayerActions({ playerActions: flop }),
          turn: validatePlayerActions({ playerActions: turn }),
          river: validatePlayerActions({ playerActions: river }),
        },
      };
    }
  }
}
