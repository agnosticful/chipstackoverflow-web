import * as React from "react";

import PostCardListItem from "./PostCardListItem";
import { Suit, Rank } from "../models/PlayingCard";
import Position from "../models/Position";
import Round from "../models/Round";

export default {
  title: "PostCardListItem",
  component: PostCardListItem
};

export const postCardListItem = () => (
  <PostCardListItem
    hand={[
      {
        suit: Suit.club,
        rank: Rank.ace
      },
      {
        suit: Suit.diamond,
        rank: Rank.ace
      }
    ]}
    title="This is post title this is post title this is post title"
    likes={125}
    playAt={Position.UTG}
    endedAt={Round.PREFLOP}
    finalPod={255.5}
    posted={new Date(2020, 2, 4, 12, 15, 43, 100)}
  />
);
