import * as React from "react";
import styled from "styled-components";
import { Rank, Suit } from "../../models/PlayingCard";
import PlayingCard from "../PlayingCard";
import PlayingCardSelector from "../PlayingCardSelector";
import { CARD_BACKGROUND } from "../../constants/color";

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
      <Wrapper>
        <_PlayingCard rank={rank} suit={suit} {...props} />
      </Wrapper>
    </PlayingCardSelector>
  );
}

const _PlayingCard = styled(PlayingCard)`
  margin: -1px;
  vertical-align: top;
`;

const Wrapper = styled.button`
  display: inline-block;
  position: relative;
  padding: 0;
  border: 1px ${CARD_BACKGROUND} solid;
  border-radius: 15%/9.642857143%;
  background: transparent;
  box-shadow: 0px 0px 10px #222f3e1f, 0px 10px 20px #222f3e0f;
  outline: none;
  cursor: pointer;
  transition: border 200ms ease, box-shadow 200ms ease, transform 200ms ease;
  overflow: hidden;

  :hover,
  :focus {
    border-color: #f53333;
    box-shadow: 0px 0px 10px #222f3e3f, 0px 10px 20px #222f3e1f;
    transform: translate3d(0px, -2px, 0px);
  }
`;
