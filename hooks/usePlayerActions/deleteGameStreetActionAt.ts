import { GameStreetAction } from "../../models/GameSituation";

export default function deleteGameStreetActionAt({
  actions,
  index,
}: {
  actions: GameStreetAction[];
  index: number;
}): GameStreetAction[] {
  if (actions.length <= index)
    throw new Error("index must be less than length of the street");

  const playerIndex = actions[index].playerIndex;
  return [
    ...actions.slice(0, index),
    ...actions
      .slice(index)
      .filter((action) => action.playerIndex !== playerIndex),
  ];
}
