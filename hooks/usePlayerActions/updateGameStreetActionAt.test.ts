import { HandActionType } from "@@/models/Hand";
import updateGameStreetActionAt from "./updateGameStreetActionAt";

describe("updateGameStreetActionAt({ actions, index, action}: { actions: GameStreetAction[]; index: number; action: GameStreetAction;})", () => {
  it("throws error when index is less than 0", () => {
    expect(() => {
      updateGameStreetActionAt({
        actions: [],
        index: -1,
        action: {
          type: HandActionType.fold,
          playerIndex: 0,
          betSize: 0,
        },
      });
    }).toThrowError(
      new Error(
        "index must be more than or equal to 0 and less than the street length"
      )
    );
  });

  it("throws error when index is more than the length of gameStreetActions", () => {
    expect(() => {
      updateGameStreetActionAt({
        actions: [],
        index: 1,
        action: {
          type: HandActionType.fold,
          playerIndex: 0,
          betSize: 0,
        },
      });
    }).toThrowError(
      new Error(
        "index must be more than or equal to 0 and less than the street length"
      )
    );
  });

  it("returns gameStreetActions that action of index is updated by given action", () => {
    expect(
      updateGameStreetActionAt({
        actions: [
          {
            type: HandActionType.bet,
            playerIndex: 0,
            betSize: 2,
          },
        ],
        index: 0,
        action: {
          type: HandActionType.fold,
          playerIndex: 0,
          betSize: 0,
        },
      })
    ).toEqual([
      {
        type: HandActionType.fold,
        playerIndex: 0,
        betSize: 0,
      },
    ]);
  });
});
