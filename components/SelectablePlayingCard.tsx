import { Button } from "antd";
import * as React from "react";
import styled from "styled-components";
import PlayingCardSelector from "./PlayingCardSelector";
import PlayingCard from "./PlayingCard";
import { Rank, Suit } from "../models/PlayingCard";

interface Props extends React.Attributes {
  initialRank?: Rank;
  initialSuit?: Suit;
  onChange?: (value: { rank: Rank; suit: Suit }) => void;
  className?: string;
  style?: React.CSSProperties;
}

export default function SelectablePlayingCard({
  initialRank = Rank.ace,
  initialSuit = Suit.spade,
  onChange = () => undefined,
  ...props
}: Props) {
  const [{ rank, suit }, setPlayingCard] = React.useState({
    rank: initialRank,
    suit: initialSuit
  });

  return (
    <PlayingCardSelector
      initialRank={rank}
      initialSuit={suit}
      onChange={({ rank, suit }) => {
        setPlayingCard({ rank, suit });
        onChange({ rank, suit });
      }}
    >
      <Wrapper>
        <_PlayingCard rank={rank} suit={suit} {...props} />
        <_Button />
      </Wrapper>
    </PlayingCardSelector>
  );
}

const _PlayingCard = styled(PlayingCard)`
  vertical-align: top;
`;

const Wrapper = styled.span`
  display: inline-block;
  position: relative;
  cursor: pointer;
`;

const _Button = styled(Button)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
  border-radius: 15%/9.642857143%;
  background: transparent;

  :hover {
    background: transparent;
  }
`;
