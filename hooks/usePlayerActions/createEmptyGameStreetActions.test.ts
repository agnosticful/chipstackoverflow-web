import { GameStreetActionType } from "../../models/GameSituation";
import createEmptyGameStreetActions from "./createEmptyGameStreetActions";
import { Street } from "./playerActionReducer";

describe("createEmptyGameStreetActions(street: Street, playerLength?: number)", () => {
  for (let i = 2; i < 10; i++) {
    it(`returns { type: GameStreetActionType.fold, playerIndex: (0...${
      i - 1
    }), betSize: 0} * ${i} when street is preflop`, () => {
      expect(
        createEmptyGameStreetActions({
          street: Street.preflop,
          playerLength: i,
        })
      ).toEqual(
        Array.from({ length: i }, (_, j) => ({
          type: GameStreetActionType.fold,
          playerIndex: j,
          betSize: 0,
        }))
      );
    });
  }

  it("returns [] when street is flop", () => {
    expect(
      createEmptyGameStreetActions({ street: Street.flop, playerLength: 2 })
    ).toEqual([]);
  });

  it("returns [] when street is turn", () => {
    expect(
      createEmptyGameStreetActions({ street: Street.turn, playerLength: 2 })
    ).toEqual([]);
  });

  it("returns [] when street is river", () => {
    expect(
      createEmptyGameStreetActions({ street: Street.river, playerLength: 2 })
    ).toEqual([]);
  });
});
