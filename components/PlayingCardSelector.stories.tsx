import "antd/dist/antd.css";
import * as React from "react";
import PlayingCardSelector from "./PlayingCardSelector";

export default {
  title: "PlayingCardSelector",
  component: PlayingCardSelector
};

export const example = () => (
  <div style={{ padding: 192 }}>
    <PlayingCardSelector>
      <span
        style={{
          display: "inline-block",
          width: 16,
          height: 16,
          background: "blue"
        }}
      />
    </PlayingCardSelector>
  </div>
);

export const atTopEdge = () => (
  <div style={{ padding: "0 192px 192px 192px", textAlign: "right" }}>
    <PlayingCardSelector>
      <span
        style={{
          display: "inline-block",
          width: 16,
          height: 16,
          background: "blue"
        }}
      />
    </PlayingCardSelector>
  </div>
);

export const atRightEdge = () => (
  <div style={{ padding: "192px 0", textAlign: "right" }}>
    <PlayingCardSelector>
      <span
        style={{
          display: "inline-block",
          width: 16,
          height: 16,
          background: "blue"
        }}
      />
    </PlayingCardSelector>
  </div>
);
