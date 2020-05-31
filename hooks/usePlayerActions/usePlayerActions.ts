import * as React from "react";
import { HandAction, HandStreet, HandActionType } from "@@/models/Hand";
import reducer, { ActionType } from "./playerActionReducer";
import { PlayerActionValidation } from "./validatePlayerAcitions";

export interface PlayerActions {
  actions: HandAction[];
  validations: Set<PlayerActionValidation>[];
  activePlayerLength: number;
}

export default function usePlayerActions({
  playerLength,
  playerStackSizes,
}: {
  playerLength: number;
  smallBlindSize: number;
  playerStackSizes: number[];
}) {
  const [preflop, setPreflop] = React.useReducer(reducer, {
    actions: Array.from({ length: 2 }, (_, playerIndex) => ({
      type: HandActionType.fold,
      playerIndex,
      betSize: 0,
    })),
    validations: [],
    activePlayerLength: 0,
  });

  const [flop, setFlop] = React.useReducer(reducer, {
    actions: [],
    validations: [],
    activePlayerLength: 0,
  });

  const [turn, setTurn] = React.useReducer(reducer, {
    actions: [],
    validations: [],
    activePlayerLength: 0,
  });

  const [river, setRiver] = React.useReducer(reducer, {
    actions: [],
    validations: [],
    activePlayerLength: 0,
  });

  // 初期化処理
  React.useEffect(() => {
    setPreflop({
      actionType: ActionType.new,
      isPreflop: true,
      playerLength,
    });

    setFlop({
      actionType: ActionType.new,
    });

    setTurn({
      actionType: ActionType.new,
    });

    setRiver({
      actionType: ActionType.new,
    });
  }, [playerLength]);

  // playerStackSizesに変更があったとき
  React.useEffect(() => {}, [playerStackSizes]);

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
    switch (street) {
      case HandStreet.preflop:
        setPreflop({
          actionType: ActionType.update,
          index,
          action,
        });

        break;
      case HandStreet.flop:
        setFlop({
          actionType: ActionType.update,
          index,
          action,
        });

        break;
      case HandStreet.turn:
        setTurn({
          actionType: ActionType.update,
          index,
          action,
        });

        break;
      case HandStreet.river:
        setRiver({
          actionType: ActionType.update,
          index,
          action,
        });

        break;
    }
  };

  React.useEffect(() => {}, []);

  return {
    actions: {
      preflop: preflop.actions,
      flop: flop.actions,
      turn: turn.actions,
      river: river.actions,
    },
    actionValidations: {
      preflop: preflop.validations,
      flop: flop.validations,
      turn: turn.validations,
      river: river.validations,
    },
    setPlayerAction,
  };
}
