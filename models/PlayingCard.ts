/**
 * Represents a piece of playing card.
 */
export default interface PlayingCard {
  rank: Rank;
  suit: Suit;
}

/**
 * Represents playing card's rank.
 */
export enum Rank {
  ace = 1,
  deuce = 2,
  three = 3,
  four = 4,
  five = 5,
  six = 6,
  seven = 7,
  eight = 8,
  nine = 9,
  ten = 10,
  jack = 11,
  queen = 12,
  king = 13,
}

/**
 * Represents playing card's suit.
 */
export enum Suit {
  spade = "SPADE",
  heart = "HEART",
  diamond = "DIAMOND",
  club = "CLUB",
}
