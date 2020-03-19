enum Position {
  SB = "SB",
  BB = "BB",
  UTG = "UTG",
  EP2 = "EP2",
  MP1 = "MP1",
  MP2 = "MP2",
  MP3 = "MP3",
  LP1 = "LP1",
  LP2 = "LP2",
  BTN = "BTN"
}

export default function getPositionByPlayerAndIndex(
  playerLength: number,
  index: number
): Position {
  if (playerLength < 2 || 10 < playerLength)
    throw new Error("Player number must be 2 - 10.");
  if (index < 0 || playerLength < index)
    throw new Error(`Index number must be 0 - player number(${playerLength})`);

  return playerNumberAndPositionCorrespondence.get(playerLength)![index];
}

const playerNumberAndPositionCorrespondence = new Map([
  [2, [Position.SB, Position.BB]],
  [3, [Position.SB, Position.BB, Position.UTG]],
  [4, [Position.SB, Position.BB, Position.MP1, Position.BTN]],
  [5, [Position.SB, Position.BB, Position.MP1, Position.MP2, Position.BTN]],
  [
    6,
    [
      Position.SB,
      Position.BB,
      Position.MP1,
      Position.MP2,
      Position.LP1,
      Position.BTN
    ]
  ],
  [
    7,
    [
      Position.SB,
      Position.BB,
      Position.UTG,
      Position.MP1,
      Position.MP2,
      Position.LP1,
      Position.BTN
    ]
  ],
  [
    8,
    [
      Position.SB,
      Position.BB,
      Position.UTG,
      Position.MP1,
      Position.MP2,
      Position.MP3,
      Position.LP1,
      Position.BTN
    ]
  ],
  [
    9,
    [
      Position.SB,
      Position.BB,
      Position.UTG,
      Position.MP1,
      Position.MP2,
      Position.MP3,
      Position.LP1,
      Position.LP2,
      Position.BTN
    ]
  ],
  [
    10,
    [
      Position.SB,
      Position.BB,
      Position.UTG,
      Position.EP2,
      Position.MP1,
      Position.MP2,
      Position.MP3,
      Position.LP1,
      Position.LP2,
      Position.BTN
    ]
  ]
]);
