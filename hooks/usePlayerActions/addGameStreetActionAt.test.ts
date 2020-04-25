import { GameStreetActionType } from "../../models/GameSituation";
import addGameStreetActionAt from "./addGameStreetActionAt";

describe("addGameStreetActionAt( actions: GameStreetAction[], index: number, action: GameStreetAction): GameStreetAction[]", () => {
  it("throws an error when the index is less than 0", () => {
    expect(() => {
      addGameStreetActionAt({
        actions: [],
        index: -1,
        action: {
          type: GameStreetActionType.fold,
          playerIndex: 0,
          betSize: 0,
        },
      });
    }).toThrowError(
      new Error(
        "index must be more than or equal to 0 and less than or equal to the length of the street"
      )
    );
  });

  it("throws an error when the index is less the length of gameStreetActions", () => {
    expect(() => {
      addGameStreetActionAt({
        actions: [],
        index: 2,
        action: {
          type: GameStreetActionType.fold,
          playerIndex: 0,
          betSize: 0,
        },
      });
    }).toThrowError(
      new Error(
        "index must be more than or equal to 0 and less than or equal to the length of the street"
      )
    );
  });

  it("returns gameStreetActions that gameStreetAction is end of the gameStreetActions", () => {
    expect(
      addGameStreetActionAt({
        actions: [],
        index: 0,
        action: {
          type: GameStreetActionType.fold,
          playerIndex: 0,
          betSize: 0,
        },
      })
    ).toEqual([
      {
        type: GameStreetActionType.fold,
        playerIndex: 0,
        betSize: 0,
      },
    ]);
  });

  it("returns gameStreetActions that gameStreetAction is middle of the gameStreetActions", () => {
    expect(
      addGameStreetActionAt({
        actions: [
          {
            type: GameStreetActionType.fold,
            playerIndex: 0,
            betSize: 0,
          },
          {
            type: GameStreetActionType.fold,
            playerIndex: 2,
            betSize: 0,
          },
        ],
        index: 1,
        action: {
          type: GameStreetActionType.fold,
          playerIndex: 1,
          betSize: 0,
        },
      })
    ).toEqual([
      {
        type: GameStreetActionType.fold,
        playerIndex: 0,
        betSize: 0,
      },
      {
        type: GameStreetActionType.fold,
        playerIndex: 1,
        betSize: 0,
      },
      {
        type: GameStreetActionType.fold,
        playerIndex: 2,
        betSize: 0,
      },
    ]);
  });
});
