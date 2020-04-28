export default function getPositionLabel(index: number, length: number) {
  if (length < 2 || length > 10) {
    throw new Error("length must be between 2 and 10.");
  }

  if (index < 0 || index >= length) {
    throw new Error(`index must be between 0 and ${length - 1} (length - 1).`);
  }

  return POSITION_LABEL.get(length)![index];
}

const POSITION_LABEL = new Map([
  [2, ["SB", "BB"]],
  [3, ["SB", "BB", "UTG"]],
  [4, ["SB", "BB", "UTG", "D"]],
  [5, ["SB", "BB", "UTG", "CO", "D"]],
  [6, ["SB", "BB", "UTG", "MP", "CO", "D"]],
  [7, ["SB", "BB", "UTG", "EP", "MP", "CO", "D"]],
  [8, ["SB", "BB", "UTG", "EP", "MP1", "MP2", "CO", "D"]],
  [9, ["SB", "BB", "UTG", "EP1", "EP2", "MP1", "MP2", "CO", "D"]],
  [10, ["SB", "BB", "UTG", "EP1", "EP2", "MP1", "MP2", "MP3", "CO", "D"]],
]);
