import {
  GameStreetAction,
  GameStreetActionType,
} from "../../models/GameSituation";
import getActivePlayerIndexes from "./getActivePlayerIndexes";
import getNextActionIndex from "./getNextActionIndex";
import getNextExpectedActionIndex from "./getNextExpectedActionIndex";
import isAffordable from "./isAffordable";
import hasBetOrRaiseAfter from "./hasBetOrRaiseAfter";
import { ActionType, Street } from "./playerActionReducer";

export default function updateGameStreetAction(
  actionType: ActionType,
  gameStreetActions: GameStreetAction[],
  playerStackSizes: number[],
  street: Street,
  index: number,
  gameStreetAction?: GameStreetAction
): GameStreetAction[] {
  switch (actionType) {
    case ActionType.new:
      throw new Error("actionType must not be new by updateGameStreetAction");

    case ActionType.add: {
      if (gameStreetAction === undefined)
        throw new Error(
          "gameStreetAction must be passed when action type is add"
        );

      if (index < 0 || gameStreetActions.length <= index)
        throw new Error(
          "index must be more than or equal to 0 and less than or equal the street length"
        );

      if (index === street.length) {
        gameStreetActions.push(gameStreetAction);
      } else if (index < street.length) {
        gameStreetActions.splice(index, 0, gameStreetAction);
      }

      return Array.from(gameStreetActions);
    }

    case ActionType.delete: {
      if (index === undefined)
        throw new Error("index must be passed when ActionType is add");

      if (gameStreetActions.length < index)
        throw new Error(
          "index must be more than or equal to 0 and less than the street length"
        );

      const playerIndex = gameStreetActions[index].playerIndex;

      gameStreetActions.splice(index, 1);

      const nextDeletePlayerActionIndex = getNextActionIndex(
        gameStreetActions,
        index,
        playerIndex
      );

      if (0 <= nextDeletePlayerActionIndex) {
        return Array.from(
          updateGameStreetAction(
            ActionType.delete,
            gameStreetActions,
            playerStackSizes,
            street,
            nextDeletePlayerActionIndex
          )
        );
      }

      return Array.from(gameStreetActions);
    }

    case ActionType.update: {
      if (gameStreetAction === undefined)
        throw new Error(
          "gameStreetAction must be passed when ActionType is update"
        );

      if (index < 0 || gameStreetActions.length < index)
        throw new Error(
          "index must be more than or equal to 0 and less than the street length"
        );

      const { type: prevType, betSize: prefBetSize } = gameStreetActions[index];
      const { type, playerIndex, betSize } = gameStreetAction;

      gameStreetActions[index] = gameStreetAction;

      if (prevType === GameStreetActionType.fold) {
        if (type === GameStreetActionType.check) {
          if (hasBetOrRaiseAfter(gameStreetActions, index)) {
            return Array.from(
              updateGameStreetAction(
                ActionType.add,
                gameStreetActions,
                playerStackSizes,
                street,
                getNextExpectedActionIndex(gameStreetActions, index),
                {
                  type: GameStreetActionType.fold,
                  playerIndex,
                  betSize: 0,
                }
              )
            );
          }
        }

        if (type === GameStreetActionType.call) {
          if (isAffordable(playerStackSizes, playerIndex, betSize)) {
            if (hasBetOrRaiseAfter(gameStreetActions, index)) {
              return Array.from(
                updateGameStreetAction(
                  ActionType.add,
                  gameStreetActions,
                  playerStackSizes,
                  street,
                  getNextExpectedActionIndex(gameStreetActions, index),
                  {
                    type: GameStreetActionType.fold,
                    playerIndex,
                    betSize: 0,
                  }
                )
              );
            }
          } else {
            return Array.from(
              updateGameStreetAction(
                ActionType.delete,
                gameStreetActions,
                playerStackSizes,
                street,
                getNextActionIndex(gameStreetActions, index, playerIndex)
              )
            );
          }
        }

        if (
          type === GameStreetActionType.bet ||
          type === GameStreetActionType.raise
        ) {
          if (isAffordable(playerStackSizes, playerIndex, betSize)) {
            if (hasBetOrRaiseAfter(gameStreetActions, index)) {
              return Array.from(
                updateGameStreetAction(
                  ActionType.add,
                  gameStreetActions,
                  playerStackSizes,
                  street,
                  getNextExpectedActionIndex(gameStreetActions, index),
                  {
                    type: GameStreetActionType.fold,
                    playerIndex,
                    betSize: 0,
                  }
                )
              );
            } else {
              const activePlayerIndexes = getActivePlayerIndexes(
                gameStreetActions,
                index
              );
              for (let i = 0; i < activePlayerIndexes.length; i++) {
                if (gameStreetActions[index + 1 + i] === undefined) {
                  gameStreetActions = updateGameStreetAction(
                    ActionType.add,
                    gameStreetActions,
                    playerStackSizes,
                    street,
                    index + i + 1,
                    {
                      type: GameStreetActionType.fold,
                      playerIndex: activePlayerIndexes[i],
                      betSize: 0,
                    }
                  );
                }
              }
              return Array.from(gameStreetActions);
            }
          } else {
            return Array.from(
              updateGameStreetAction(
                ActionType.delete,
                gameStreetActions,
                playerStackSizes,
                street,
                getNextActionIndex(gameStreetActions, index, playerIndex)
              )
            );
          }
        }
      }

      if (prevType === GameStreetActionType.check) {
        if (type === GameStreetActionType.fold) {
          return Array.from(
            updateGameStreetAction(
              ActionType.delete,
              gameStreetActions,
              playerStackSizes,
              street,
              getNextActionIndex(gameStreetActions, index, playerIndex)
            )
          );
        }

        if (type === GameStreetActionType.bet) {
          if (isAffordable(playerStackSizes, playerIndex, betSize)) {
            if (!hasBetOrRaiseAfter(gameStreetActions, index)) {
              const activePlayerIndexes = getActivePlayerIndexes(
                gameStreetActions,
                index
              );
              // TODO 減っていくんだからプラスしていいの？
              for (let i = 0; i < activePlayerIndexes.length; i++) {
                if (gameStreetActions[index + 1 + i] === undefined) {
                  gameStreetActions = updateGameStreetAction(
                    ActionType.add,
                    gameStreetActions,
                    playerStackSizes,
                    street,
                    index + i + 1,
                    {
                      type: GameStreetActionType.fold,
                      playerIndex: activePlayerIndexes[i],
                      betSize: 0,
                    }
                  );
                }
              }
              return Array.from(gameStreetActions);
            }
          } else {
            return Array.from(
              updateGameStreetAction(
                ActionType.delete,
                gameStreetActions,
                playerStackSizes,
                street,
                getNextActionIndex(gameStreetActions, index, playerIndex)
              )
            );
          }
        }
      }

      if (prevType === GameStreetActionType.call) {
        if (type === GameStreetActionType.fold) {
          return Array.from(
            updateGameStreetAction(
              ActionType.delete,
              gameStreetActions,
              playerStackSizes,
              street,
              getNextActionIndex(gameStreetActions, index, playerIndex)
            )
          );
        }

        if (type === GameStreetActionType.raise) {
          if (isAffordable(playerStackSizes, playerIndex, betSize)) {
            const activePlayerIndexes = getActivePlayerIndexes(
              gameStreetActions,
              index
            );
            // TODO 減っていくんだからプラスしていいの？
            for (let i = 0; i < activePlayerIndexes.length; i++) {
              if (gameStreetActions[index + 1 + i] === undefined) {
                gameStreetActions = updateGameStreetAction(
                  ActionType.add,
                  gameStreetActions,
                  playerStackSizes,
                  street,
                  index + i + 1,
                  {
                    type: GameStreetActionType.fold,
                    playerIndex: activePlayerIndexes[i],
                    betSize: 0,
                  }
                );
              }
            }
            return gameStreetActions;
          } else {
            return Array.from(
              updateGameStreetAction(
                ActionType.delete,
                gameStreetActions,
                playerStackSizes,
                street,
                getNextActionIndex(gameStreetActions, index, playerIndex)
              )
            );
          }
        }
      }

      if (
        prevType === GameStreetActionType.bet ||
        prevType === GameStreetActionType.raise
      ) {
        if (type === GameStreetActionType.fold) {
          return Array.from(
            updateGameStreetAction(
              ActionType.delete,
              gameStreetActions,
              playerStackSizes,
              street,
              getNextActionIndex(gameStreetActions, index, playerIndex)
            )
          );
        }

        if (
          type === GameStreetActionType.check ||
          type === GameStreetActionType.call
        ) {
          if (!hasBetOrRaiseAfter(gameStreetActions, index)) {
            return Array.from(gameStreetActions.slice(0, index));
          }
        }

        if (
          type === GameStreetActionType.bet ||
          type === GameStreetActionType.raise
        ) {
          if (betSize < prefBetSize) {
            if (
              isAffordable(playerStackSizes, playerIndex, prefBetSize - betSize)
            ) {
              return Array.from(
                updateGameStreetAction(
                  ActionType.delete,
                  gameStreetActions,
                  playerStackSizes,
                  street,
                  getNextActionIndex(gameStreetActions, index, playerIndex)
                )
              );
            }
          }
        }
      }

      return Array.from(gameStreetActions);
    }
  }
}
