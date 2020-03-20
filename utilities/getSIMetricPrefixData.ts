export default function getSIMetricPrefixData(num: number): string {
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
  const logTen = Math.log10(num);
  const dividedByThree = Math.floor(logTen / 3);

  return `${
    dividedByThree === 0 ? num : Math.round((logTen % 3) * 10) / 10
  }${sIMetricPrefix.get(dividedByThree)}`;
}
