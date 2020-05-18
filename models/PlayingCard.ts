import Rank from "@@/models/Rank";
import Suit from "@@/models/Suit";

/**
 * Represents a piece of playing card.
 */
export default interface PlayingCard {
  rank: Rank;
  suit: Suit;
}
