import { action } from "@storybook/addon-actions";
import { select } from "@storybook/addon-knobs";
import * as React from "react";
import { Rank, Suit } from "../../models/PlayingCard";
import Button from "../Button";
import PlayingCardSelector from "./PlayingCardSelector";

export default {
  title: "PlayingCardSelector",
  component: PlayingCardSelector
};

export const example = () => {
  const initialRank = select("initialRank", RANKS, undefined);
  const initialSuit = select("initialSuit", SUITS, undefined);

  return (
    <div style={{ paddingTop: 192 }}>
      <PlayingCardSelector
        initialRank={initialRank}
        initialSuit={initialSuit}
        onChange={action("onChange")}
        key={`${initialRank}${initialSuit}`}
      >
        <Button>Click to open</Button>
      </PlayingCardSelector>
    </div>
  );
};

const RANKS = {
  "Rank.ace": Rank.ace,
  "Rank.deuce": Rank.deuce,
  "Rank.three": Rank.three,
  "Rank.four": Rank.four,
  "Rank.five": Rank.five,
  "Rank.six": Rank.six,
  "Rank.seven": Rank.seven,
  "Rank.eight": Rank.eight,
  "Rank.nine": Rank.nine,
  "Rank.ten": Rank.ten,
  "Rank.jack": Rank.jack,
  "Rank.queen": Rank.queen,
  "Rank.king": Rank.king
};

const SUITS = {
  "Suit.spade": Suit.spade,
  "Suit.heart": Suit.heart,
  "Suit.diamond": Suit.diamond,
  "Suit.club": Suit.club
};
