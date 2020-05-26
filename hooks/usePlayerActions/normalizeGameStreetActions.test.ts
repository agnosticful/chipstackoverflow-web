import { HandActionType } from "@@/models/Hand";
import normalizeGameStreetActions from "./normalizeGameStreetActions";

describe("normalizeGameStreetActions()", () => {
  it("returns the given actions as long as they need no adjustment", () => {
    expect(
      normalizeGameStreetActions({
        currentActions: [
          { type: HandActionType.fold, playerIndex: 0, betSize: 0 },
          { type: HandActionType.fold, playerIndex: 1, betSize: 0 },
          { type: HandActionType.fold, playerIndex: 2, betSize: 0 },
          { type: HandActionType.fold, playerIndex: 3, betSize: 0 },
        ],
        activePlayerIndexes: new Set([0, 1, 2, 3]),
        isPreflop: false,
      })
    ).toEqual([
      { type: HandActionType.fold, playerIndex: 0, betSize: 0 },
      { type: HandActionType.fold, playerIndex: 1, betSize: 0 },
      { type: HandActionType.fold, playerIndex: 2, betSize: 0 },
      { type: HandActionType.fold, playerIndex: 3, betSize: 0 },
    ]);
  });

  it("returns actions properly when action type is changed to fold and need to delete the player's actions", () => {
    expect(
      normalizeGameStreetActions({
        currentActions: [
          { type: HandActionType.bet, playerIndex: 0, betSize: 1 },
          { type: HandActionType.call, playerIndex: 1, betSize: 1 },
          { type: HandActionType.fold, playerIndex: 2, betSize: 0 },
          { type: HandActionType.raise, playerIndex: 3, betSize: 3 },
          { type: HandActionType.call, playerIndex: 0, betSize: 3 },
          { type: HandActionType.call, playerIndex: 1, betSize: 3 },
          { type: HandActionType.call, playerIndex: 2, betSize: 3 },
        ],
        activePlayerIndexes: new Set([0, 1, 2, 3]),
        isPreflop: false,
      })
    ).toEqual([
      { type: HandActionType.bet, playerIndex: 0, betSize: 1 },
      { type: HandActionType.call, playerIndex: 1, betSize: 1 },
      { type: HandActionType.fold, playerIndex: 2, betSize: 0 },
      { type: HandActionType.raise, playerIndex: 3, betSize: 3 },
      { type: HandActionType.call, playerIndex: 0, betSize: 3 },
      { type: HandActionType.call, playerIndex: 1, betSize: 3 },
    ]);
  });

  it("returns actions properly when action type is changed from fold and need to add a new action", () => {
    expect(
      normalizeGameStreetActions({
        currentActions: [
          { type: HandActionType.bet, playerIndex: 0, betSize: 1 },
          { type: HandActionType.call, playerIndex: 1, betSize: 1 },
          { type: HandActionType.call, playerIndex: 2, betSize: 0 },
          { type: HandActionType.raise, playerIndex: 3, betSize: 3 },
          { type: HandActionType.call, playerIndex: 0, betSize: 3 },
          { type: HandActionType.call, playerIndex: 1, betSize: 3 },
        ],
        activePlayerIndexes: new Set([0, 1, 2, 3]),
        isPreflop: false,
      })
    ).toEqual([
      { type: HandActionType.bet, playerIndex: 0, betSize: 1 },
      { type: HandActionType.call, playerIndex: 1, betSize: 1 },
      { type: HandActionType.call, playerIndex: 2, betSize: 0 },
      { type: HandActionType.raise, playerIndex: 3, betSize: 3 },
      { type: HandActionType.call, playerIndex: 0, betSize: 3 },
      { type: HandActionType.call, playerIndex: 1, betSize: 3 },
      { type: HandActionType.fold, playerIndex: 2, betSize: 0 },
    ]);
  });
});
