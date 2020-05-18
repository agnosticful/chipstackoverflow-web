import * as React from "react";
import { UnknownIcon } from "@@/components/PlayingCardIcon";

export default {
  title: "PlayingCardIcon/UnknownIcon",
  component: UnknownIcon,
};

export const example = () => (
  <div
    style={{
      display: "grid",
      gridTemplateColumns: "repeat(13, minmax(16px, 64px))",
      gap: 8,
    }}
  >
    <UnknownIcon />
  </div>
);
