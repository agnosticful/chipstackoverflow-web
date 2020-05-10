import Post, { PostMinimum } from "../../models/Post";
import { toAnswer } from "./answer";
import { toPlayingCard } from "./playingCard";
import { toUser } from "./user";

export function toPost(value: any): Post {
  return {
    ...toPostMinimum(value),
    author: toUser(value.author),
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
    gameSituation: {
      type: value.gameType,
      players: Array.from({ length: value.playerLength }, (_, i) => ({
        stackSize: value.playerStackSizes[i],
        holeCards: value.playerCards[i]
          ? [
              toPlayingCard(value.playerCards[i][0]),
              toPlayingCard(value.playerCards[i][1]),
            ]
          : null,
      })),
      heroIndex: value.heroIndex,
      smallBlindSize: value.smallBlindSize,
      antiSize: value.antiSize,
      communityCards: value.communityCards.map((item: any) =>
        toPlayingCard(item)
      ),
      preflopActions: value.preflopActions,
      flopActions: value.flopActions,
      turnActions: value.turnActions,
      riverActions: value.riverActions,
    },
    createdAt: new Date(value.createdAt),
    lastUpdatedAt: new Date(value.lastUpdatedAt),
  };
}
