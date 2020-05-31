import { HandAction, HandActionType } from "@@/models/Hand";

export enum PlayerActionValidation {
  invalidRaiseSize,
  bedSizeExceededStackSize,
}

export default function validatePlayerActions({
  playerActions,
  playerStackSizes,
}: {
  playerActions: HandAction[];
  playerStackSizes: number[];
}): Set<PlayerActionValidation>[] {
  const playerActionValidations = Array.from(
    { length: playerActions.length },
    () => new Set<PlayerActionValidation>()
  );

  let tableMaxBetSize = 0;
  let minBetSizeDiff = 0;

  for (const [
    index,
    { type, betSize, playerIndex },
  ] of playerActions.entries()) {
    if (![HandActionType.bet, HandActionType.raise].includes(type)) {
      continue;
    }

    if (betSize < tableMaxBetSize + minBetSizeDiff) {
      playerActionValidations[index].add(
        PlayerActionValidation.invalidRaiseSize
      );
    }

    if (playerStackSizes[playerIndex] < betSize) {
      playerActionValidations[index].add(
        PlayerActionValidation.bedSizeExceededStackSize
      );
    }

    minBetSizeDiff = betSize - tableMaxBetSize;
    tableMaxBetSize = betSize;
  }

  return playerActionValidations;
}
