import getCyclicNextPlayerIndexOf from "./getCyclicNextPlayerIndexOf";

describe("getCyclicNextPlayerIndexOf()", () => {
  it("returns next player index when current player is min number in the Set", () => {
    expect(getCyclicNextPlayerIndexOf(0, new Set([0, 1, 2, 3, 4]))).toBe(1);
  });
  it("returns next player index when current player is middle number in the Set", () => {
    expect(getCyclicNextPlayerIndexOf(2, new Set([0, 1, 2, 3, 4]))).toBe(3);
  });
  it("returns next player index when current player is max number in the Set", () => {
    expect(getCyclicNextPlayerIndexOf(4, new Set([0, 1, 2, 3, 4]))).toBe(0);
  });
  it("returns next player index when current player is not in the Set", () => {
    expect(getCyclicNextPlayerIndexOf(1, new Set([0, 2, 3, 4]))).toBe(2);
  });
});
