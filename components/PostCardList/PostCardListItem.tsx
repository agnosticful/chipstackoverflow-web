import * as React from "react";
import styled from "styled-components";
import { MOBILE_MEDIA } from "../../constants/mediaquery";
import Post from "../../models/Post";
// import calculateFinalPot from '../../utilities/calculateFinalPot';
// import getPositionByPlayerAndIndex from '../../utilities/getPositionByPlayerAndIndex';
// import getRelativeDateString, {getRelativeDateShortString} from '../../utilities/getRelativeDateString';
// import getSIMetricPrefixData from '../../utilities/getSIMetricPrefixData';
import Card from "../Card";
import { ThumbsUpIcon } from "../Icon";
import PlayingCard from "../PlayingCard";
import PostTypeContext, { PostType } from "./PostTypeContext";

interface Props extends React.Attributes {
  post: Post;
  onClick?: React.MouseEventHandler<HTMLElement>;
  className?: string;
  style?: React.CSSProperties;
}

export default function PostCardListItem({ post, ...props }: Props) {
  const { heroIndex, playerCards } = post.gameSituation;
  const { left, right } = playerCards[heroIndex]!;
  const postType = React.useContext(PostTypeContext);

  return (
    <Root {...props}>
      <PlayerHandArea>
        <PlayerHandAreaBackGround />
        <HandCard suit={left.suit} rank={left.rank} />
        <HandCard suit={right.suit} rank={right.rank} />
      </PlayerHandArea>

      <PostTitle>{post.title}</PostTitle>

      <LikeArea>
        <ThumbsUpIcon />
        {post.likes}
      </LikeArea>

      <Attributes>
        <Attribute>
          <h5>Play at</h5>
          {/* <span>{getPositionByPlayerAndIndex(post.gameSituation.playerLength, post.gameSituation.heroIndex)}</span> */}
          <span>UTG</span>
        </Attribute>

        <Attribute>
          <h5>Ended at</h5>
          <span>
            {post.gameSituation.river
              ? EndedStreet.river
              : post.gameSituation.turn
              ? EndedStreet.turn
              : post.gameSituation.flop
              ? EndedStreet.flop
              : EndedStreet.preflop}
          </span>
        </Attribute>

        <Attribute>
          <h5>Final Pod</h5>
          {/* <span>{`${getSIMetricPrefixData(calculateFinalPot(post.gameSituation))} BB`}</span> */}
          <span>{`1.1 BB`}</span>
        </Attribute>

        <Attribute>
          <h5>{postType === PostType.recent ? "Posted" : "Last Update"}</h5>
          <span>
            {/* <DateUnit>{postType === PostType.recent ? getRelativeDateString(post.createdAt) : getRelativeDateString(post.lastUpdatedAt)}</DateUnit>
            <DateUnitInMobile>{postType === PostType.recent ? getRelativeDateShortString(post.createdAt) : getRelativeDateShortString(post.lastUpdatedAt)}</DateUnitInMobile> */}
            <DateUnit>1 minute</DateUnit>
            <DateUnitInMobile>1 min</DateUnitInMobile>
            &nbsp;ago
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
    "likes attributes";
  row-gap: 4px;
  column-gap: 8px;
`;

const PlayerHandArea = styled.div`
  grid-area: playing-cards;
  position: relative;
  width: 100%;
  border-radius: 4px 0 4px 0;

  &: before {
    content: "";
    display: block;
    padding-top: 100%;
    background-color: #f5f6f7;
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
  }

  &:last-of-type {
    top: 15%;
    right 16%;
    transform: rotate(15deg);
  }
`;

const PostTitle = styled.h2`
  grid-area: title;
  font-size: 1.3em;
  margin: 8px 8px 0 0;
  line-height: 1.5;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  overflow: hidden;
`;

const LikeArea = styled.div`
  grid-area: likes;
  display: flex;
  margin: 0 0 8px 8px;
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
  margin: 0 8px 8px 0;
`;

const Attribute = styled.div`
  & > h5 {
    margin: 0 0 4px 0;
    font-size: 14px;
    color: #595959;
    font-weight: normal;
  }

  & > span {
    margin: 0;
    font-size: 14px;
    color: #595959;
    font-weight: normal;
  }

  ${MOBILE_MEDIA} {
    & > h5 {
      font-size: 12px;
    }

    & > span {
      font-size: 12px;
    }
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

enum EndedStreet {
  preflop = "PREFLOP",
  flop = "FLOP",
  turn = "TURN",
  river = "RIVER"
}
