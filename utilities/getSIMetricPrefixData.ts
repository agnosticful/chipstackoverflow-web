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
  let data = num;
  let i = 0;

  while (1000 < data) {
    data = data / 1000;
    i++;
  }

  return `${i === 0 ? data : Math.round(data * 10) / 10}${sIMetricPrefix.get(
    i
  )}`;
}
