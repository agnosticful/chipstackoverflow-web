import getPositionByPlayerAndIndex from "./getPositionByPlayerAndIndex";

describe("getPositionByPlayerAndIndex()", () => {
  it("returns SB", () => {
    expect(getPositionByPlayerAndIndex(2, 0)).toBe("SB");
    expect(getPositionByPlayerAndIndex(3, 0)).toBe("SB");
    expect(getPositionByPlayerAndIndex(4, 0)).toBe("SB");
    expect(getPositionByPlayerAndIndex(5, 0)).toBe("SB");
    expect(getPositionByPlayerAndIndex(6, 0)).toBe("SB");
    expect(getPositionByPlayerAndIndex(7, 0)).toBe("SB");
    expect(getPositionByPlayerAndIndex(8, 0)).toBe("SB");
    expect(getPositionByPlayerAndIndex(9, 0)).toBe("SB");
    expect(getPositionByPlayerAndIndex(10, 0)).toBe("SB");
  });

  it("returns BB", () => {
    expect(getPositionByPlayerAndIndex(2, 1)).toBe("BB");
    expect(getPositionByPlayerAndIndex(3, 1)).toBe("BB");
    expect(getPositionByPlayerAndIndex(4, 1)).toBe("BB");
    expect(getPositionByPlayerAndIndex(5, 1)).toBe("BB");
    expect(getPositionByPlayerAndIndex(6, 1)).toBe("BB");
    expect(getPositionByPlayerAndIndex(7, 1)).toBe("BB");
    expect(getPositionByPlayerAndIndex(8, 1)).toBe("BB");
    expect(getPositionByPlayerAndIndex(9, 1)).toBe("BB");
    expect(getPositionByPlayerAndIndex(10, 1)).toBe("BB");
  });

  it("returns UTG", () => {
    expect(getPositionByPlayerAndIndex(3, 2)).toBe("UTG");
    expect(getPositionByPlayerAndIndex(7, 2)).toBe("UTG");
    expect(getPositionByPlayerAndIndex(8, 2)).toBe("UTG");
    expect(getPositionByPlayerAndIndex(9, 2)).toBe("UTG");
    expect(getPositionByPlayerAndIndex(10, 2)).toBe("UTG");
  });

  it("returns MP1", () => {
    expect(getPositionByPlayerAndIndex(4, 2)).toBe("MP1");
    expect(getPositionByPlayerAndIndex(5, 2)).toBe("MP1");
    expect(getPositionByPlayerAndIndex(6, 2)).toBe("MP1");
    expect(getPositionByPlayerAndIndex(7, 3)).toBe("MP1");
    expect(getPositionByPlayerAndIndex(8, 3)).toBe("MP1");
    expect(getPositionByPlayerAndIndex(9, 3)).toBe("MP1");
    expect(getPositionByPlayerAndIndex(10, 4)).toBe("MP1");
  });

  it("returns MP2", () => {
    expect(getPositionByPlayerAndIndex(5, 3)).toBe("MP2");
    expect(getPositionByPlayerAndIndex(6, 3)).toBe("MP2");
    expect(getPositionByPlayerAndIndex(7, 4)).toBe("MP2");
    expect(getPositionByPlayerAndIndex(8, 4)).toBe("MP2");
    expect(getPositionByPlayerAndIndex(9, 4)).toBe("MP2");
    expect(getPositionByPlayerAndIndex(10, 5)).toBe("MP2");
  });

  it("returns MP3", () => {
    expect(getPositionByPlayerAndIndex(8, 5)).toBe("MP3");
    expect(getPositionByPlayerAndIndex(9, 5)).toBe("MP3");
    expect(getPositionByPlayerAndIndex(10, 6)).toBe("MP3");
  });

  it("returns LP1", () => {
    expect(getPositionByPlayerAndIndex(6, 4)).toBe("LP1");
    expect(getPositionByPlayerAndIndex(7, 5)).toBe("LP1");
    expect(getPositionByPlayerAndIndex(8, 6)).toBe("LP1");
    expect(getPositionByPlayerAndIndex(9, 6)).toBe("LP1");
    expect(getPositionByPlayerAndIndex(10, 7)).toBe("LP1");
  });

  it("returns LP2", () => {
    expect(getPositionByPlayerAndIndex(9, 7)).toBe("LP2");
    expect(getPositionByPlayerAndIndex(10, 8)).toBe("LP2");
  });

  it("returns BTN", () => {
    expect(getPositionByPlayerAndIndex(4, 3)).toBe("BTN");
    expect(getPositionByPlayerAndIndex(5, 4)).toBe("BTN");
    expect(getPositionByPlayerAndIndex(6, 5)).toBe("BTN");
    expect(getPositionByPlayerAndIndex(7, 6)).toBe("BTN");
    expect(getPositionByPlayerAndIndex(8, 7)).toBe("BTN");
    expect(getPositionByPlayerAndIndex(9, 8)).toBe("BTN");
    expect(getPositionByPlayerAndIndex(10, 9)).toBe("BTN");
  });

  it("should throw playerLength error", () => {
    expect(() => {
      getPositionByPlayerAndIndex(1, 0);
    }).toThrowError(
      new Error(
        "playerLength must be greater than or equal 2 and less than or equal 10."
      )
    );

    expect(() => {
      getPositionByPlayerAndIndex(11, 0);
    }).toThrow(
      new Error(
        "playerLength must be greater than or equal 2 and less than or equal 10."
      )
    );
  });

  it("should throw index error", () => {
    expect(() => {
      getPositionByPlayerAndIndex(2, -1);
    }).toThrow(
      new Error(
        "Index number must be greater than or eaual 0 and less than playerLength(2)"
      )
    );

    expect(() => {
      getPositionByPlayerAndIndex(2, 10);
    }).toThrow(
      new Error(
        "Index number must be greater than or eaual 0 and less than playerLength(2)"
      )
    );
  });
});
