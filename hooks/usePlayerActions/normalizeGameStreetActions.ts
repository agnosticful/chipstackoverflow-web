import {
  GameStreetAction,
  GameStreetActionType,
} from "@@/models/GameSituation";
import getCyclicNextPlayerIndexOf from "./getCyclicNextPlayerIndexOf";

export default function normalizeGameStreetActions({
  actions,
  activePlayerIndexes,
  isPreflop,
}: {
  actions: GameStreetAction[];
  activePlayerIndexes: Set<number>;
  isPreflop: boolean;
}): GameStreetAction[] {
  const nextActions = [...actions];
  let index = 0;
  let playerIndexToAct = isPreflop ? 2 : Math.min(...activePlayerIndexes);
  let nonBetStreak = 0;

  while (nonBetStreak < activePlayerIndexes.size - 1) {
    // Add action when the action which is supposed to be there doesn't exist.
    if (
      actions[index] === undefined ||
      actions[index].playerIndex !== playerIndexToAct
    ) {
      nextActions.splice(index, 1, {
        type: GameStreetActionType.fold,
        playerIndex: playerIndexToAct,
        betSize: 0,
      });
    }

    const action = nextActions[index];

    if (action.type === GameStreetActionType.fold) {
      activePlayerIndexes.delete(action.playerIndex);

      // Delete the player's all actions after the fold
      for (let i = index + 1; i < nextActions.length; i++) {
        if (nextActions[i].playerIndex === action.playerIndex) {
          nextActions.splice(i, 1);

          i--;
        }
      }
    }

    if (
      [GameStreetActionType.bet, GameStreetActionType.raise].includes(
        action.type
      )
    ) {
      nonBetStreak = 0;
    } else {
      nonBetStreak += 1;
    }

    playerIndexToAct = getCyclicNextPlayerIndexOf(
      playerIndexToAct,
      activePlayerIndexes
    );

    index++;
  }

  return nextActions;
}
