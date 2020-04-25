import { GameStreetAction } from "../../models/GameSituation";

export default function addGameStreetActionAt({
  actions,
  index,
  action,
}: {
  actions: GameStreetAction[];
  index: number;
  action: GameStreetAction;
}): GameStreetAction[] {
  if (index < 0 || actions.length < index)
    throw new Error(
      "index must be more than or equal to 0 and less than or equal to the length of the street"
    );

  const nextActions = [...actions];

  nextActions.splice(index, 0, action);

  return nextActions;
}
