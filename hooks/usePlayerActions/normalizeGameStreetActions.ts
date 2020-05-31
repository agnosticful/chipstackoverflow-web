import { HandAction, HandActionType } from "@@/models/Hand";
import getCyclicNextPlayerIndexOf from "./getCyclicNextPlayerIndexOf";

export default function normalizeHandActions({
  currentActions,
  activePlayerIndexes,
  isPreflop = false,
  playerStackSizes,
}: {
  currentActions: HandAction[];
  activePlayerIndexes: Set<number>;
  isPreflop?: boolean;
  playerStackSizes: number[];
}): HandAction[] {
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
        type: HandActionType.fold,
        playerIndex: playerIndexToAct,
        betSize: 0,
      });
    }

    const action = actions[index];

    // not active when action type is fold or action is all-in
    if (
      action.type === HandActionType.fold ||
      playerStackSizes[action.playerIndex] <= action.betSize
    ) {
      activePlayerIndexes.delete(action.playerIndex);

      // Delete the player's all actions after the fold
      actions = actions.filter(
        (_action, i) => i <= index || _action.playerIndex !== action.playerIndex
      );
    }

    if ([HandActionType.bet, HandActionType.raise].includes(action.type)) {
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
