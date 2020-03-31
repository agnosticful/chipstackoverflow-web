import * as React from "react";
import styled from "styled-components";
import { MOBILE_MEDIA } from "../../constants/mediaquery";
import Post from "../../models/Post";
import calculateFinalPot from "../../utilities/calculateFinalPot";
import getPositionByPlayerAndIndex from "../../utilities/getPositionByPlayerAndIndex";
import {
  getRelativeDateString,
  getRelativeShortDateString
} from "../../utilities/getRelativeDateString";
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

      <Attributes>
        <Attribute>
          <Likes>
            <ThumbsUpIcon />
            {post.likes}
          </Likes>
        </Attribute>

        <Attribute>
          <span>Play at</span>
          <span>
            {getPositionByPlayerAndIndex(
              post.gameSituation.playerLength,
              post.gameSituation.heroIndex
            )}
          </span>
        </Attribute>

        <Attribute>
          <span>Ended at</span>
          <span>{gameEndedAt}</span>
        </Attribute>

        <Attribute>
          <span>Final Pot</span>
          <span>{`${getStringWithSIMetricSuffix(
            calculateFinalPot(post.gameSituation)
          )} BB`}</span>
        </Attribute>

        <Attribute>
          <span>{ShowLastUpdateDate ? "Last Update" : "Posted"}</span>
          <span>
            <DateUnit>
              {ShowLastUpdateDate
                ? `${getRelativeDateString(post.lastUpdatedAt)} ago`
                : `${getRelativeDateString(post.createdAt)} ago`}
            </DateUnit>
            <DateUnitInMobile>
              {ShowLastUpdateDate
                ? `${getRelativeShortDateString(post.lastUpdatedAt)} ago`
                : `${getRelativeShortDateString(post.createdAt)} ago`}
            </DateUnitInMobile>
          </span>
        </Attribute>
      </Attributes>
    </Root>
  );
}

const Root = styled(Card)`
  display: grid;
  grid-template-columns: minmax(15%, 100px) 1fr;
  grid-template-areas:
    "playing-cards title"
    "attributes attributes";
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

const Likes = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  & > svg {
    margin: 4px;
  }
`;

const Attributes = styled.div`
  grid-area: attributes;
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin-bottom: 8px;
  font-size: 14px;
  font-weight: normal;
  color: #595959;

  ${MOBILE_MEDIA} {
    font-size: 12px;
  }
`;

const Attribute = styled.div`
  & > span {
    display: block;
  }

  & > span:first-child {
    margin-bottom: 4px;
  }
`;

const DateUnitInMobile = styled.span`
  display: none;

  ${MOBILE_MEDIA} {
    display: inline;
  }
`;

const DateUnit = styled.span`
  display: inline;

  ${MOBILE_MEDIA} {
    display: none;
  }
`;
