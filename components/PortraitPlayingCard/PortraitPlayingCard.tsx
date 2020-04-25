import * as React from "react";
import styled from "styled-components";
import { CARD_BACKGROUND, CARD_DARK_BACKGROUND } from "../../constants/color";
import { Rank, Suit } from "../../models/PlayingCard";
import { RankIcon, SuitIcon, UnknownIcon } from "../PlayingCardIcon";

interface Props extends React.Attributes {
  /**
   * The card's suit to show. Shows no suit if it's omitted.
   */
  suit?: Suit;
  /**
   * The card's rank to show. Shows no rank if it's omitted.
   */
  rank?: Rank;
  className?: string;
  style?: React.CSSProperties;
}

/**
 * A React component represents a playing card.
 */
export default function PlayingCard({ suit, rank, ...props }: Props) {
  return (
    <Root {...props}>
      <Spanner />
      {rank === undefined && suit === undefined ? <_UnknownIcon /> : null}
      {rank === undefined ? null : <_RankIcon rank={rank} suit={suit} />}
      {suit === undefined ? null : <_SuitIcon suit={suit} />}
    </Root>
  );
}

const Root = styled.span`
  box-sizing: border-box;
  position: relative;
  display: inline-block;
  width: 64px;
  background: ${CARD_BACKGROUND};
  border-radius: 15%/9.642857143%;

  @media (prefers-color-scheme: dark) {
    background: ${CARD_DARK_BACKGROUND};
  }
`;

const Spanner = styled.div`
  width: 100%;
  padding-top: calc((100% + 2px) / 2.25 * 3.5 - 2px);
`;

const _RankIcon = styled(RankIcon)`
  position: absolute;
  top: 10%;
  left: 50%;
  width: 55%;
  transform: translateX(-50%);
`;

const _SuitIcon = styled(SuitIcon)`
  position: absolute;
  bottom: 8%;
  left: 50%;
  width: 60%;
  transform: translateX(-50%);
`;

const _UnknownIcon = styled(UnknownIcon)`
  position: absolute;
  top: 50%;
  left: 50%;
  width: 60%;
  color: #c8d6e5;
  transform: translate(-50%, -50%);
`;
