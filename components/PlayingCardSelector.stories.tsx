import "antd/dist/antd.css";
import * as React from "react";
import { Rank, Suit } from "../models/PlayingCard";
import PlayingCard from "./PlayingCard";
import PlayingCardSelector from "./PlayingCardSelector";

export default {
  title: "PlayingCardSelector",
  component: PlayingCardSelector
};

export const example = () => {
  const [playingCard, setPlayingCard] = React.useState({
    rank: Rank.ace,
    suit: Suit.spade
  });

  return (
    <div style={{ padding: 192 }}>
      <PlayingCardSelector
        initialValue={playingCard}
        onChange={playingCard => setPlayingCard(playingCard)}
      >
        <PlayingCard rank={playingCard.rank} suit={playingCard.suit} />
      </PlayingCardSelector>
    </div>
  );
};

export const atTopEdge = () => {
  const [playingCard, setPlayingCard] = React.useState({
    rank: Rank.ace,
    suit: Suit.spade
  });

  return (
    <div style={{ padding: "0 192px 192px 192px", textAlign: "right" }}>
      <PlayingCardSelector
        initialValue={playingCard}
        onChange={playingCard => setPlayingCard(playingCard)}
      >
        <PlayingCard rank={playingCard.rank} suit={playingCard.suit} />
      </PlayingCardSelector>
    </div>
  );
};

export const atRightEdge = () => {
  const [playingCard, setPlayingCard] = React.useState({
    rank: Rank.ace,
    suit: Suit.spade
  });

  return (
    <div style={{ padding: "192px 0", textAlign: "right" }}>
      <PlayingCardSelector
        initialValue={playingCard}
        onChange={playingCard => setPlayingCard(playingCard)}
      >
        <PlayingCard rank={playingCard.rank} suit={playingCard.suit} />
      </PlayingCardSelector>
    </div>
  );
};
