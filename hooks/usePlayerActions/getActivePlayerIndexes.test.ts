import { GameStreetActionType } from "../../models/GameSituation";
import getActivePlayerIndexes from "./getActivePlayerIndexes";

jest.mock("./getActivePlayerIndexSet", () =>
  jest.fn(() => new Set([0, 1, 2, 3]))
);

describe("getActivePlayerIndexes(actions: GameStreetAction[], index: number)", () => {
  it("returns array of one playerIndex when game is done", () => {
    expect(
      getActivePlayerIndexes(
        [
          { type: GameStreetActionType.bet, playerIndex: 0, betSize: 2 },
          { type: GameStreetActionType.fold, playerIndex: 1, betSize: 1 },
          { type: GameStreetActionType.fold, playerIndex: 2, betSize: 0 },
          { type: GameStreetActionType.fold, playerIndex: 3, betSize: 0 },
        ],
        3
      )
    ).toEqual([0]);
  });

  it("returns array of playerIndexes properly when first player fold", () => {
    expect(
      getActivePlayerIndexes(
        [
          { type: GameStreetActionType.fold, playerIndex: 0, betSize: 0 },
          { type: GameStreetActionType.check, playerIndex: 1, betSize: 0 },
          { type: GameStreetActionType.check, playerIndex: 2, betSize: 0 },
          { type: GameStreetActionType.check, playerIndex: 3, betSize: 0 },
        ],
        3
      )
    ).toEqual([1, 2]);
  });

  it("returns array of playerIndexes properly when last player fold", () => {
    expect(
      getActivePlayerIndexes(
        [
          { type: GameStreetActionType.bet, playerIndex: 0, betSize: 2 },
          { type: GameStreetActionType.call, playerIndex: 1, betSize: 2 },
          { type: GameStreetActionType.call, playerIndex: 2, betSize: 2 },
          { type: GameStreetActionType.fold, playerIndex: 3, betSize: 0 },
        ],
        3
      )
    ).toEqual([0, 1, 2]);
  });

  it("returns array of playerIndexes properly when some player fold and one player raise", () => {
    expect(
      getActivePlayerIndexes(
        [
          { type: GameStreetActionType.check, playerIndex: 0, betSize: 0 },
          { type: GameStreetActionType.check, playerIndex: 1, betSize: 0 },
          { type: GameStreetActionType.check, playerIndex: 2, betSize: 0 },
          { type: GameStreetActionType.bet, playerIndex: 3, betSize: 1 },
          { type: GameStreetActionType.fold, playerIndex: 0, betSize: 0 },
          { type: GameStreetActionType.call, playerIndex: 1, betSize: 1 },
          { type: GameStreetActionType.raise, playerIndex: 2, betSize: 3 },
          { type: GameStreetActionType.call, playerIndex: 3, betSize: 3 },
          { type: GameStreetActionType.call, playerIndex: 1, betSize: 3 },
        ],
        6
      )
    ).toEqual([3, 1]);
  });
});
