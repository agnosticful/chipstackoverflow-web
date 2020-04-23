import { Street } from "./playerActionReducer";
import deleteGameStreetAction from "./deleteGameStreetAction";
import { GameStreetActionType } from "../../models/GameSituation";
import findNextActionIndex from "./findNextActionIndex";

jest.mock("./findNextActionIndex", () => jest.fn(() => {}));

describe("deleteGameStreetAction( actions: GameStreetAction[], street: Street, index: number ): GameStreetAction[]", () => {
  it("throws error when index is equal to length of gameStreetActions", () => {
    expect(() => {
      deleteGameStreetAction(
        [
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
        Street.flop,
        2
      );
    }).toThrowError(new Error("index must be less than length of the street"));
  });

  it("returns gameStreetActions that is deleted index of the gameStreetAction", () => {
    const mockFindNextActionIndex = findNextActionIndex as jest.Mock<number>;
    mockFindNextActionIndex.mockImplementation(() => -1);

    const actions = deleteGameStreetAction(
      [
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
      Street.flop,
      1
    );

    expect(actions).toEqual([
      {
        type: GameStreetActionType.fold,
        playerIndex: 0,
        betSize: 0,
      },
    ]);
  });

  it("returns gameStreetActions that is deleted all same playerIndex in the gameStreetAction", () => {
    const mockFindNextActionIndex = findNextActionIndex as jest.Mock<number>;
    mockFindNextActionIndex
      .mockImplementationOnce(() => 5)
      .mockImplementation(() => -1);

    const actions = deleteGameStreetAction(
      [
        {
          type: GameStreetActionType.fold,
          playerIndex: 0,
          betSize: 0,
        },
        {
          type: GameStreetActionType.check,
          playerIndex: 1,
          betSize: 0,
        },
        {
          type: GameStreetActionType.bet,
          playerIndex: 2,
          betSize: 1,
        },
        {
          type: GameStreetActionType.raise,
          playerIndex: 0,
          betSize: 3,
        },
        {
          type: GameStreetActionType.call,
          playerIndex: 1,
          betSize: 3,
        },
        {
          type: GameStreetActionType.raise,
          playerIndex: 2,
          betSize: 5,
        },
        {
          type: GameStreetActionType.call,
          playerIndex: 0,
          betSize: 5,
        },
        {
          type: GameStreetActionType.call,
          playerIndex: 1,
          betSize: 5,
        },
      ],
      Street.flop,
      3
    );

    expect(actions).toEqual([
      {
        type: GameStreetActionType.fold,
        playerIndex: 0,
        betSize: 0,
      },
      {
        type: GameStreetActionType.check,
        playerIndex: 1,
        betSize: 0,
      },
      {
        type: GameStreetActionType.bet,
        playerIndex: 2,
        betSize: 1,
      },
      {
        type: GameStreetActionType.call,
        playerIndex: 1,
        betSize: 3,
      },
      {
        type: GameStreetActionType.raise,
        playerIndex: 2,
        betSize: 5,
      },
      {
        type: GameStreetActionType.call,
        playerIndex: 1,
        betSize: 5,
      },
    ]);
  });
});
