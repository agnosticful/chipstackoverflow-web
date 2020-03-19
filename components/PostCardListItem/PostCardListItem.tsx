import * as React from "react";
import styled from "styled-components";
import { MOBILE_MEDIA } from "../../constants/mediaquery";
import Post from "../../models/Post";
import Round from "../../models/Round";
import GameSituation from "../../models/GameSituation";
import getAgoByDate from "../../utilities/getAgoByDate";
import getPositionByPlayerAndIndex from "../../utilities/getPositionByPlayerAndIndex";
import getSIMetricPrefixData from "../../utilities/getSIMetricPrefixData";
import Card from "../Card";
import { LikeIcon } from "../Icon";
import PlayingCard from "../PlayingCard";

interface Props extends React.Attributes {
  isRecentPost: boolean;
  post: Post;
  onClick?: React.MouseEventHandler<HTMLElement>;
  className?: string;
  style?: React.CSSProperties;
}

export default function PostCardListItem({
  isRecentPost,
  post,
  ...props
}: Props) {
  const { heroIndex, playerCards } = post.gameSituation;
  const { left, right } = playerCards[heroIndex]!;
  const [nAgo, mobileTerm, term] = getAgoByDate(
    isRecentPost ? post.createdAt : post.lastUpdatedAt
  );

  return (
    <PostCard {...props}>
      <PlayerHandArea>
        <PlayerHandAreaBackGround />
        <HandCard suit={left.suit} rank={left.rank} />
        <HandCard suit={right.suit} rank={right.rank} />
      </PlayerHandArea>
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

const PlayerHandArea = styled.div`
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
  margin: 8px 8px 0 0;
  line-height: 1.2;

  ${MOBILE_MEDIA} {
    font-weight: 400;
  }
`;

const LikeArea = styled.div`
  display: flex;
  margin: 0 0 8px 8px;
  justify-content: center;
  align-items: center;
`;

const Attributes = styled.div`
  display: grid;
  margin: 0 8px 8px 0;
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
