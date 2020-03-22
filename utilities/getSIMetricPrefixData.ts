export default function getSIMetricPrefixData(num: number): string {
  const logTen = Math.floor(Math.log10(num));
  const dividedByThree = Math.floor(logTen / 3);
  const rest =
    8 < dividedByThree
      ? num / Math.pow(1000, 8)
      : num / Math.pow(1000, dividedByThree);

  return `${rest}${
    sIMetricPrefix.get(dividedByThree) === undefined
      ? "Y"
      : sIMetricPrefix.get(dividedByThree)
  }`;
}

const sIMetricPrefix = new Map<number, string>([
  [0, ""],
  [1, "k"],
  [2, "M"],
  [3, "G"],
  [4, "T"],
  [5, "P"],
  [6, "E"],
  [7, "Z"],
  [8, "Y"]
]);
