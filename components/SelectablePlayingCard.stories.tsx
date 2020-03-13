import "antd/dist/antd.css";
import * as React from "react";
import { Rank, Suit } from "../models/PlayingCard";
import SelectablePlayingCard from "./SelectablePlayingCard";

export default {
  title: "SelectablePlayingCard",
  component: SelectablePlayingCard
};

export const example = () => <SelectablePlayingCard />;

export const withInitialValue = () => (
  <SelectablePlayingCard initialRank={Rank.queen} initialSuit={Suit.diamond} />
);
