export default function getStringWithSIMetricSuffix(num: number): string {
  if (num <= 0) return "0";

  const log10 = Math.floor(Math.log10(num));
  const suffix = SUFFIXES[Math.floor(log10 / 3)];

  if (suffix === undefined) {
    throw new Error(`The given value is too large. Not supported.`);
  }

  return `${Math.floor(num / 10 ** (log10 - (log10 % 3)))}${suffix}`;
}

const SUFFIXES = ["", "k", "M", "G"];
