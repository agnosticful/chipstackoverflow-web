import Position from '../models/Position';

export default function getPositionByPlayerAndIndex(players: number, index: number): Position {
  if (players < 2 || 10 < players) throw new Error('Player number must be 2 - 10.');
  if (index < 0 || players < index) throw new Error(`Index number must be 0 - player number(${players})`);

  const playerNumberAndPoositionCorrespondenceMap = new Map([
    [2, [Position.SB, Position.BB]],
    [3, [Position.SB, Position.BB, Position.UTG]],
    [4, [Position.SB, Position.BB, Position.MP1, Position.BTN]],
    [5, [Position.SB, Position.BB, Position.MP1, Position.MP2, Position.BTN]],
    [6, [Position.SB, Position.BB, Position.MP1, Position.MP2, Position.LP1, Position.BTN]],
    [7, [Position.SB, Position.BB, Position.UTG, Position.MP1, Position.MP2, Position.LP1, Position.BTN]],
    [8, [Position.SB, Position.BB, Position.UTG, Position.MP1, Position.MP2, Position.MP3, Position.LP1, Position.BTN]],
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

  return playerNumberAndPoositionCorrespondenceMap.get(players)![index];
}
