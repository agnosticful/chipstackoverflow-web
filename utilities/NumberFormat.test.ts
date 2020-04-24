import NumberFormat from "./NumberFormat";

describe("NumberFormat", () => {
  describe(".toSuffixedShortString()", () => {
    test.each`
      value           | expected
      ${0}            | ${"0"}
      ${1}            | ${"1"}
      ${9}            | ${"9"}
      ${10}           | ${"10"}
      ${99}           | ${"99"}
      ${999}          | ${"999"}
      ${1000}         | ${"1k"}
      ${9999}         | ${"9k"}
      ${10000}        | ${"10k"}
      ${99999}        | ${"99k"}
      ${100000}       | ${"100k"}
      ${999999}       | ${"999k"}
      ${1000000}      | ${"1M"}
      ${9999999}      | ${"9M"}
      ${10000000}     | ${"10M"}
      ${99999999}     | ${"99M"}
      ${100000000}    | ${"100M"}
      ${999999999}    | ${"999M"}
      ${1000000000}   | ${"1G"}
      ${9999999999}   | ${"9G"}
      ${10000000000}  | ${"10G"}
      ${99999999999}  | ${"99G"}
      ${100000000000} | ${"100G"}
      ${999999999999} | ${"999G"}
    `(
      "returns $expected when the given value is $value",
      ({ value, expected }) => {
        expect(NumberFormat.toSuffixedShortString(value)).toBe(expected);
      }
    );

    it('throws an error if number greater than "G" digit', () => {
      expect(() => NumberFormat.toSuffixedShortString(1000000000000)).toThrow();
    });
  });
});
