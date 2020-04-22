export default function isAffordable(
  playerStackSizes: number[],
  playerIndex: number,
  betSize: number
) {
  return betSize <= playerStackSizes[playerIndex];
}
