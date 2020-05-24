import {
  GameStreetAction,
  GameStreetActionType,
} from "@@/models/GameSituation";
import getCyclicNextPlayerIndexOf from "./getCyclicNextPlayerIndexOf";

export default function normalizeGameStreetActions({
  currentActions,
  activePlayerIndexes,
  isPreflop,
}: {
  currentActions: GameStreetAction[];
  activePlayerIndexes: Set<number>;
  isPreflop: boolean;
}): GameStreetAction[] {
  let actions = [...currentActions];
  let index = 0;
  let playerIndexToAct = isPreflop ? 2 : Math.min(...activePlayerIndexes);
  let nonBetStreak = 0;

  while (nonBetStreak < activePlayerIndexes.size - 1) {
    // Add action when the action which is supposed to be there doesn't exist.
    if (
      actions.length <= index ||
      actions[index].playerIndex !== playerIndexToAct
    ) {
      actions.splice(index, 1, {
        type: GameStreetActionType.fold,
        playerIndex: playerIndexToAct,
        betSize: 0,
      });
    }

    const action = actions[index];

    if (action.type === GameStreetActionType.fold) {
      activePlayerIndexes.delete(action.playerIndex);

      // Delete the player's all actions after the fold
      actions = actions.filter(
        (_action, i) => i <= index || _action.playerIndex !== action.playerIndex
      );
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

  return actions;
}
