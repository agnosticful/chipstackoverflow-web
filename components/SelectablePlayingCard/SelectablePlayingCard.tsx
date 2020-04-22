import * as React from "react";
import styled from "styled-components";
import { Rank, Suit } from "../../models/PlayingCard";
import { PlusIcon } from "../Icon";
import PortraitPlayingCard from "../PortraitPlayingCard";
import PlayingCardSelector from "../PlayingCardSelector";

interface Props extends React.Attributes {
  initialRank?: Rank;
  initialSuit?: Suit;
  onChange?: (value: { rank: Rank; suit: Suit }) => void;
  className?: string;
  style?: React.CSSProperties;
}

export default function SelectablePlayingCard({
  initialRank,
  initialSuit,
  onChange = () => undefined,
  ...props
}: Props) {
  const [rank, setRank] = React.useState(initialRank);
  const [suit, setSuit] = React.useState(initialSuit);
  const isEmpty = rank === undefined && suit === undefined;

  return (
    <PlayingCardSelector
      initialRank={rank}
      initialSuit={suit}
      onChange={({ rank, suit }) => {
        setRank(rank);
        setSuit(suit);
        onChange({ rank, suit });
      }}
    >
      <Wrapper empty={isEmpty}>
        <_PlayingCard rank={rank} suit={suit} {...props} />

        {isEmpty ? <_PlusIcon /> : null}
      </Wrapper>
    </PlayingCardSelector>
  );
}

const Wrapper = styled.button<{ empty: boolean }>`
  display: inline-block;
  position: relative;
  padding: 0;
  border: 1px #c8d6e5 solid;
  border-radius: 15%/9.642857143%;
  background-color: transparent;
  box-shadow: 0px 0px 10px #222f3e1f, 0px 10px 20px #222f3e0f;
  outline: none;
  color: #c8d6e5;
  cursor: pointer;
  transition: border 200ms ease, box-shadow 200ms ease, color 200ms ease,
    transform 200ms ease;
  overflow: hidden;

  :hover,
  :focus {
    border-color: #0f151c;
    box-shadow: 0px 0px 10px #222f3e3f, 0px 10px 20px #222f3e1f;
    color: #0f151c;
    transform: translate3d(0px, -2px, 0px);
  }
`;

const _PlayingCard = styled(PortraitPlayingCard)`
  margin: -1px;
  background-color: transparent;
  vertical-align: top;
`;

const _PlusIcon = styled(PlusIcon)`
  position: absolute;
  top: calc(50% - 12px);
  left: calc(50% - 12px);
  width: 24px;
  height: 24px;
  z-index: 1;
`;
