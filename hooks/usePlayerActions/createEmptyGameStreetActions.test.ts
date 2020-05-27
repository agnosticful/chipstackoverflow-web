import { HandActionType, HandStreet } from "@@/models/Hand";
import createEmptyGameStreetActions from "./createEmptyGameStreetActions";

describe("createEmptyGameStreetActions(street: Street, playerLength?: number)", () => {
  for (let i = 2; i < 10; i++) {
    it(`returns { type: HandActionType.fold, playerIndex: (0...${
      i - 1
    }), betSize: 0} * ${i} when street is preflop`, () => {
      expect(
        createEmptyGameStreetActions({
          street: HandStreet.preflop,
          playerLength: i,
        })
      ).toEqual(
        Array.from({ length: i }, (_, j) => ({
          type: HandActionType.fold,
          playerIndex: j,
          betSize: 0,
        }))
      );
    });
  }

  it("returns [] when street is flop", () => {
    expect(
      createEmptyGameStreetActions({ street: HandStreet.flop, playerLength: 2 })
    ).toEqual([]);
  });

  it("returns [] when street is turn", () => {
    expect(
      createEmptyGameStreetActions({ street: HandStreet.turn, playerLength: 2 })
    ).toEqual([]);
  });

  it("returns [] when street is river", () => {
    expect(
      createEmptyGameStreetActions({
        street: HandStreet.river,
        playerLength: 2,
      })
    ).toEqual([]);
  });
});
