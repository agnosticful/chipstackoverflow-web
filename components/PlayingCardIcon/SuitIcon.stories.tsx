import * as React from "react";
import { Suit } from "../../models/PlayingCard";
import SuitIcon from "./SuitIcon";

export default {
  title: "SuitIcon",
  component: SuitIcon,
};

export const example = () => (
  <div
    style={{
      display: "grid",
      gridTemplateColumns: "repeat(4, minmax(16px, 64px))",
      gap: 8,
    }}
  >
    <SuitIcon suit={Suit.spade} />
    <SuitIcon suit={Suit.heart} />
    <SuitIcon suit={Suit.diamond} />
    <SuitIcon suit={Suit.club} />
  </div>
);
