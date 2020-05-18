import PlayingCard from "@@/models/PlayingCard";
import { toRank } from "@@/serializers/graphql/rank";
import { toSuit } from "@@/serializers/graphql/suit";

export function toPlayingCard(value: any): PlayingCard {
  return {
    rank: toRank(value.rank),
    suit: toSuit(value.suit),
  };
}
