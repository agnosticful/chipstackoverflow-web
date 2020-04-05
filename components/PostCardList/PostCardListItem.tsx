import { formatDistanceStrict } from "date-fns";
import * as React from "react";
import styled from "styled-components";
import { MOBILE_MEDIA } from "../../constants/mediaquery";
import Post from "../../models/Post";
import calculateFinalPot from "../../utilities/calculateFinalPot";
import getPositionByPlayerAndIndex from "../../utilities/getPositionByPlayerAndIndex";
import getStringWithSIMetricSuffix from "../../utilities/getStringWithSIMetricSuffix";
import Card from "../Card";
import { ThumbsUpIcon } from "../Icon";
import PlayingCard from "../PlayingCard";
import ShowLastUpdateDateContext from "./ShowLastUpdateDateContext";

interface Props extends React.Attributes {
  post: Post;
  onClick?: React.MouseEventHandler<HTMLElement>;
  className?: string;
  style?: React.CSSProperties;
}

export default function PostCardListItem({ post, ...props }: Props) {
  const ShowLastUpdateDate = React.useContext(ShowLastUpdateDateContext);
  const gameEndedAt = React.useMemo(() => {
    if (post.gameSituation.river) return "RIVER";
    if (post.gameSituation.turn) return "TURN";
    if (post.gameSituation.flop) return "FLOP";

    return "PREFLOP";
  }, [post.gameSituation]);

  return (
    <Root {...props}>
      <HeroHand>
        <HeroHandBackground />
        <HeroCard
          suit={
            post.gameSituation.playerCards[post.gameSituation.heroIndex]!.left
              .suit
          }
          rank={
            post.gameSituation.playerCards[post.gameSituation.heroIndex]!.left
              .rank
          }
        />
        <HeroCard
          suit={
            post.gameSituation.playerCards[post.gameSituation.heroIndex]!.right
              .suit
          }
          rank={
            post.gameSituation.playerCards[post.gameSituation.heroIndex]!.right
              .rank
          }
        />
      </HeroHand>

      <PostTitle>{post.title}</PostTitle>

      <GameDetail>
        <Likes>
          <ThumbsUpIcon />
          {post.likes}
        </Likes>
        <Attributes>
          <Attribute>Play at</Attribute>
          <Attribute>Ended at</Attribute>
          <Attribute>Final Pot</Attribute>
          <Attribute>{ShowLastUpdateDate ? "Last Update" : "Posted"}</Attribute>

          <Attribute>
            {getPositionByPlayerAndIndex(
              post.gameSituation.playerLength,
              post.gameSituation.heroIndex
            )}
          </Attribute>
          <Attribute>{gameEndedAt}</Attribute>
          <Attribute>{`${getStringWithSIMetricSuffix(
            calculateFinalPot(post.gameSituation)
          )} BB`}</Attribute>
          <Attribute>{`${getShortFormatDistanceStrict(
            ShowLastUpdateDate ? post.lastUpdatedAt : post.createdAt
          )} ago`}</Attribute>
        </Attributes>
      </GameDetail>
    </Root>
  );
}

function getShortFormatDistanceStrict(date: Date) {
  const now = new Date();

  return formatDistanceStrict(date, now)
    .replace("second", "sec")
    .replace("minute", "min")
    .replace("hour", "hr")
    .replace("month", "mo")
    .replace("year", "yr");
}

const Root = styled(Card)`
  display: grid;
  grid-template-columns: minmax(15%, 100px) 1fr;
  grid-template-areas: "playing-cards title" "game-detail game-detail";
  grid-gap: 12px;
`;

const HeroHand = styled.div`
  grid-area: playing-cards;
  position: relative;
  width: 100%;

  &: before {
    content: "";
    display: block;
    padding-top: 100%;
    background-color: #f5f6f7;
    border-radius: 4px 0 4px 0;
  }
`;

const HeroHandBackground = styled.div`
  padding-top: 8px;
  position: absolute;
`;

const HeroCard = styled(PlayingCard)`
  position: absolute;
  width: 40%;
  top: 15%;

  & div {
    background-color: #fff;
  }

  &:first-of-type {
    left 16%;
    transform: rotate(-15deg);
  }

  &:last-of-type {
    right 16%;
    transform: rotate(15deg);
  }
`;

const PostTitle = styled.h2`
  grid-area: title;
  font-size: 1.3em;
  color: #0f151c;
  margin: 8px 8px 0 0;
  line-height: 1.5;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  overflow: hidden;
`;

const GameDetail = styled.div`
  grid-area: game-detail;
  display: grid;
  grid-template-columns: minmax(80px, 100px) 1fr;
  margin: 0 8px 8px 8px;
  font-size: 14px;
  font-weight: normal;
  color: #595959;

  ${MOBILE_MEDIA} {
    font-size: 12px;
  }
`;

const Likes = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-left: 16px;

  & > svg {
    margin: 4px;
  }
`;

const Attributes = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(2, 1fr);
  row-gap: 4px;
  width: 100%;
`;

const Attribute = styled.span`
  display: block;
`;
