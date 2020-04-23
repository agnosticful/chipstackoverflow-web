import {
  GameStreetAction,
  GameStreetActionType,
} from "../../models/GameSituation";
import addGameStreetAction from "./addGameStreetAction";
import deleteGameStreetAction from "./deleteGameStreetAction";
import findNextActionIndex from "./findNextActionIndex";
import getActivePlayerIndexes from "./getActivePlayerIndexes";
import getNextExpectedActionIndex from "./getNextExpectedActionIndex";
import hasBetOrRaiseAfter from "./hasBetOrRaiseAfter";
import { Street } from "./playerActionReducer";

export default function updateGameStreetAction({
  street,
  actions,
  index,
  action,
  playerStackSizes,
}: {
  street: Street;
  actions: GameStreetAction[];
  index: number;
  action: GameStreetAction;
  playerStackSizes: number[];
}): GameStreetAction[] {
  if (index < 0 || actions.length <= index)
    throw new Error(
      "index must be more than or equal to 0 and less than the street length"
    );

  let newActions = Array.from(actions);

  const { type: prevType, betSize: prefBetSize } = newActions[index];
  const { type, playerIndex, betSize } = action;

  newActions[index] = action;

  if (prevType === GameStreetActionType.fold) {
    if (type === GameStreetActionType.check) {
      if (hasBetOrRaiseAfter(newActions, index)) {
        newActions = addGameStreetAction({
          street,
          actions: newActions,
          index: getNextExpectedActionIndex(newActions, index),
          action: {
            type: GameStreetActionType.fold,
            playerIndex,
            betSize: 0,
          },
        });
      }
    }

    if (type === GameStreetActionType.call) {
      if (betSize <= playerStackSizes[playerIndex]) {
        if (hasBetOrRaiseAfter(newActions, index)) {
          newActions = addGameStreetAction({
            street,
            actions: newActions,
            index: getNextExpectedActionIndex(newActions, index),
            action: {
              type: GameStreetActionType.fold,
              playerIndex,
              betSize: 0,
            },
          });
        }
      } else {
        newActions = deleteGameStreetAction({
          street,
          actions: newActions,
          index: findNextActionIndex({
            playerIndex,
            actions: newActions,
            start: index,
          }),
        });
      }
    }

    if (
      type === GameStreetActionType.bet ||
      type === GameStreetActionType.raise
    ) {
      if (betSize <= playerStackSizes[playerIndex]) {
        if (hasBetOrRaiseAfter(newActions, index)) {
          newActions = addGameStreetAction({
            street,
            actions: newActions,
            index: getNextExpectedActionIndex(newActions, index),
            action: {
              type: GameStreetActionType.fold,
              playerIndex,
              betSize: 0,
            },
          });
        } else {
          const activePlayerIndexes = getActivePlayerIndexes(newActions, index);
          for (let i = 0; i < activePlayerIndexes.length; i++) {
            if (newActions[index + 1 + i] === undefined) {
              newActions = addGameStreetAction({
                street,
                actions: newActions,
                index: index + i + 1,
                action: {
                  type: GameStreetActionType.fold,
                  playerIndex: activePlayerIndexes[i],
                  betSize: 0,
                },
              });
            }
          }
        }
      } else {
        newActions = deleteGameStreetAction({
          street,
          actions: newActions,
          index: findNextActionIndex({
            playerIndex,
            actions: newActions,
            start: index,
          }),
        });
      }
    }
  }

  if (prevType === GameStreetActionType.check) {
    if (type === GameStreetActionType.fold) {
      newActions = deleteGameStreetAction({
        street,
        actions: newActions,
        index: findNextActionIndex({
          playerIndex,
          actions: newActions,
          start: index,
        }),
      });
    }

    if (type === GameStreetActionType.bet) {
      if (betSize <= playerStackSizes[playerIndex]) {
        if (!hasBetOrRaiseAfter(newActions, index)) {
          const activePlayerIndexes = getActivePlayerIndexes(newActions, index);
          // TODO 減っていくんだからプラスしていいの？
          for (let i = 0; i < activePlayerIndexes.length; i++) {
            if (newActions[index + 1 + i] === undefined) {
              newActions = addGameStreetAction({
                street,
                actions: newActions,
                index: index + i + 1,
                action: {
                  type: GameStreetActionType.fold,
                  playerIndex: activePlayerIndexes[i],
                  betSize: 0,
                },
              });
            }
          }
        }
      } else {
        newActions = deleteGameStreetAction({
          street,
          actions: newActions,
          index: findNextActionIndex({
            playerIndex,
            actions: newActions,
            start: index,
          }),
        });
      }
    }
  }

  if (prevType === GameStreetActionType.call) {
    if (type === GameStreetActionType.fold) {
      newActions = deleteGameStreetAction({
        street,
        actions: newActions,
        index: findNextActionIndex({
          playerIndex,
          actions: newActions,
          start: index,
        }),
      });
    }

    if (type === GameStreetActionType.raise) {
      if (betSize <= playerStackSizes[playerIndex]) {
        const activePlayerIndexes = getActivePlayerIndexes(newActions, index);
        // TODO 減っていくんだからプラスしていいの？
        for (let i = 0; i < activePlayerIndexes.length; i++) {
          if (newActions[index + 1 + i] === undefined) {
            newActions = addGameStreetAction({
              street,
              actions: newActions,
              index: index + i + 1,
              action: {
                type: GameStreetActionType.fold,
                playerIndex: activePlayerIndexes[i],
                betSize: 0,
              },
            });
          }
        }
      } else {
        newActions = deleteGameStreetAction({
          street,
          actions: newActions,
          index: findNextActionIndex({
            playerIndex,
            actions: newActions,
            start: index,
          }),
        });
      }
    }
  }

  if (
    prevType === GameStreetActionType.bet ||
    prevType === GameStreetActionType.raise
  ) {
    if (type === GameStreetActionType.fold) {
      newActions = deleteGameStreetAction({
        street,
        actions: newActions,
        index: findNextActionIndex({
          playerIndex,
          actions: newActions,
          start: index,
        }),
      });
    }

    if (
      type === GameStreetActionType.check ||
      type === GameStreetActionType.call
    ) {
      if (!hasBetOrRaiseAfter(newActions, index)) {
        newActions = newActions.slice(0, index);
      }
    }

    if (
      type === GameStreetActionType.bet ||
      type === GameStreetActionType.raise
    ) {
      if (betSize < prefBetSize) {
        if (prefBetSize - betSize <= playerStackSizes[playerIndex]) {
          newActions = deleteGameStreetAction({
            street,
            actions: newActions,
            index: findNextActionIndex({
              playerIndex,
              actions: newActions,
              start: index,
            }),
          });
        }
      }
    }
  }

  return newActions;
}
