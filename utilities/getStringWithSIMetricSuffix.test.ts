import getStringWithSIMetricSuffix from "./getStringWithSIMetricSuffix";

describe("getStringWithSIMetricSuffix()", () => {
  it("returns string of number", () => {
    expect(getStringWithSIMetricSuffix(0)).toBe("0");
    expect(getStringWithSIMetricSuffix(5)).toBe("5");
    expect(getStringWithSIMetricSuffix(50)).toBe("50");
    expect(getStringWithSIMetricSuffix(500)).toBe("500");
  });

  it("returns string of number with suffix", () => {
    expect(getStringWithSIMetricSuffix(5000)).toBe("5k");
    expect(getStringWithSIMetricSuffix(50000)).toBe("50k");
    expect(getStringWithSIMetricSuffix(500000)).toBe("500k");
    expect(getStringWithSIMetricSuffix(5000000)).toBe("5M");
    expect(getStringWithSIMetricSuffix(50000000)).toBe("50M");
    expect(getStringWithSIMetricSuffix(500000000)).toBe("500M");
    expect(getStringWithSIMetricSuffix(5000000000)).toBe("5G");
    expect(getStringWithSIMetricSuffix(50000000000)).toBe("50G");
    expect(getStringWithSIMetricSuffix(500000000000)).toBe("500G");
    expect(getStringWithSIMetricSuffix(5000000000000)).toBe("5T");
    expect(getStringWithSIMetricSuffix(50000000000000)).toBe("50T");
    expect(getStringWithSIMetricSuffix(500000000000000)).toBe("500T");
    expect(getStringWithSIMetricSuffix(5000000000000000)).toBe("5P");
    expect(getStringWithSIMetricSuffix(50000000000000000)).toBe("50P");
    expect(getStringWithSIMetricSuffix(500000000000000000)).toBe("500P");
    expect(getStringWithSIMetricSuffix(5000000000000000000)).toBe("5E");
    expect(getStringWithSIMetricSuffix(50000000000000000000)).toBe("50E");
    expect(getStringWithSIMetricSuffix(500000000000000000000)).toBe("500E");
    expect(getStringWithSIMetricSuffix(5000000000000000000000)).toBe("5Z");
    expect(getStringWithSIMetricSuffix(50000000000000000000000)).toBe("50Z");
    expect(getStringWithSIMetricSuffix(500000000000000000000000)).toBe("500Z");
    expect(getStringWithSIMetricSuffix(5000000000000000000000000)).toBe("5Y");
    expect(getStringWithSIMetricSuffix(50000000000000000000000000)).toBe("50Y");
    expect(getStringWithSIMetricSuffix(500000000000000000000000000)).toBe(
      "500Y"
    );
  });

  it("works for an edge case well", () => {
    expect(getStringWithSIMetricSuffix(5000000000000000000000000000)).toBe(
      "5000Y"
    );
  });
});
