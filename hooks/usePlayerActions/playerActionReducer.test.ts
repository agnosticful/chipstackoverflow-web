import {
  GameStreetAction,
  GameStreetActionType,
} from "../../models/GameSituation";
import createEmptyGameStreetActions from "./createEmptyGameStreetActions";
import playerActionReducer, { ActionType, Street } from "./playerActionReducer";

jest.mock("./createEmptyGameStreetActions", () => jest.fn(() => {}));

describe("playerActionReducer(gameStreetActions: GameStreetAction[], action: Action): gameStreetActions: GameStreetAction[]", () => {
  describe("when actionType is new", () => {
    it("throws error when street is preflop and playerLength is undefined", () => {
      expect(() => {
        playerActionReducer([], {
          actionType: ActionType.new,
          street: Street.preflop,
        });
      }).toThrowError(
        new Error(
          "playerLength must be passed when createEmptyGameStreetActions"
        )
      );
    });

    it("calls createEmptyGameStreetActions with variables street and playerLength when street is preflop", () => {
      const mockCreateEmptyGameStreetActions =
        createEmptyGameStreetActions as jest.Mock<GameStreetAction[]>;

      playerActionReducer([], {
        actionType: ActionType.new,
        street: Street.preflop,
        playerLength: 2,
      });

      expect(mockCreateEmptyGameStreetActions.mock.calls.length).toBe(1);
      expect(mockCreateEmptyGameStreetActions.mock.calls[0][0]).toBe(
        Street.preflop
      );
      expect(mockCreateEmptyGameStreetActions.mock.calls[0][1]).toBe(2);
    });

    it("returns gameStreetAction properly when street is preflop", () => {
      const mockCreateEmptyGameStreetActions =
        createEmptyGameStreetActions as jest.Mock<GameStreetAction[]>;

      mockCreateEmptyGameStreetActions.mockImplementation(() =>
        Array.from({ length: 2 }, (_, playerIndex) => ({
          type: GameStreetActionType.fold,
          playerIndex,
          betSize: 0,
        }))
      );

      const actions = playerActionReducer([], {
        actionType: ActionType.new,
        street: Street.preflop,
        playerLength: 2,
      });

      expect(actions).toEqual([
        { type: GameStreetActionType.fold, playerIndex: 0, betSize: 0 },
        { type: GameStreetActionType.fold, playerIndex: 1, betSize: 0 },
      ]);
    });

    it("calls createEmptyGameStreetActions with variable street when street is not preflop", () => {
      const mockCreateEmptyGameStreetActions =
        createEmptyGameStreetActions as jest.Mock<GameStreetAction[]>;

      mockCreateEmptyGameStreetActions.mockImplementation(() =>
        Array.from({ length: 2 }, (_, playerIndex) => ({
          type: GameStreetActionType.fold,
          playerIndex,
          betSize: 0,
        }))
      );

      playerActionReducer([], {
        actionType: ActionType.new,
        street: Street.flop,
        playerLength: 2,
      });

      expect(mockCreateEmptyGameStreetActions.mock.calls.length).toBe(3);
      expect(mockCreateEmptyGameStreetActions.mock.calls[2][0]).toBe(
        Street.flop
      );
      expect(mockCreateEmptyGameStreetActions.mock.calls[2][1]).toBe(undefined);
    });

    it("returns [] when street is flop", () => {
      const mockCreateEmptyGameStreetActions =
        createEmptyGameStreetActions as jest.Mock<GameStreetAction[]>;

      mockCreateEmptyGameStreetActions.mockImplementation(() => []);

      expect(
        playerActionReducer([], {
          actionType: ActionType.new,
          street: Street.flop,
          playerLength: 2,
        })
      ).toEqual([]);
    });

    it("returns [] when street is turn", () => {
      const mockCreateEmptyGameStreetActions =
        createEmptyGameStreetActions as jest.Mock<GameStreetAction[]>;

      mockCreateEmptyGameStreetActions.mockImplementation(() => []);

      expect(
        playerActionReducer([], {
          actionType: ActionType.new,
          street: Street.turn,
          playerLength: 2,
        })
      ).toEqual([]);
    });

    it("returns [] when street is river", () => {
      const mockCreateEmptyGameStreetActions =
        createEmptyGameStreetActions as jest.Mock<GameStreetAction[]>;

      mockCreateEmptyGameStreetActions.mockImplementation(() => []);

      expect(
        playerActionReducer([], {
          actionType: ActionType.new,
          street: Street.river,
          playerLength: 2,
        })
      ).toEqual([]);
    });
  });

  describe("when actionType is update", () => {});
});
