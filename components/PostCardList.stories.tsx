import * as React from "react";

import PostCardList from "./PostCardList";
import { Suit, Rank } from "../models/PlayingCard";
import Position from "../models/Position";
import Round from "../models/Round";

export default {
  title: "Posts",
  component: PostCardList
};

export const postItem = () => {
  const postData: {
    id: string;
    hand: [{ rank: Rank; suit: Suit }, { rank: Rank; suit: Suit }];
    title: string;
    likes: number;
    playAt: Position;
    endedAt: Round;
    finalPod: number;
    posted: Date;
  }[] = [
    {
      id: "fawegewaugwegj23452fse",
      hand: [
        {
          suit: Suit.heart,
          rank: Rank.jack
        },
        {
          suit: Suit.diamond,
          rank: Rank.ace
        }
      ],
      title: "This is post title this is post title this is post title",
      likes: 125,
      playAt: Position.UTG,
      endedAt: Round.PREFLOP,
      finalPod: 2550.5,
      posted: new Date(2020, 2, 10, 12, 15, 43, 100)
    },
    {
      id: "fawegewaugwegj2345agewagfse",
      hand: [
        {
          suit: Suit.club,
          rank: Rank.ace
        },
        {
          suit: Suit.club,
          rank: Rank.deuce
        }
      ],
      title: "This is post title this is post title this is post title",
      likes: 125,
      playAt: Position.UTG,
      endedAt: Round.PREFLOP,
      finalPod: 255000000.5,
      posted: new Date(2020, 2, 14, 0, 15, 43, 100)
    },
    {
      id: "faweeeeeugwegj23452fse",
      hand: [
        {
          suit: Suit.diamond,
          rank: Rank.ace
        },
        {
          suit: Suit.spade,
          rank: Rank.king
        }
      ],
      title: "This is post title this is post title this is post title",
      likes: 125,
      playAt: Position.UTG,
      endedAt: Round.PREFLOP,
      finalPod: 255000000000.5,
      posted: new Date(2020, 1, 4, 12, 15, 43, 100)
    },
    {
      id: "fawegewaugwg423452fse",
      hand: [
        {
          suit: Suit.club,
          rank: Rank.ace
        },
        {
          suit: Suit.diamond,
          rank: Rank.ace
        }
      ],
      title: "This is post title this is post title this is post title",
      likes: 125,
      playAt: Position.UTG,
      endedAt: Round.PREFLOP,
      finalPod: 255000000000000.5,
      posted: new Date(2019, 3, 4, 12, 15, 43, 100)
    },
    {
      id: "h55hs5h5s4hg",
      hand: [
        {
          suit: Suit.club,
          rank: Rank.ace
        },
        {
          suit: Suit.diamond,
          rank: Rank.ace
        }
      ],
      title: "This is post title this is post title this is post title",
      likes: 125,
      playAt: Position.UTG,
      endedAt: Round.PREFLOP,
      finalPod: 255000000000000000.5,
      posted: new Date(2020, 2, 4, 12, 15, 43, 100)
    },
    {
      id: "j7j7jrdruths",
      hand: [
        {
          suit: Suit.club,
          rank: Rank.ace
        },
        {
          suit: Suit.diamond,
          rank: Rank.ace
        }
      ],
      title: "This is post title this is post title this is post title",
      likes: 125,
      playAt: Position.UTG,
      endedAt: Round.PREFLOP,
      finalPod: 255.5,
      posted: new Date(2020, 2, 4, 12, 15, 43, 100)
    }
  ];
  return (
    <PostCardList
      postData={postData}
      handleClick={id => {
        console.log(`${id} is clicked`);
      }}
    />
  );
};
