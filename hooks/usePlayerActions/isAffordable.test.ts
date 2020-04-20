import isAffordable from "./isAffordable";

describe("isAffordable(playerStackSizes: number[], playerIndex: number, betSize: number)", () => {
  it("returns true when betSize is affordable", () => {
    expect(isAffordable([100, 0], 0, 20)).toBe(true);
  });

  it("returns true when betSize is same size of the player's stack size", () => {
    expect(isAffordable([20, 0], 0, 20)).toBe(true);
  });

  it("returns false when betSize isn't affordable", () => {
    expect(isAffordable([10, 0], 0, 20)).toBe(false);
  });
});
