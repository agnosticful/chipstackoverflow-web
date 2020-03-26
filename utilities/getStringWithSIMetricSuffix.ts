export default function getStringWithSIMetricSuffix(num: number): string {
  const dividedByThree = Math.floor(Math.floor(Math.log10(num)) / 3);
  const rest = Math.round(
    8 < dividedByThree
      ? num / Math.pow(1000, 8)
      : num / Math.pow(1000, dividedByThree)
  );

  return `${rest}${
    SI_METRIC_SUFFIXES.get(dividedByThree) === undefined
      ? "Y"
      : SI_METRIC_SUFFIXES.get(dividedByThree)
  }`;
}

const SI_METRIC_SUFFIXES = new Map<number, string>([
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
