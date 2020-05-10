import * as React from "react";
import { Rank, Suit } from "../../models/PlayingCard";
import RankIcon from "./RankIcon";

export default {
  title: "PlayingCardIcon/RankIcon",
  component: RankIcon,
};

export const example = () => (
  <div
    style={{
      display: "grid",
      gridTemplateColumns: "repeat(13, minmax(16px, 64px))",
      gap: 8,
    }}
  >
    <RankIcon rank={Rank.ace} />
    <RankIcon rank={Rank.deuce} />
    <RankIcon rank={Rank.three} />
    <RankIcon rank={Rank.four} />
    <RankIcon rank={Rank.five} />
    <RankIcon rank={Rank.six} />
    <RankIcon rank={Rank.seven} />
    <RankIcon rank={Rank.eight} />
    <RankIcon rank={Rank.nine} />
    <RankIcon rank={Rank.ten} />
    <RankIcon rank={Rank.jack} />
    <RankIcon rank={Rank.queen} />
    <RankIcon rank={Rank.king} />
  </div>
);

export const coloringBySuit = () => (
  <div
    style={{
      display: "grid",
      gridTemplateColumns: "repeat(4, minmax(16px, 64px))",
      gap: 8,
    }}
  >
    <RankIcon rank={Rank.ace} suit={Suit.spade} />
    <RankIcon rank={Rank.king} suit={Suit.heart} />
    <RankIcon rank={Rank.queen} suit={Suit.diamond} />
    <RankIcon rank={Rank.jack} suit={Suit.club} />
  </div>
);
