import PlayingCard from "../../models/PlayingCard";
import { toRank } from "./rank";
import { toSuit } from "./suit";

export function toPlayingCard(value: any): PlayingCard {
  return {
    rank: toRank(value.rank),
    suit: toSuit(value.suit),
  };
}
