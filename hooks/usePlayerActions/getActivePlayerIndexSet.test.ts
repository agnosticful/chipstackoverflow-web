import { GameStreetActionType } from "../../models/GameSituation";
import getActivePlayerIndexSet from "./getActivePlayerIndexSet";

describe("getActivePlayerIndexSet(actions: GameStreetAction[])", () => {
  it("returns set of 0 to 5 when no one is fold before street", () => {
    expect(
      getActivePlayerIndexSet([
        { type: GameStreetActionType.check, playerIndex: 0, betSize: 0 },
        { type: GameStreetActionType.check, playerIndex: 1, betSize: 0 },
        { type: GameStreetActionType.bet, playerIndex: 2, betSize: 2 },
        { type: GameStreetActionType.fold, playerIndex: 3, betSize: 0 },
        { type: GameStreetActionType.fold, playerIndex: 4, betSize: 0 },
        { type: GameStreetActionType.fold, playerIndex: 5, betSize: 0 },
        { type: GameStreetActionType.fold, playerIndex: 0, betSize: 0 },
        { type: GameStreetActionType.fold, playerIndex: 1, betSize: 0 },
      ])
    ).toEqual(new Set([0, 1, 2, 3, 4, 5]));
  });

  it("returns set of 0, 1, 2, 5 when some player fold before street", () => {
    expect(
      getActivePlayerIndexSet([
        { type: GameStreetActionType.check, playerIndex: 0, betSize: 0 },
        { type: GameStreetActionType.check, playerIndex: 1, betSize: 0 },
        { type: GameStreetActionType.bet, playerIndex: 2, betSize: 2 },
        { type: GameStreetActionType.call, playerIndex: 5, betSize: 2 },
        { type: GameStreetActionType.call, playerIndex: 0, betSize: 2 },
        { type: GameStreetActionType.fold, playerIndex: 1, betSize: 0 },
      ])
    ).toEqual(new Set([0, 1, 2, 5]));
  });

  it("returns set of 1, 2, 3, 4, 5 when first player fold before street", () => {
    expect(
      getActivePlayerIndexSet([
        { type: GameStreetActionType.check, playerIndex: 1, betSize: 0 },
        { type: GameStreetActionType.bet, playerIndex: 2, betSize: 2 },
        { type: GameStreetActionType.fold, playerIndex: 3, betSize: 0 },
        { type: GameStreetActionType.fold, playerIndex: 4, betSize: 0 },
        { type: GameStreetActionType.fold, playerIndex: 5, betSize: 0 },
        { type: GameStreetActionType.fold, playerIndex: 1, betSize: 0 },
      ])
    ).toEqual(new Set([1, 2, 3, 4, 5]));
  });

  it("returns set of 0, 1, 2, 3, 4 when first player fold before street", () => {
    expect(
      getActivePlayerIndexSet([
        { type: GameStreetActionType.check, playerIndex: 0, betSize: 0 },
        { type: GameStreetActionType.check, playerIndex: 1, betSize: 0 },
        { type: GameStreetActionType.bet, playerIndex: 2, betSize: 2 },
        { type: GameStreetActionType.fold, playerIndex: 3, betSize: 0 },
        { type: GameStreetActionType.fold, playerIndex: 4, betSize: 0 },
        { type: GameStreetActionType.fold, playerIndex: 0, betSize: 0 },
        { type: GameStreetActionType.fold, playerIndex: 1, betSize: 0 },
      ])
    ).toEqual(new Set([0, 1, 2, 3, 4]));
  });
});
