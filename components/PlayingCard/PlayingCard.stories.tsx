import * as React from "react";
import { Rank, Suit } from "../../models/PlayingCard";
import PlayingCard from "./PlayingCard";

export default {
  title: "PlayingCard",
  component: PlayingCard
};

export const example = () => (
  <div
    style={{
      display: "grid",
      gridTemplateColumns: "repeat(13, 1fr)",
      gap: 8
    }}
  >
    <PlayingCard suit={Suit.spade} rank={Rank.ace} />
    <PlayingCard suit={Suit.spade} rank={Rank.deuce} />
    <PlayingCard suit={Suit.spade} rank={Rank.three} />
    <PlayingCard suit={Suit.spade} rank={Rank.four} />
    <PlayingCard suit={Suit.spade} rank={Rank.five} />
    <PlayingCard suit={Suit.spade} rank={Rank.six} />
    <PlayingCard suit={Suit.spade} rank={Rank.seven} />
    <PlayingCard suit={Suit.spade} rank={Rank.eight} />
    <PlayingCard suit={Suit.spade} rank={Rank.nine} />
    <PlayingCard suit={Suit.spade} rank={Rank.ten} />
    <PlayingCard suit={Suit.spade} rank={Rank.jack} />
    <PlayingCard suit={Suit.spade} rank={Rank.queen} />
    <PlayingCard suit={Suit.spade} rank={Rank.king} />
    <PlayingCard suit={Suit.heart} rank={Rank.ace} />
    <PlayingCard suit={Suit.heart} rank={Rank.deuce} />
    <PlayingCard suit={Suit.heart} rank={Rank.three} />
    <PlayingCard suit={Suit.heart} rank={Rank.four} />
    <PlayingCard suit={Suit.heart} rank={Rank.five} />
    <PlayingCard suit={Suit.heart} rank={Rank.six} />
    <PlayingCard suit={Suit.heart} rank={Rank.seven} />
    <PlayingCard suit={Suit.heart} rank={Rank.eight} />
    <PlayingCard suit={Suit.heart} rank={Rank.nine} />
    <PlayingCard suit={Suit.heart} rank={Rank.ten} />
    <PlayingCard suit={Suit.heart} rank={Rank.jack} />
    <PlayingCard suit={Suit.heart} rank={Rank.queen} />
    <PlayingCard suit={Suit.heart} rank={Rank.king} />
    <PlayingCard suit={Suit.diamond} rank={Rank.ace} />
    <PlayingCard suit={Suit.diamond} rank={Rank.deuce} />
    <PlayingCard suit={Suit.diamond} rank={Rank.three} />
    <PlayingCard suit={Suit.diamond} rank={Rank.four} />
    <PlayingCard suit={Suit.diamond} rank={Rank.five} />
    <PlayingCard suit={Suit.diamond} rank={Rank.six} />
    <PlayingCard suit={Suit.diamond} rank={Rank.seven} />
    <PlayingCard suit={Suit.diamond} rank={Rank.eight} />
    <PlayingCard suit={Suit.diamond} rank={Rank.nine} />
    <PlayingCard suit={Suit.diamond} rank={Rank.ten} />
    <PlayingCard suit={Suit.diamond} rank={Rank.jack} />
    <PlayingCard suit={Suit.diamond} rank={Rank.queen} />
    <PlayingCard suit={Suit.diamond} rank={Rank.king} />
    <PlayingCard suit={Suit.club} rank={Rank.ace} />
    <PlayingCard suit={Suit.club} rank={Rank.deuce} />
    <PlayingCard suit={Suit.club} rank={Rank.three} />
    <PlayingCard suit={Suit.club} rank={Rank.four} />
    <PlayingCard suit={Suit.club} rank={Rank.five} />
    <PlayingCard suit={Suit.club} rank={Rank.six} />
    <PlayingCard suit={Suit.club} rank={Rank.seven} />
    <PlayingCard suit={Suit.club} rank={Rank.eight} />
    <PlayingCard suit={Suit.club} rank={Rank.nine} />
    <PlayingCard suit={Suit.club} rank={Rank.ten} />
    <PlayingCard suit={Suit.club} rank={Rank.jack} />
    <PlayingCard suit={Suit.club} rank={Rank.queen} />
    <PlayingCard suit={Suit.club} rank={Rank.king} />
  </div>
);

export const noSuit = () => (
  <div
    style={{
      display: "grid",
      gridTemplateColumns: "repeat(13, 1fr)",
      gap: 8
    }}
  >
    <PlayingCard rank={Rank.ace} />
    <PlayingCard rank={Rank.deuce} />
    <PlayingCard rank={Rank.three} />
    <PlayingCard rank={Rank.four} />
    <PlayingCard rank={Rank.five} />
    <PlayingCard rank={Rank.six} />
    <PlayingCard rank={Rank.seven} />
    <PlayingCard rank={Rank.eight} />
    <PlayingCard rank={Rank.nine} />
    <PlayingCard rank={Rank.ten} />
    <PlayingCard rank={Rank.jack} />
    <PlayingCard rank={Rank.queen} />
    <PlayingCard rank={Rank.king} />
  </div>
);

export const noRank = () => (
  <div
    style={{
      display: "grid",
      gridTemplateColumns: "repeat(13, 1fr)",
      gap: 8
    }}
  >
    <PlayingCard suit={Suit.spade} />
    <PlayingCard suit={Suit.heart} />
    <PlayingCard suit={Suit.diamond} />
    <PlayingCard suit={Suit.club} />
  </div>
);
