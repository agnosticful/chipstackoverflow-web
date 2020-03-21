import * as React from "react";
import styled from "styled-components";
import { MOBILE_MEDIA } from "../../constants/mediaquery";
import Post from "../../models/Post";
import calculateFinalPot from "../../utilities/calculateFinalPot";
import getAgoByDate from "../../utilities/getRelativeDateString";
import getPositionByPlayerAndIndex from "../../utilities/getPositionByPlayerAndIndex";
import getSIMetricPrefixData from "../../utilities/getSIMetricPrefixData";
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
  const [nAgo, mobileTerm, term] = getAgoByDate(
    postType === PostType.recent ? post.createdAt : post.lastUpdatedAt
  );

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
          <span>
            {post.gameSituation.river
              ? Street.river
              : post.gameSituation.turn
              ? Street.turn
              : post.gameSituation.flop
              ? Street.flop
              : Street.preflop}
          </span>
        </Attribute>

        <Attribute>
          <h5>Ended at</h5>
          <span>
            {getPositionByPlayerAndIndex(
              post.gameSituation.playerLength,
              post.gameSituation.heroIndex
            )}
          </span>
        </Attribute>

        <Attribute>
          <h5>Final Pod</h5>
          <span>{`${getSIMetricPrefixData(
            calculateFinalPot(post.gameSituation)
          )} BB`}</span>
        </Attribute>

        <Attribute>
          <h5>{postType === PostType.recent ? "Posted" : "Last Update"}</h5>
          <span>
            {nAgo}
            <MobileTermSpan>{mobileTerm}</MobileTermSpan>
            <TermSpan>{term}</TermSpan>
            &nbsp;ago
          </span>
        </Attribute>
      </Attributes>
    </Root>
  );
}

const Root = styled(Card)`
  display: grid;
  // max-width: 440px; // TODO
  grid-template-rows: 2fr 1fr;
  grid-template-columns: 1.3fr 3.7fr;
  grid-template-areas:
    "playinghand-area title-area"
    "likes-area attributes-area";
  row-gap: 4px;
  column-gap: 8px;
`;

const PlayerHandArea = styled.div`
  grid-area: playinghand-area;
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
  }

  &:last-of-type {
    top: 15%;
    right 16%;
    transform: rotate(15deg);
  }
`;

const PostTitle = styled.h2`
  grid-area: title-area;
  font-size: 1.3em;
  margin: 8px 8px 8px 0;
  line-height: 1.5;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  overflow: hidden;

  ${MOBILE_MEDIA} {
    font-weight: 400;
    line-height: 1.2;
  }
`;

const LikeArea = styled.div`
  grid-area: likes-area;
  display: flex;
  margin: 0 0 8px 8px;
  justify-content: center;
  align-items: center;

  & > svg {
    margin: 4px;
  }
`;

const Attributes = styled.div`
  grid-area: attributes-area;
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

enum Street {
  preflop = "PREFLOP",
  flop = "FLOP",
  turn = "TURN",
  river = "RIVER"
}
