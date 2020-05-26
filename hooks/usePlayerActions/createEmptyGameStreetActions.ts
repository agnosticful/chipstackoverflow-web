import { HandStreet, HandActionType } from "@@/models/Hand";

export default function createEmptyGameStreetActions({
  street,
  playerLength,
}: {
  street: HandStreet;
  playerLength: number;
}) {
  return street === HandStreet.preflop
    ? Array.from({ length: playerLength }, (_, playerIndex) => ({
        type: HandActionType.fold,
        playerIndex,
        betSize: 0,
      }))
    : [];
}
