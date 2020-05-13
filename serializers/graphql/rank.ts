import Rank from "@@/models/Rank";

export function toRank(value: any): Rank {
  return RANKS[value];
}

const RANKS: Record<string, Rank> = {
  ACE: Rank.ace,
  DEUCE: Rank.deuce,
  THREE: Rank.three,
  FOUR: Rank.four,
  FIVE: Rank.five,
  SIX: Rank.six,
  SEVEN: Rank.seven,
  EIGHT: Rank.eight,
  NINE: Rank.nine,
  TEN: Rank.ten,
  JACK: Rank.jack,
  QUEEN: Rank.queen,
  KING: Rank.king,
};
