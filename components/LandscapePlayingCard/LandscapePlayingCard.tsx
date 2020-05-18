import * as React from "react";
import styled from "styled-components";
import { RankIcon, SuitIcon, UnknownIcon } from "@@/components/PlayingCardIcon";
import { CARD_BACKGROUND, CARD_DARK_BACKGROUND } from "@@/constants/color";
import Rank from "@@/models/Rank";
import Suit from "@@/models/Suit";

interface Props extends React.Attributes {
  /**
   * The card's rank to show. Shows no rank if it's omitted.
   */
  rank?: Rank;
  /**
   * The card's suit to show. Shows no suit if it's omitted.
   */
  suit?: Suit;
  className?: string;
  style?: React.CSSProperties;
}

/**
 * A React component represents a playing card.
 */
export default function LandscapePlayingCard({
  suit,
  rank,

  ...props
}: Props) {
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
  padding-top: calc((100% + 2px) / 4 * 3 - 2px);
`;

const _RankIcon = styled(RankIcon)`
  position: absolute;
  top: 50%;
  left: 8%;
  width: 40%;
  transform: translateY(-40%);
`;

const _SuitIcon = styled(SuitIcon)`
  position: absolute;
  top: 50%;
  right: 8%;
  width: 40%;
  transform: translateY(-50%);
`;

const _UnknownIcon = styled(UnknownIcon)`
  position: absolute;
  top: 50%;
  left: 50%;
  width: 40%;
  color: #c8d6e5;
  transform: translate(-50%, -50%);
`;
