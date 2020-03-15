import * as React from "react";
import styled from "styled-components";
import Card from "./Card";
import LikeIcon from "./LikeIcon";
import PlayingCard from "./PlayingCard";
import { MOBILE_MEDIA } from "../constants/mediaquery";
import Post from "../models/Post";
import Round from "../models/Round";
import GameSituation from "../models/GameSituation";
import getAgoByDate from "../utilities/getAgoByDate";
import getPositionByPlayerAndIndex from "../utilities/getPositionByPlayerAndIndex";
import getSIMetricPrefixData from "../utilities/getSIMetricPrefixData";

interface Props extends React.Attributes {
  isRecentPost: boolean;
  post: Post;
  onClick?: () => void;
  className?: string;
  style?: React.CSSProperties;
}

export default function PostCardListItem({
  isRecentPost,
  post,
  onClick,
  ...props
}: Props) {
  const { heroIndex, playerCards } = post.gameSituation;
  const { left, right } = playerCards[heroIndex];
  const [nAgo, mobileTerm, term] = getAgoByDate(
    isRecentPost ? post.createdAt : post.lastUpdatedAt
  );

  return (
    <PostCard hoverable style={{ padding: 0 }} onClick={onClick} {...props}>
      <div>
        <PlayerHand>
          <HandCard suit={left.suit} rank={left.rank} />
          <HandCard suit={right.suit} rank={right.rank} />
        </PlayerHand>
      </div>
      <div>
        <PostTitle>{post.title}</PostTitle>
      </div>
      <LikeArea>
        <LikeIcon style={{ width: 25, height: 25, margin: "4px" }} />
        {post.likes}
      </LikeArea>
      <Attributes>
        <AttributeTitle>PLAY AT</AttributeTitle>
        <AttributeTitle>ENDED AT</AttributeTitle>
        <AttributeTitle>FINAL POT</AttributeTitle>
        <AttributeTitle>
          {isRecentPost ? "POSTED" : "Last Update"}
        </AttributeTitle>
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
      </Attributes>
    </PostCard>
  );
}

const PostCard = styled(Card)`
  display: grid;
  max-width: 496px;
  grid-template-columns: 1fr 4fr;
  grid-template-rows: 1.5fr 1fr;
  column-gap: 8px;
  row-gap: 8px;
`;

const HandCard = styled(PlayingCard)`
  position: absolute;
  width: 40%;

  &:first-child {
    top: 15%;
    left 16%;

    transform: rotate(-15deg);
    -moz-transform: rotate(-15deg);
    -webkit-transform: rotate(-15deg);
  }

  &:last-child {
    top: 15%;
    right 16%;

    transform: rotate(15deg);
    -moz-transform: rotate(15deg);
    -webkit-transform: rotate(15deg);
  }
`;

const PlayerHand = styled.div`
  height: 100%;
  min-width: 72px;
  text-align: center;
  background-color: #f5f6f7;
  border-radius: 4px 0 4px 0;
  padding-top: 8px;

  position: relative;
`;

const PostTitle = styled.h2`
  margin: 8px 8px 0 0;
  line-height: 1.2;

  ${MOBILE_MEDIA} {
    font-weight: 400;
  }
`;

const LikeArea = styled.div`
  margin: 0 0 8px 8px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Attributes = styled.div`
  margin: 0 8px 8px 0;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  column-gap: 4px;
  row-gap: 4px;
`;

const AttributeTitle = styled.h5`
  margin: 0;
  font-size: 14px;
  color: #595959;
  font-weight: normal;

  ${MOBILE_MEDIA} {
    font-size: 12px;
  }
`;
const AttributeValue = styled.p`
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
