import { GameStreetAction } from "../../models/GameSituation";

export default function updateGameStreetActionAt({
  actions,
  index,
  action,
}: {
  actions: GameStreetAction[];
  index: number;
  action: GameStreetAction;
}): GameStreetAction[] {
  if (index < 0 || actions.length <= index)
    throw new Error(
      "index must be more than or equal to 0 and less than the street length"
    );

  return [...actions.slice(0, index), action, ...actions.slice(index + 1)];
}
