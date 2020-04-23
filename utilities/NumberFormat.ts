export default abstract class NumberFormat {
  static toSuffixedShortString(value: number) {
    if (value <= 0) return "0";

    const log10 = Math.floor(Math.log10(value));
    const suffix = NumberFormat.SUFFIXES[Math.floor(log10 / 3)];

    if (suffix === undefined) {
      throw new Error(`The given value is too large. Not supported.`);
    }

    return `${Math.floor(value / 10 ** (log10 - (log10 % 3)))}${suffix}`;
  }

  private static SUFFIXES = ["", "k", "M", "G"];
}
