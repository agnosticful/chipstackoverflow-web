export default function getPositionByPlayerAndIndex(
  playerLength: number,
  index: number
): PlayerPosition {
  if (playerLength < 2 || 10 < playerLength)
    throw new Error(
      "playerLength must be greater than or equal 2 and less than or equal 10."
    );
  if (index < 0 || playerLength <= index)
    throw new Error(
      `Index number must be greater than or eaual 0 and less than playerLength(${playerLength})`
    );

  return POSITION_CORRESPONDENCE_EACH_PLAYER_LENGTH.get(playerLength)![index];
}

enum PlayerPosition {
  sb = "SB",
  bb = "BB",
  utg = "UTG",
  ep2 = "EP2",
  mp1 = "MP1",
  mp2 = "MP2",
  mp3 = "MP3",
  lp1 = "LP1",
  lp2 = "LP2",
  btn = "BTN",
}

const POSITION_CORRESPONDENCE_EACH_PLAYER_LENGTH = new Map([
  [2, [PlayerPosition.sb, PlayerPosition.bb]],
  [3, [PlayerPosition.sb, PlayerPosition.bb, PlayerPosition.utg]],
  [
    4,
    [
      PlayerPosition.sb,
      PlayerPosition.bb,
      PlayerPosition.mp1,
      PlayerPosition.btn,
    ],
  ],
  [
    5,
    [
      PlayerPosition.sb,
      PlayerPosition.bb,
      PlayerPosition.mp1,
      PlayerPosition.mp2,
      PlayerPosition.btn,
    ],
  ],
  [
    6,
    [
      PlayerPosition.sb,
      PlayerPosition.bb,
      PlayerPosition.mp1,
      PlayerPosition.mp2,
      PlayerPosition.lp1,
      PlayerPosition.btn,
    ],
  ],
  [
    7,
    [
      PlayerPosition.sb,
      PlayerPosition.bb,
      PlayerPosition.utg,
      PlayerPosition.mp1,
      PlayerPosition.mp2,
      PlayerPosition.lp1,
      PlayerPosition.btn,
    ],
  ],
  [
    8,
    [
      PlayerPosition.sb,
      PlayerPosition.bb,
      PlayerPosition.utg,
      PlayerPosition.mp1,
      PlayerPosition.mp2,
      PlayerPosition.mp3,
      PlayerPosition.lp1,
      PlayerPosition.btn,
    ],
  ],
  [
    9,
    [
      PlayerPosition.sb,
      PlayerPosition.bb,
      PlayerPosition.utg,
      PlayerPosition.mp1,
      PlayerPosition.mp2,
      PlayerPosition.mp3,
      PlayerPosition.lp1,
      PlayerPosition.lp2,
      PlayerPosition.btn,
    ],
  ],
  [
    10,
    [
      PlayerPosition.sb,
      PlayerPosition.bb,
      PlayerPosition.utg,
      PlayerPosition.ep2,
      PlayerPosition.mp1,
      PlayerPosition.mp2,
      PlayerPosition.mp3,
      PlayerPosition.lp1,
      PlayerPosition.lp2,
      PlayerPosition.btn,
    ],
  ],
]);
