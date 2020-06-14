import Hand from "@@/models/Hand";
import PlayingCard from "@@/models/PlayingCard";
import Post, { PostMinimum } from "@@/models/Post";
import { toAnswer } from "@@/serializers/graphql/answer";
import { toPlayingCard } from "@@/serializers/graphql/playingCard";
import { toUserProfile } from "@@/serializers/graphql/userProfile";

export function toPost(value: any): Post {
  return {
    ...toPostMinimum(value),
    author: toUserProfile(value.author),
    answers: value.answers.map((item: any) => toAnswer(item)),
  };
}

export function toPostMinimum(value: any): PostMinimum {
  return {
    id: value.id,
    title: value.title,
    body: value.body,
    likes: value.likes,
    dislikes: value.dislikes,
    hand: toHand(value),
    heroIndex: value.heroIndex,
    createdAt: new Date(value.createdAt),
    lastUpdatedAt: new Date(value.lastUpdatedAt),
  };
}

function toHand(value: any): Hand {
  const playerCards = new Map<number, [PlayingCard, PlayingCard]>();

  for (const [i, cards] of (value.playerCards as unknown[][]).entries()) {
    if (cards === null) {
      continue;
    }

    playerCards.set(i, [toPlayingCard(cards[0]), toPlayingCard(cards[1])]);
  }

  return new Hand({
    playerInitialStackSizes: new Map(
      (value.playerStackSizes as number[]).map((v: any, k) => [k, v])
    ),
    playerCards,
    smallBlindSize: value.smallBlindSize,
    antiSize: value.antiSize,
    communityCards: value.communityCards.map(toPlayingCard),
    preflopActions: value.preflopActions,
    flopActions: value.flopActions,
    turnActions: value.turnActions,
    riverActions: value.riverActions,
  });
}
