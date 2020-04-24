import { GameStreetActionType } from "../../models/GameSituation";
import findNextActionIndex from "./findNextActionIndex";

describe("findNextActionIndex(actions: GameStreetAction[], index: number, playerIndex: number)", () => {
  it("returns index properly", () => {
    expect(
      findNextActionIndex({
        playerIndex: 0,
        actions: [
          { type: GameStreetActionType.bet, playerIndex: 0, betSize: 2 },
          { type: GameStreetActionType.raise, playerIndex: 1, betSize: 3 },
          { type: GameStreetActionType.call, playerIndex: 2, betSize: 3 },
          { type: GameStreetActionType.call, playerIndex: 3, betSize: 3 },
          { type: GameStreetActionType.raise, playerIndex: 4, betSize: 6 },
          { type: GameStreetActionType.call, playerIndex: 0, betSize: 6 },
          { type: GameStreetActionType.call, playerIndex: 1, betSize: 6 },
          { type: GameStreetActionType.call, playerIndex: 3, betSize: 6 },
        ],
        start: 1,
      })
    ).toBe(5);
  });

  it("returns index that is equal to actions.length -1 when there is ame player's index at end of the actions", () => {
    const actions = [
      { type: GameStreetActionType.bet, playerIndex: 0, betSize: 2 },
      { type: GameStreetActionType.raise, playerIndex: 1, betSize: 3 },
      { type: GameStreetActionType.call, playerIndex: 2, betSize: 3 },
      { type: GameStreetActionType.call, playerIndex: 3, betSize: 3 },
      { type: GameStreetActionType.raise, playerIndex: 4, betSize: 6 },
      { type: GameStreetActionType.call, playerIndex: 0, betSize: 6 },
      { type: GameStreetActionType.call, playerIndex: 1, betSize: 6 },
      { type: GameStreetActionType.call, playerIndex: 3, betSize: 6 },
    ];

    expect(findNextActionIndex({ playerIndex: 3, actions, start: 4 })).toBe(
      actions.length - 1
    );
  });

  it("returns -1 when there is no same player's index in the actions", () => {
    expect(
      findNextActionIndex({
        playerIndex: 4,
        actions: [
          { type: GameStreetActionType.bet, playerIndex: 0, betSize: 2 },
          { type: GameStreetActionType.raise, playerIndex: 1, betSize: 3 },
          { type: GameStreetActionType.call, playerIndex: 2, betSize: 3 },
          { type: GameStreetActionType.call, playerIndex: 3, betSize: 3 },
          { type: GameStreetActionType.raise, playerIndex: 4, betSize: 6 },
          { type: GameStreetActionType.call, playerIndex: 0, betSize: 6 },
          { type: GameStreetActionType.call, playerIndex: 1, betSize: 6 },
          { type: GameStreetActionType.call, playerIndex: 3, betSize: 6 },
        ],
        start: 5,
      })
    ).toBe(-1);
  });
});
