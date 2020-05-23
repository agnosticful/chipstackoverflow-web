export default function getAcyclicNextPlayerIndexOf(
  current: number,
  activePlayerIndexes: Set<number>
): number {
  const acyclicArray = [...activePlayerIndexes].sort((a, b) => a - b);
  const nextPlayerIndex = acyclicArray.find((value) => current < value);

  return nextPlayerIndex ? nextPlayerIndex : acyclicArray[0];
}
