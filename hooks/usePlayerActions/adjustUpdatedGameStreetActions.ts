import {
  GameStreetAction,
  GameStreetActionType,
} from "../../models/GameSituation";

export default function adjustUpdatedGameStreetActions({
  actions,
  activePlayers,
}: {
  actions: GameStreetAction[];
  activePlayers: number[];
}): GameStreetAction[] {
  const newActions = [...actions];
  let index = 0;
  let lastIndex = activePlayers.length - 1;

  while (index <= lastIndex) {
    const expectPlayerIndex = activePlayers.shift();

    if (!actions[index] || activePlayers[0] === actions[index].playerIndex) {
      newActions.splice(index, 1, {
        type: GameStreetActionType.fold,
        playerIndex: expectPlayerIndex!,
        betSize: 0,
      });

      index++;
      continue;
    }

    if (expectPlayerIndex !== actions[index].playerIndex) {
      if (expectPlayerIndex === actions[index + 1].playerIndex) {
        newActions.splice(index, 1);
      }
    }

    if (actions[index].type !== GameStreetActionType.fold) {
      activePlayers.push(actions[index].playerIndex);
    }

    if (
      actions[index].type === GameStreetActionType.bet ||
      actions[index].type === GameStreetActionType.raise
    ) {
      lastIndex = index + activePlayers.length - 1;
    }

    index++;
  }

  return newActions.slice(0, lastIndex + 1);
}
