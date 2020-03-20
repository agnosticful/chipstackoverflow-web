import * as React from "react";
import styled from "styled-components";
import { MOBILE_MEDIA } from "../../constants/mediaquery";
import Post from "../../models/Post";
import GameSituation from "../../models/GameSituation";
import getAgoByDate from "../../utilities/getAgoByDate";
import getPositionByPlayerAndIndex from "../../utilities/getPositionByPlayerAndIndex";
import getSIMetricPrefixData from "../../utilities/getSIMetricPrefixData";
import Card from "../Card";
import { ThumbsUpIcon } from "../Icon";
import PlayingCard from "../PlayingCard";

interface Props extends React.Attributes {
  post: Post;
  recent?: boolean;
  onClick?: React.MouseEventHandler<HTMLElement>;
  className?: string;
  style?: React.CSSProperties;
}

export default function PostCardListItem({
  recent = false,
  post,
  ...props
}: Props) {
  const { heroIndex, playerCards } = post.gameSituation;
  const { left, right } = playerCards[heroIndex]!;
  const [nAgo, mobileTerm, term] = getAgoByDate(
    recent ? post.createdAt : post.lastUpdatedAt
  );

  return (
    <Root {...props}>
      <PlayerHandArea>
        <PlayerHandAreaBackGround />
        <HandCard suit={left.suit} rank={left.rank} />
        <HandCard suit={right.suit} rank={right.rank} />
      </PlayerHandArea>
      <PostTitle>
        {post.title.length <= 65
          ? post.title
          : `${post.title.substring(0, 63)}...`}
      </PostTitle>
      <LikeArea>
        <ThumbsUpIcon />
        {post.likes}
      </LikeArea>
      <AttributeTitle>Play at</AttributeTitle>
      <AttributeTitle>Ended at</AttributeTitle>
      <AttributeTitle>Final Pod</AttributeTitle>
      <AttributeTitle>{recent ? "Posted" : "Last Update"}</AttributeTitle>
      <AttributeValue>
        {getPositionByPlayerAndIndex(
          post.gameSituation.playerLength,
          post.gameSituation.heroIndex
        )}
      </AttributeValue>
      <AttributeValue>
        {post.gameSituation.river
          ? Round.RIVER
          : post.gameSituation.turn
          ? Round.TURN
          : post.gameSituation.flop
          ? Round.FLOP
          : Round.PREFLOP}
      </AttributeValue>
      <AttributeValue>{`${getSIMetricPrefixData(
        getFinalPodOfTheGame(post.gameSituation)
      )} BB`}</AttributeValue>
      <AttributeValue>
        {nAgo}
        <MobileTermSpan>{mobileTerm}</MobileTermSpan>
        <TermSpan>{term}</TermSpan>
        &nbsp;ago
      </AttributeValue>
    </Root>
  );
}

const Root = styled(Card)`
  display: grid;
  max-width: 440px;
  grid-template-rows: 1fr 0.25fr 0.25fr;
  grid-template-columns: 1.3fr 0.7fr 0.9fr 0.9fr 1.2fr;
  row-gap: 4px;
  column-gap: 8px;
`;

const PlayerHandArea = styled.div`
  grid-row: 1 / 2;
  grid-column: 1 / 2;
  position: relative;
  width: 100%;
  background-color: #f5f6f7;
  border-radius: 4px 0 4px 0;

  &: before {
    content: "";
    display: block;
    padding-top: 100%;
  }
`;

const PlayerHandAreaBackGround = styled.div`
  padding-top: 8px;
  position: absolute;
`;

const HandCard = styled(PlayingCard)`
  position: absolute;
  width: 40%;

  &:first-of-type {
    top: 15%;
    left 16%;
    transform: rotate(-15deg);
    -moz-transform: rotate(-15deg);
    -webkit-transform: rotate(-15deg);
  }

  &:last-of-type {
    top: 15%;
    right 16%;
    transform: rotate(15deg);
    -moz-transform: rotate(15deg);
    -webkit-transform: rotate(15deg);
  }
`;

const PostTitle = styled.h2`
  grid-row: 1 / 2;
  grid-column: 2 / 6;
  font-size: 1.3em;
  margin: 8px 8px 0 0;
  line-height: 1.4;

  ${MOBILE_MEDIA} {
    font-weight: 400;
    line-height: 1.2;
  }
`;

const LikeArea = styled.div`
  grid-row: 2 / 4;
  grid-column: 1 / 2;
  display: flex;
  margin: 0 0 8px 8px;
  justify-content: center;
  align-items: center;

  & > svg {
    margin: 4px;
  }
`;

const AttributeTitle = styled.h5`
  grid-row: 2 / 3;
  margin: 0;
  font-size: 14px;
  color: #595959;
  font-weight: normal;
  ${MOBILE_MEDIA} {
    font-size: 12px;
  }
`;

const AttributeValue = styled.p`
  grid-row: 3 / 4;
  margin: 0;
  font-size: 14px;
  color: #595959;
  font-weight: normal;
  ${MOBILE_MEDIA} {
    font-size: 12px;
  }
`;

const MobileTermSpan = styled.span`
  display: none;
  ${MOBILE_MEDIA} {
    display: inline;
  }
`;

const TermSpan = styled.span`
  display: inline;
  ${MOBILE_MEDIA} {
    display: none;
  }
`;

function getFinalPodOfTheGame(gameSituation: GameSituation): number {
  const preflopPod = gameSituation.preflop.actions.reduce(
    (sum, { betSize }) => sum + betSize,
    0
  );
  const flopPod = gameSituation.flop
    ? gameSituation.flop.actions.reduce((sum, { betSize }) => sum + betSize, 0)
    : 0;
  const turnPod = gameSituation.turn
    ? gameSituation.turn.actions.reduce((sum, { betSize }) => sum + betSize, 0)
    : 0;
  const riverPod = gameSituation.river
    ? gameSituation.river.actions.reduce((sum, { betSize }) => sum + betSize, 0)
    : 0;

  return preflopPod + flopPod + turnPod + riverPod;
}

enum Round {
  PREFLOP = "Preflop",
  FLOP = "FLOP",
  TURN = "TURN",
  RIVER = "RIVER"
}
