import getSIMetricPrefixData from "./getSIMetricPrefixData";

describe("getSIMetricPrefixData()", () => {
  it("returns number without prefix", () => {
    expect(getSIMetricPrefixData(5)).toBe("5");
    expect(getSIMetricPrefixData(50)).toBe("50");
    expect(getSIMetricPrefixData(500)).toBe("500");
  });

  it("returns number with prefix", () => {
    expect(getSIMetricPrefixData(5000)).toBe("5k");
    expect(getSIMetricPrefixData(50000)).toBe("50k");
    expect(getSIMetricPrefixData(500000)).toBe("500k");
    expect(getSIMetricPrefixData(5000000)).toBe("5M");
    expect(getSIMetricPrefixData(50000000)).toBe("50M");
    expect(getSIMetricPrefixData(500000000)).toBe("500M");
    expect(getSIMetricPrefixData(5000000000)).toBe("5G");
    expect(getSIMetricPrefixData(50000000000)).toBe("50G");
    expect(getSIMetricPrefixData(500000000000)).toBe("500G");
    expect(getSIMetricPrefixData(5000000000000)).toBe("5T");
    expect(getSIMetricPrefixData(50000000000000)).toBe("50T");
    expect(getSIMetricPrefixData(500000000000000)).toBe("500T");
    expect(getSIMetricPrefixData(5000000000000000)).toBe("5P");
    expect(getSIMetricPrefixData(50000000000000000)).toBe("50P");
    expect(getSIMetricPrefixData(500000000000000000)).toBe("500P");
    expect(getSIMetricPrefixData(5000000000000000000)).toBe("5E");
    expect(getSIMetricPrefixData(50000000000000000000)).toBe("50E");
    expect(getSIMetricPrefixData(500000000000000000000)).toBe("500E");
    expect(getSIMetricPrefixData(5000000000000000000000)).toBe("5Z");
    expect(getSIMetricPrefixData(50000000000000000000000)).toBe("50Z");
    expect(getSIMetricPrefixData(500000000000000000000000)).toBe("500Z");
    expect(getSIMetricPrefixData(5000000000000000000000000)).toBe("5Y");
    expect(getSIMetricPrefixData(50000000000000000000000000)).toBe("50Y");
    expect(getSIMetricPrefixData(500000000000000000000000000)).toBe("500Y");
  });

  it("works edge case well", () => {
    expect(getSIMetricPrefixData(5000000000000000000000000000)).toBe("5000Y");
  });
});
