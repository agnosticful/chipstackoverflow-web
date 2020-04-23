import NumberFormatter from "./NumberFormatter";

describe("NumberFormatter", () => {
  describe(".toSuffixedShortString()", () => {
    it("returns string of number", () => {
      expect(NumberFormatter.toSuffixedShortString(0)).toBe("0");
      expect(NumberFormatter.toSuffixedShortString(1)).toBe("1");
      expect(NumberFormatter.toSuffixedShortString(9)).toBe("9");
      expect(NumberFormatter.toSuffixedShortString(10)).toBe("10");
      expect(NumberFormatter.toSuffixedShortString(100)).toBe("100");
      expect(NumberFormatter.toSuffixedShortString(999)).toBe("999");
    });

    it("returns string of number with suffix", () => {
      expect(NumberFormatter.toSuffixedShortString(5000)).toBe("5k");
      expect(NumberFormatter.toSuffixedShortString(50000)).toBe("50k");
      expect(NumberFormatter.toSuffixedShortString(500000)).toBe("500k");
      expect(NumberFormatter.toSuffixedShortString(5000000)).toBe("5M");
      expect(NumberFormatter.toSuffixedShortString(50000000)).toBe("50M");
      expect(NumberFormatter.toSuffixedShortString(500000000)).toBe("500M");
      expect(NumberFormatter.toSuffixedShortString(5000000000)).toBe("5G");
      expect(NumberFormatter.toSuffixedShortString(50000000000)).toBe("50G");
      expect(NumberFormatter.toSuffixedShortString(500000000000)).toBe("500G");
    });

    it('throw an error if number greater than "G" digit', () => {
      expect(() =>
        NumberFormatter.toSuffixedShortString(5000000000000000000000000000)
      ).toThrow();
    });
  });
});
