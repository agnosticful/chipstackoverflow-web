export default function getCyclicNextPlayerIndexOf(
  current: number,
  playerIndexes: Set<number>
): number {
  const sortedPlayerIndexes = [...playerIndexes].sort((a, b) => a - b);
  const nextPlayerIndex = sortedPlayerIndexes.find((value) => current < value);

  return nextPlayerIndex ? nextPlayerIndex : sortedPlayerIndexes[0];
}
