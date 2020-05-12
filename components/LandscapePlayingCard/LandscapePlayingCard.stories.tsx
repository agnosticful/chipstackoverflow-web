import * as React from "react";
import Rank from "../../models/Rank";
import Suit from "../../models/Suit";
import LandscapePlayingCard from "./LandscapePlayingCard";

export default {
  title: "LandscapePlayingCard",
  component: LandscapePlayingCard,
};

export const example = () => (
  <div
    style={{
      display: "grid",
      gridTemplateColumns: "repeat(13, 1fr)",
      gap: 8,
    }}
  >
    <LandscapePlayingCard suit={Suit.spade} rank={Rank.ace} />
    <LandscapePlayingCard suit={Suit.spade} rank={Rank.deuce} />
    <LandscapePlayingCard suit={Suit.spade} rank={Rank.three} />
    <LandscapePlayingCard suit={Suit.spade} rank={Rank.four} />
    <LandscapePlayingCard suit={Suit.spade} rank={Rank.five} />
    <LandscapePlayingCard suit={Suit.spade} rank={Rank.six} />
    <LandscapePlayingCard suit={Suit.spade} rank={Rank.seven} />
    <LandscapePlayingCard suit={Suit.spade} rank={Rank.eight} />
    <LandscapePlayingCard suit={Suit.spade} rank={Rank.nine} />
    <LandscapePlayingCard suit={Suit.spade} rank={Rank.ten} />
    <LandscapePlayingCard suit={Suit.spade} rank={Rank.jack} />
    <LandscapePlayingCard suit={Suit.spade} rank={Rank.queen} />
    <LandscapePlayingCard suit={Suit.spade} rank={Rank.king} />
    <LandscapePlayingCard suit={Suit.heart} rank={Rank.ace} />
    <LandscapePlayingCard suit={Suit.heart} rank={Rank.deuce} />
    <LandscapePlayingCard suit={Suit.heart} rank={Rank.three} />
    <LandscapePlayingCard suit={Suit.heart} rank={Rank.four} />
    <LandscapePlayingCard suit={Suit.heart} rank={Rank.five} />
    <LandscapePlayingCard suit={Suit.heart} rank={Rank.six} />
    <LandscapePlayingCard suit={Suit.heart} rank={Rank.seven} />
    <LandscapePlayingCard suit={Suit.heart} rank={Rank.eight} />
    <LandscapePlayingCard suit={Suit.heart} rank={Rank.nine} />
    <LandscapePlayingCard suit={Suit.heart} rank={Rank.ten} />
    <LandscapePlayingCard suit={Suit.heart} rank={Rank.jack} />
    <LandscapePlayingCard suit={Suit.heart} rank={Rank.queen} />
    <LandscapePlayingCard suit={Suit.heart} rank={Rank.king} />
    <LandscapePlayingCard suit={Suit.diamond} rank={Rank.ace} />
    <LandscapePlayingCard suit={Suit.diamond} rank={Rank.deuce} />
    <LandscapePlayingCard suit={Suit.diamond} rank={Rank.three} />
    <LandscapePlayingCard suit={Suit.diamond} rank={Rank.four} />
    <LandscapePlayingCard suit={Suit.diamond} rank={Rank.five} />
    <LandscapePlayingCard suit={Suit.diamond} rank={Rank.six} />
    <LandscapePlayingCard suit={Suit.diamond} rank={Rank.seven} />
    <LandscapePlayingCard suit={Suit.diamond} rank={Rank.eight} />
    <LandscapePlayingCard suit={Suit.diamond} rank={Rank.nine} />
    <LandscapePlayingCard suit={Suit.diamond} rank={Rank.ten} />
    <LandscapePlayingCard suit={Suit.diamond} rank={Rank.jack} />
    <LandscapePlayingCard suit={Suit.diamond} rank={Rank.queen} />
    <LandscapePlayingCard suit={Suit.diamond} rank={Rank.king} />
    <LandscapePlayingCard suit={Suit.club} rank={Rank.ace} />
    <LandscapePlayingCard suit={Suit.club} rank={Rank.deuce} />
    <LandscapePlayingCard suit={Suit.club} rank={Rank.three} />
    <LandscapePlayingCard suit={Suit.club} rank={Rank.four} />
    <LandscapePlayingCard suit={Suit.club} rank={Rank.five} />
    <LandscapePlayingCard suit={Suit.club} rank={Rank.six} />
    <LandscapePlayingCard suit={Suit.club} rank={Rank.seven} />
    <LandscapePlayingCard suit={Suit.club} rank={Rank.eight} />
    <LandscapePlayingCard suit={Suit.club} rank={Rank.nine} />
    <LandscapePlayingCard suit={Suit.club} rank={Rank.ten} />
    <LandscapePlayingCard suit={Suit.club} rank={Rank.jack} />
    <LandscapePlayingCard suit={Suit.club} rank={Rank.queen} />
    <LandscapePlayingCard suit={Suit.club} rank={Rank.king} />
  </div>
);

export const noSuit = () => (
  <div
    style={{
      display: "grid",
      gridTemplateColumns: "repeat(13, 1fr)",
      gap: 8,
    }}
  >
    <LandscapePlayingCard rank={Rank.ace} />
    <LandscapePlayingCard rank={Rank.deuce} />
    <LandscapePlayingCard rank={Rank.three} />
    <LandscapePlayingCard rank={Rank.four} />
    <LandscapePlayingCard rank={Rank.five} />
    <LandscapePlayingCard rank={Rank.six} />
    <LandscapePlayingCard rank={Rank.seven} />
    <LandscapePlayingCard rank={Rank.eight} />
    <LandscapePlayingCard rank={Rank.nine} />
    <LandscapePlayingCard rank={Rank.ten} />
    <LandscapePlayingCard rank={Rank.jack} />
    <LandscapePlayingCard rank={Rank.queen} />
    <LandscapePlayingCard rank={Rank.king} />
  </div>
);

export const noRank = () => (
  <div
    style={{
      display: "grid",
      gridTemplateColumns: "repeat(13, 1fr)",
      gap: 8,
    }}
  >
    <LandscapePlayingCard suit={Suit.spade} />
    <LandscapePlayingCard suit={Suit.heart} />
    <LandscapePlayingCard suit={Suit.diamond} />
    <LandscapePlayingCard suit={Suit.club} />
  </div>
);

export const unknown = () => (
  <div
    style={{
      display: "grid",
      gridTemplateColumns: "repeat(13, 1fr)",
      gap: 8,
    }}
  >
    <LandscapePlayingCard />
  </div>
);
