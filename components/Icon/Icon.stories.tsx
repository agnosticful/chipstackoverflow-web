import styled from "styled-components";
import * as React from "react";
import { ChevronDown, Send, SignOutIcon, ThumbsDown, ThumbsUp } from "./Icon";

export default {
  title: "Icon",
  component: Send
};

export const example = () => (
  <Catalog>
    <ChevronDown />

    <Send />

    <SignOutIcon />

    <ThumbsDown />

    <ThumbsUp />
  </Catalog>
);

export const withColor = () => {
  const [isActive, setActive] = React.useState(false);

  return (
    <div>
      <ThumbsUp style={{ color: "#1dd1a1" }} />

      <div
        onClick={() => setActive(!isActive)}
        style={{
          display: "flex",
          alignItems: "center",
          color: isActive ? "#ff6b6b" : "#0f151c",
          transition: "color 200ms ease",
          cursor: "pointer"
        }}
      >
        {"Click to change "}

        <ThumbsDown />
      </div>
    </div>
  );
};

const Catalog = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, 24px);
  column-gap: 16px;
  row-gap: 16px;
`;
