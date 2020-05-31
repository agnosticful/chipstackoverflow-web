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
      isPreflop: false,
    });

    setTurn({
      actionType: ActionType.new,
      isPreflop: false,
    });

    setRiver({
      actionType: ActionType.new,
      isPreflop: false,
    });
  }, [playerLength]);

  // playerStackSizesに変更があったとき
  React.useEffect(() => {
    setPreflop({
      actionType: ActionType.normalize,
      activePlayerIndexes: new Set(
        preflop.actions.map(({ playerIndex }) => playerIndex)
      ),
      playerStackSizes,
    });
  }, [playerStackSizes]);

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
      case HandStreet.preflop: {
        setPreflop({
          actionType: ActionType.update,
          index,
          action,
          activePlayerIndexes: new Set(
            Array.from(
              { length: playerLength },
              (_, playerIndex) => playerIndex
            )
          ),
          playerStackSizes,
        });

        break;
      }

      case HandStreet.flop: {
        setFlop({
          actionType: ActionType.update,
          index,
          action,
          activePlayerIndexes: new Set(
            preflop.actions.map(({ playerIndex }) => playerIndex)
          ),
          playerStackSizes,
        });

        break;
      }

      case HandStreet.turn: {
        setTurn({
          actionType: ActionType.update,
          index,
          action,
          activePlayerIndexes: new Set(
            flop.actions.map(({ playerIndex }) => playerIndex)
          ),
          playerStackSizes,
        });

        break;
      }

      case HandStreet.river: {
        setRiver({
          actionType: ActionType.update,
          index,
          action,
          activePlayerIndexes: new Set(
            turn.actions.map(({ playerIndex }) => playerIndex)
          ),
          playerStackSizes,
        });

        break;
      }
    }
  };

  // updataを受けて、activePlayersに変更があったとき
  React.useEffect(() => {
    setFlop({
      actionType: ActionType.normalize,
      activePlayerIndexes: new Set(
        preflop.actions.map(({ playerIndex }) => playerIndex)
      ),
      playerStackSizes,
    });
  }, [preflop.activePlayerLength]);

  React.useEffect(() => {
    setTurn({
      actionType: ActionType.normalize,
      activePlayerIndexes: new Set(
        flop.actions.map(({ playerIndex }) => playerIndex)
      ),
      playerStackSizes,
    });
  }, [flop.activePlayerLength]);

  React.useEffect(() => {
    setRiver({
      actionType: ActionType.normalize,
      activePlayerIndexes: new Set(
        turn.actions.map(({ playerIndex }) => playerIndex)
      ),
      playerStackSizes,
    });
  }, [turn.activePlayerLength]);

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
