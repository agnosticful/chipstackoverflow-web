import { HandActionType } from "@@/models/Hand";
import { HandInputTypeAction } from "@@/models/HandInputType";
import Post from "@@/models/Post";
import PlayingCard from "@@/models/PlayingCard";
import Rank from "@@/models/Rank";
import Suit from "@@/models/Suit";

export default function usePostCreation() {
  const post: {
    playerLength: number;
    playerStackSizes: number[];
    preflop: HandInputTypeAction[];
    flop: HandInputTypeAction[];
    turn: HandInputTypeAction[];
    river: HandInputTypeAction[];
    playerHands: [PlayingCard | null, PlayingCard | null][];
    showdownActivePlayer: number[];
  } = {
    playerLength: 2,
    playerStackSizes: [0, 0],
    preflop: [
      {
        type: HandActionType.fold,
        playerIndex: 0,
        betSize: 0,
        tableMaxBetSize: 0,
        previousBetSize: 0,
      },
      {
        type: HandActionType.fold,
        playerIndex: 1,
        betSize: 1,
        tableMaxBetSize: 0,
        previousBetSize: 0,
      },
    ],
    flop: [],
    turn: [],
    river: [],
    playerHands: [
      [
        { rank: Rank.ace, suit: Suit.club },
        { rank: Rank.eight, suit: Suit.heart },
      ],
      [
        { rank: Rank.jack, suit: Suit.diamond },
        { rank: Rank.nine, suit: Suit.spade },
      ],
    ],
    showdownActivePlayer: [0, 1],
  };

  const postValidation = {
    a: new Set(),
    b: new Set(),
    c: new Set(),
    validated: false,
  };

  const createPost = (): Promise<Post> => {
    return new Promise(() => {});
  };

  return {
    post,
    postValidation,
    createPost,
  };
}
