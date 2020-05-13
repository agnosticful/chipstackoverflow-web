import * as React from "react";
import PortraitPlayingCard from "@@/components/PortraitPlayingCard";
import Rank from "@@/models/Rank";
import Suit from "@@/models/Suit";

export default {
  title: "PortraitPlayingCard",
  component: PortraitPlayingCard,
};

export const example = () => (
  <div
    style={{
      display: "grid",
      gridTemplateColumns: "repeat(13, 1fr)",
      gap: 8,
    }}
  >
    <PortraitPlayingCard suit={Suit.spade} rank={Rank.ace} />
    <PortraitPlayingCard suit={Suit.spade} rank={Rank.deuce} />
    <PortraitPlayingCard suit={Suit.spade} rank={Rank.three} />
    <PortraitPlayingCard suit={Suit.spade} rank={Rank.four} />
    <PortraitPlayingCard suit={Suit.spade} rank={Rank.five} />
    <PortraitPlayingCard suit={Suit.spade} rank={Rank.six} />
    <PortraitPlayingCard suit={Suit.spade} rank={Rank.seven} />
    <PortraitPlayingCard suit={Suit.spade} rank={Rank.eight} />
    <PortraitPlayingCard suit={Suit.spade} rank={Rank.nine} />
    <PortraitPlayingCard suit={Suit.spade} rank={Rank.ten} />
    <PortraitPlayingCard suit={Suit.spade} rank={Rank.jack} />
    <PortraitPlayingCard suit={Suit.spade} rank={Rank.queen} />
    <PortraitPlayingCard suit={Suit.spade} rank={Rank.king} />
    <PortraitPlayingCard suit={Suit.heart} rank={Rank.ace} />
    <PortraitPlayingCard suit={Suit.heart} rank={Rank.deuce} />
    <PortraitPlayingCard suit={Suit.heart} rank={Rank.three} />
    <PortraitPlayingCard suit={Suit.heart} rank={Rank.four} />
    <PortraitPlayingCard suit={Suit.heart} rank={Rank.five} />
    <PortraitPlayingCard suit={Suit.heart} rank={Rank.six} />
    <PortraitPlayingCard suit={Suit.heart} rank={Rank.seven} />
    <PortraitPlayingCard suit={Suit.heart} rank={Rank.eight} />
    <PortraitPlayingCard suit={Suit.heart} rank={Rank.nine} />
    <PortraitPlayingCard suit={Suit.heart} rank={Rank.ten} />
    <PortraitPlayingCard suit={Suit.heart} rank={Rank.jack} />
    <PortraitPlayingCard suit={Suit.heart} rank={Rank.queen} />
    <PortraitPlayingCard suit={Suit.heart} rank={Rank.king} />
    <PortraitPlayingCard suit={Suit.diamond} rank={Rank.ace} />
    <PortraitPlayingCard suit={Suit.diamond} rank={Rank.deuce} />
    <PortraitPlayingCard suit={Suit.diamond} rank={Rank.three} />
    <PortraitPlayingCard suit={Suit.diamond} rank={Rank.four} />
    <PortraitPlayingCard suit={Suit.diamond} rank={Rank.five} />
    <PortraitPlayingCard suit={Suit.diamond} rank={Rank.six} />
    <PortraitPlayingCard suit={Suit.diamond} rank={Rank.seven} />
    <PortraitPlayingCard suit={Suit.diamond} rank={Rank.eight} />
    <PortraitPlayingCard suit={Suit.diamond} rank={Rank.nine} />
    <PortraitPlayingCard suit={Suit.diamond} rank={Rank.ten} />
    <PortraitPlayingCard suit={Suit.diamond} rank={Rank.jack} />
    <PortraitPlayingCard suit={Suit.diamond} rank={Rank.queen} />
    <PortraitPlayingCard suit={Suit.diamond} rank={Rank.king} />
    <PortraitPlayingCard suit={Suit.club} rank={Rank.ace} />
    <PortraitPlayingCard suit={Suit.club} rank={Rank.deuce} />
    <PortraitPlayingCard suit={Suit.club} rank={Rank.three} />
    <PortraitPlayingCard suit={Suit.club} rank={Rank.four} />
    <PortraitPlayingCard suit={Suit.club} rank={Rank.five} />
    <PortraitPlayingCard suit={Suit.club} rank={Rank.six} />
    <PortraitPlayingCard suit={Suit.club} rank={Rank.seven} />
    <PortraitPlayingCard suit={Suit.club} rank={Rank.eight} />
    <PortraitPlayingCard suit={Suit.club} rank={Rank.nine} />
    <PortraitPlayingCard suit={Suit.club} rank={Rank.ten} />
    <PortraitPlayingCard suit={Suit.club} rank={Rank.jack} />
    <PortraitPlayingCard suit={Suit.club} rank={Rank.queen} />
    <PortraitPlayingCard suit={Suit.club} rank={Rank.king} />
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
    <PortraitPlayingCard rank={Rank.ace} />
    <PortraitPlayingCard rank={Rank.deuce} />
    <PortraitPlayingCard rank={Rank.three} />
    <PortraitPlayingCard rank={Rank.four} />
    <PortraitPlayingCard rank={Rank.five} />
    <PortraitPlayingCard rank={Rank.six} />
    <PortraitPlayingCard rank={Rank.seven} />
    <PortraitPlayingCard rank={Rank.eight} />
    <PortraitPlayingCard rank={Rank.nine} />
    <PortraitPlayingCard rank={Rank.ten} />
    <PortraitPlayingCard rank={Rank.jack} />
    <PortraitPlayingCard rank={Rank.queen} />
    <PortraitPlayingCard rank={Rank.king} />
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
    <PortraitPlayingCard suit={Suit.spade} />
    <PortraitPlayingCard suit={Suit.heart} />
    <PortraitPlayingCard suit={Suit.diamond} />
    <PortraitPlayingCard suit={Suit.club} />
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
    <PortraitPlayingCard />
  </div>
);
