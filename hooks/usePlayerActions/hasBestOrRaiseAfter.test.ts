import { GameStreetActionType } from "../../models/GameSituation";
import hasBestOrRaiseAfter from "./hasBestOrRaiseAfter";

describe("hasBestOrRaiseAfter(actions: GameStreetAction[], index: number)", () => {
  it("returns true when bet is on following actions", () => {
    expect(
      hasBestOrRaiseAfter(
        [
          { type: GameStreetActionType.check, playerIndex: 0, betSize: 0 },
          { type: GameStreetActionType.check, playerIndex: 1, betSize: 0 },
          { type: GameStreetActionType.check, playerIndex: 2, betSize: 0 },
          { type: GameStreetActionType.bet, playerIndex: 3, betSize: 3 },
          { type: GameStreetActionType.bet, playerIndex: 0, betSize: 3 },
          { type: GameStreetActionType.call, playerIndex: 1, betSize: 3 },
          { type: GameStreetActionType.call, playerIndex: 2, betSize: 3 },
          { type: GameStreetActionType.call, playerIndex: 3, betSize: 3 },
        ],
        3
      )
    ).toBe(true);
  });

  it("returns true when raise is on following actions", () => {
    expect(
      hasBestOrRaiseAfter(
        [
          { type: GameStreetActionType.bet, playerIndex: 0, betSize: 1 },
          { type: GameStreetActionType.call, playerIndex: 1, betSize: 1 },
          { type: GameStreetActionType.call, playerIndex: 2, betSize: 1 },
          { type: GameStreetActionType.raise, playerIndex: 3, betSize: 3 },
          { type: GameStreetActionType.call, playerIndex: 0, betSize: 3 },
          { type: GameStreetActionType.raise, playerIndex: 1, betSize: 6 },
        ],
        3
      )
    ).toBe(true);
  });

  it("returns false when bet or raise isn't on following actions", () => {
    expect(
      hasBestOrRaiseAfter(
        [
          { type: GameStreetActionType.bet, playerIndex: 0, betSize: 1 },
          { type: GameStreetActionType.call, playerIndex: 1, betSize: 1 },
          { type: GameStreetActionType.call, playerIndex: 2, betSize: 1 },
          { type: GameStreetActionType.raise, playerIndex: 3, betSize: 3 },
          { type: GameStreetActionType.fold, playerIndex: 0, betSize: 0 },
          { type: GameStreetActionType.fold, playerIndex: 1, betSize: 0 },
          { type: GameStreetActionType.fold, playerIndex: 2, betSize: 0 },
        ],
        3
      )
    ).toBe(false);
  });
});
