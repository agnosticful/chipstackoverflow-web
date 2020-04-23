import { GameStreetAction } from "../../models/GameSituation";
import findNextActionIndex from "./findNextActionIndex";
import { Street } from "./playerActionReducer";

export default function deleteGameStreetAction(
  actions: GameStreetAction[],
  street: Street,
  index: number
): GameStreetAction[] {
  if (actions.length <= index)
    throw new Error("index must be less than length of the street");

  const newActions = Array.from(actions);

  newActions.splice(index, 1);

  const nextDeletePlayerActionIndex =
    index < newActions.length
      ? findNextActionIndex({
          playerIndex: newActions[index].playerIndex,
          actions: newActions,
          start: index,
        })
      : -1;

  return 0 <= nextDeletePlayerActionIndex
    ? deleteGameStreetAction(newActions, street, nextDeletePlayerActionIndex)
    : newActions;
}
