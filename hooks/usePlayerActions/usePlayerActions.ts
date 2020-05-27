import * as React from "react";
import { HandAction, HandStreet } from "@@/models/Hand";
import reducer, { ActionType } from "./playerActionReducer";

export default function usePlayerActions({
  playerLength,
  smallBlindSize,
  playerStackSizes,
}: {
  playerLength: number;
  smallBlindSize: number;
  playerStackSizes: number[];
}) {
  const [preflop, setPreflop] = React.useReducer(reducer, []);
  const [flop, setFlop] = React.useReducer(reducer, []);
  const [turn, setTurn] = React.useReducer(reducer, []);
  const [river, setRiver] = React.useReducer(reducer, []);

  // 初期化処理
  React.useEffect(() => {
    setPreflop({
      actionType: ActionType.new,
      street: HandStreet.preflop,
      playerLength,
    });

    setFlop({
      actionType: ActionType.new,
      street: HandStreet.flop,
      playerLength,
    });

    setTurn({
      actionType: ActionType.new,
      street: HandStreet.turn,
      playerLength,
    });

    setRiver({
      actionType: ActionType.new,
      street: HandStreet.river,
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
    switch (street) {
      case HandStreet.preflop:
        setPreflop({
          actionType: ActionType.update,
          street,
          index,
          action,
        });

        break;
      case HandStreet.flop:
        setFlop({
          actionType: ActionType.update,
          street,
          index,
          action,
        });

        break;
      case HandStreet.turn:
        setTurn({
          actionType: ActionType.update,
          street,
          index,
          action,
        });

        break;
      case HandStreet.river:
        setRiver({
          actionType: ActionType.update,
          street,
          index,
          action,
        });

        break;
    }
  };

  return {
    actions: {
      preflop,
      flop,
      turn,
      river,
    },
    actionValidations: {},
    setPlayerAction,
  };
}
