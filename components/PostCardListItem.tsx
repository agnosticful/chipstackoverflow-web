import * as React from "react";
import styled from "styled-components";
import Card from "./Card";
import LikeIcon from "./LikeIcon";
import PlayingCard from "./PlayingCard";
import { MOBILE_MEDIA } from "../constants/mediaquery";
import Post from "../models/Post";
import Round from "../models/Round";
import getAgoByDate from "../utilities/getAgoByDate";
import getPositionByPlayerAndIndex from "../utilities/getPositionByPlayerAndIndex";
import getSIMetricPrefixData from "../utilities/getSIMetricPrefixData";
import GameSituation from "../models/GameSituation";
import { Suit, Rank } from "../models/PlayingCard";

interface Props extends React.Attributes {
  isRecentPost: boolean;
  post: Post;
  onClick?: () => void;
}

export default function PostCardListItem({
  isRecentPost,
  post,
  onClick,
  ...props
}: Props) {
  //   const { heroIndex, playerCards } = post.gameSituation;
  //   const { left, right } = playerCards[heroIndex];
  return (
    <PostCard
      hoverable
      style={{ maxWidth: "496px" }}
      onClick={onClick}
      {...props}
    >
      <div>
        <PlayerHand>
          {/* <PlayingCard suit={left.suit} rank={left.rank} style={{ width: '40%', margin: '2px' }} />
            <PlayingCard suit={right.suit} rank={right.rank} style={{ width: '40%', margin: '2px' }} /> */}
          <PlayingCard
            suit={Suit.diamond}
            rank={Rank.seven}
            style={{ width: "40%", margin: "2px" }}
          />
          <PlayingCard
            suit={Suit.diamond}
            rank={Rank.eight}
            style={{ width: "40%", margin: "2px" }}
          />
        </PlayerHand>
      </div>
      <div>
        <PostTitle>{post.title}</PostTitle>
      </div>
      <LikeArea>
        <LikeIcon
          color="gray"
          style={{ width: 25, height: 25, margin: "4px" }}
        />
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
          {/* getPositionByPlayerAndIndex(post.gameSituation.playerLength, post.gameSituation.heroIndex) */}
          {getPositionByPlayerAndIndex(
            post.gameSituation.players,
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
          {isRecentPost
            ? getAgoByDate(post.createdAt)
            : getAgoByDate(post.lastUpdatedAt)}
        </AttributeValue>
      </Attributes>
    </PostCard>
  );
}

const PostCard = styled(Card)`
  display: grid;
  grid-template-columns: 1fr 4fr;
  grid-template-rows: 1.5fr 1fr;
  column-gap: 8px;
  row-gap: 8px;
`;

const PlayerHand = styled.div`
  height: 100%;
  min-width: 72px;
  text-align: center;
`;

const PostTitle = styled.h2`
  margin: 0;
  line-height: 1.2;

  ${MOBILE_MEDIA} {
    font-weight: 400;
  }
`;

const LikeArea = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Attributes = styled.div`
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
