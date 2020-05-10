import { GameStreetActionType } from "../../models/GameSituation";
import adjustGameStreetActions from "./adjustGameStreetActions";

describe("adjustGameStreetActions({ actions, activePlayers, }: { actions: GameStreetAction[]; activePlayers: number[]; })", () => {
  it("return actions properly when the actions need no adjustment", () => {
    expect(
      adjustGameStreetActions({
        actions: [
          { type: GameStreetActionType.fold, playerIndex: 0, betSize: 0 },
          { type: GameStreetActionType.fold, playerIndex: 1, betSize: 0 },
          { type: GameStreetActionType.fold, playerIndex: 2, betSize: 0 },
          { type: GameStreetActionType.fold, playerIndex: 3, betSize: 0 },
        ],
        activePlayers: [0, 1, 2, 3],
      })
    ).toEqual([
      { type: GameStreetActionType.fold, playerIndex: 0, betSize: 0 },
      { type: GameStreetActionType.fold, playerIndex: 1, betSize: 0 },
      { type: GameStreetActionType.fold, playerIndex: 2, betSize: 0 },
      { type: GameStreetActionType.fold, playerIndex: 3, betSize: 0 },
    ]);
  });

  it("return actions properly when action type is changed to fold and need to delete the player's actions", () => {
    expect(
      adjustGameStreetActions({
        actions: [
          { type: GameStreetActionType.bet, playerIndex: 0, betSize: 1 },
          { type: GameStreetActionType.check, playerIndex: 1, betSize: 1 },
          { type: GameStreetActionType.fold, playerIndex: 2, betSize: 0 },
          { type: GameStreetActionType.raise, playerIndex: 3, betSize: 3 },
          { type: GameStreetActionType.call, playerIndex: 0, betSize: 3 },
          { type: GameStreetActionType.call, playerIndex: 1, betSize: 3 },
          { type: GameStreetActionType.call, playerIndex: 2, betSize: 3 },
        ],
        activePlayers: [0, 1, 2, 3],
      })
    ).toEqual([
      { type: GameStreetActionType.bet, playerIndex: 0, betSize: 1 },
      { type: GameStreetActionType.check, playerIndex: 1, betSize: 1 },
      { type: GameStreetActionType.fold, playerIndex: 2, betSize: 0 },
      { type: GameStreetActionType.raise, playerIndex: 3, betSize: 3 },
      { type: GameStreetActionType.call, playerIndex: 0, betSize: 3 },
      { type: GameStreetActionType.call, playerIndex: 1, betSize: 3 },
    ]);
  });

  it("return actions properly when action type is changed from fold and need to add a new action", () => {
    expect(
      adjustGameStreetActions({
        actions: [
          { type: GameStreetActionType.bet, playerIndex: 0, betSize: 1 },
          { type: GameStreetActionType.check, playerIndex: 1, betSize: 1 },
          { type: GameStreetActionType.call, playerIndex: 2, betSize: 0 },
          { type: GameStreetActionType.raise, playerIndex: 3, betSize: 3 },
          { type: GameStreetActionType.call, playerIndex: 0, betSize: 3 },
          { type: GameStreetActionType.call, playerIndex: 1, betSize: 3 },
        ],
        activePlayers: [0, 1, 2, 3],
      })
    ).toEqual([
      { type: GameStreetActionType.bet, playerIndex: 0, betSize: 1 },
      { type: GameStreetActionType.check, playerIndex: 1, betSize: 1 },
      { type: GameStreetActionType.call, playerIndex: 2, betSize: 0 },
      { type: GameStreetActionType.raise, playerIndex: 3, betSize: 3 },
      { type: GameStreetActionType.call, playerIndex: 0, betSize: 3 },
      { type: GameStreetActionType.call, playerIndex: 1, betSize: 3 },
      { type: GameStreetActionType.fold, playerIndex: 2, betSize: 0 },
    ]);
  });
});
