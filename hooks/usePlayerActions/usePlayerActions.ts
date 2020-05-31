import * as React from "react";
import { HandAction, HandStreet, HandActionType } from "@@/models/Hand";
import reducer, { ActionType } from "./playerActionReducer";
import { PlayerActionValidation } from "./validatePlayerAcitions";

export interface PlayerActions {
  actions: {
    preflop: HandAction[];
    flop: HandAction[];
    turn: HandAction[];
    river: HandAction[];
  };
  validations: {
    preflop: Set<PlayerActionValidation>[];
    flop: Set<PlayerActionValidation>[];
    turn: Set<PlayerActionValidation>[];
    river: Set<PlayerActionValidation>[];
  };
}

export default function usePlayerActions({
  playerLength,
  smallBlindSize,
  playerStackSizes,
}: {
  playerLength: number;
  smallBlindSize: number;
  playerStackSizes: number[];
}) {
  const [actions, setActions] = React.useReducer(
    reducer,
    initialPlayerActioons
  );

  // 初期化処理
  React.useEffect(() => {
    setActions({
      actionType: ActionType.new,
      playerLength,
    });
  }, [playerLength, smallBlindSize, playerStackSizes]);

  // アクション変更時の処理
  const setPlayerAction = ({
    street,
    index,
    action,
  }: {
    street: HandStreet;
    index: number;
    action: HandAction;
  }) => {
    setActions({
      actionType: ActionType.update,
      playerLength,
      street,
      index,
      action,
    });
  };

  return {
    actions: actions.actions,
    actionValidations: actions.validations,
    setPlayerAction,
  };
}

const initialPlayerActioons: PlayerActions = {
  actions: {
    preflop: Array.from({ length: 2 }, (_, playerIndex) => ({
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
