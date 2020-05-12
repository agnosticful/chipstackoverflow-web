import Suit from "../../models/Suit";

export function toSuit(value: any): Suit {
  return SUITS[value];
}

const SUITS: Record<string, Suit> = {
  SPADE: Suit.spade,
  HEART: Suit.heart,
  DIAMOND: Suit.diamond,
  CLUB: Suit.club,
};
