import { HandAction, HandActionType } from "@@/models/Hand";

export enum PlayerActionValidation {
  invalidBetSize,
  invalidRaiseSize,
}

export default function validatePlayerActions({
  playerActions,
}: {
  playerActions: HandAction[];
}): Set<PlayerActionValidation>[] {
  const playerActionValidations = Array.from(
    { length: playerActions.length },
    () => new Set<PlayerActionValidation>()
  );

  let tableMaxBetSize = 0;
  let minBetSizeDiff = 0;

  for (const [index, { type, betSize }] of playerActions.entries()) {
    if (betSize < tableMaxBetSize) {
      playerActionValidations[index].add(PlayerActionValidation.invalidBetSize);
    }

    if (![HandActionType.bet, HandActionType.raise].includes(type)) {
      continue;
    }

    if (betSize < tableMaxBetSize + minBetSizeDiff) {
      playerActionValidations[index].add(
        PlayerActionValidation.invalidRaiseSize
      );
    }

    minBetSizeDiff = betSize - tableMaxBetSize;
    tableMaxBetSize = betSize;
  }

  return playerActionValidations;
}
