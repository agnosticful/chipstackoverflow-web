import { GameStreetActionType } from "../../models/GameSituation";
import getNextExpectedActionIndex from "./getNextExpectedActionIndex";

describe("getNextExpectedActionIndex(gameStreetActions: GameStreetAction[], currentIndex: number)", () => {
  it("returns nextExpectedActionIndex of the player", () => {
    expect(
      getNextExpectedActionIndex(
        [
          { type: GameStreetActionType.bet, playerIndex: 0, betSize: 2 },
          { type: GameStreetActionType.raise, playerIndex: 1, betSize: 3 },
          { type: GameStreetActionType.call, playerIndex: 2, betSize: 3 },
          { type: GameStreetActionType.call, playerIndex: 3, betSize: 3 },
          { type: GameStreetActionType.raise, playerIndex: 4, betSize: 6 },
          { type: GameStreetActionType.call, playerIndex: 0, betSize: 6 },
          { type: GameStreetActionType.call, playerIndex: 1, betSize: 6 },
          { type: GameStreetActionType.call, playerIndex: 3, betSize: 6 },
        ],
        2
      )
    ).toBe(7);
  });

  it("throws Error if nextExpectedActionIndex is more than length of actions", () => {
    expect(() => {
      getNextExpectedActionIndex(
        [
          { type: GameStreetActionType.bet, playerIndex: 0, betSize: 2 },
          { type: GameStreetActionType.raise, playerIndex: 1, betSize: 3 },
          { type: GameStreetActionType.call, playerIndex: 2, betSize: 3 },
          { type: GameStreetActionType.call, playerIndex: 3, betSize: 3 },
          { type: GameStreetActionType.raise, playerIndex: 4, betSize: 6 },
          { type: GameStreetActionType.call, playerIndex: 0, betSize: 6 },
          { type: GameStreetActionType.call, playerIndex: 1, betSize: 6 },
          { type: GameStreetActionType.call, playerIndex: 2, betSize: 6 },
          { type: GameStreetActionType.call, playerIndex: 3, betSize: 6 },
        ],
        5
      );
    }).toThrowError(
      new Error(
        "nextExpectedActionIndex must be less than or equal to length of gameStreetActions"
      )
    );
  });
});
