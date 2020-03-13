import * as React from "react";
import styled from "styled-components";
import { CARD_BACKGROUND, CARD_DARK_BACKGROUND } from "../constants/color";
import { Rank, Suit } from "../models/PlayingCard";
import RankIcon from "./RankIcon";
import SuitIcon from "./SuitIcon";

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
}

/**
 * A React component represents a playing card.
 */
export default function PlayingCard({ suit, rank, ...props }: Props) {
  return (
    <Root {...props}>
      <Spanner />
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
  left: 22.5%;
  width: 55%;
`;

const _SuitIcon = styled(SuitIcon)`
  position: absolute;
  bottom: 8%;
  left: 20%;
  width: 60%;
`;
