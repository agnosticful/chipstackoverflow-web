import Rank from "./Rank";
import Suit from "./Suit";

/**
 * Represents a piece of playing card.
 */
export default interface PlayingCard {
  rank: Rank;
  suit: Suit;
}
