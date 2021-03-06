import { formatDistanceStrict } from "date-fns";
import Numeral from "numeral";
import * as React from "react";
import styled, { css } from "styled-components";
import Card from "@@/components/Card";
import { ThumbsUpIcon } from "@@/components/Icon";
import PortraitPlayingCard from "@@/components/PortraitPlayingCard";
import { MOBILE_MEDIA } from "@@/constants/mediaquery";
import { PostMinimum } from "@@/models/Post";
import getPositionByPlayerAndIndex from "@@/utilities/getPositionByPlayerAndIndex";
import ShowLastUpdateDateContext from "./ShowLastUpdateDateContext";
import { HandStreet } from "@@/models/Hand";

interface Props extends React.Attributes {
  post: PostMinimum;
  onClick?: React.MouseEventHandler<HTMLElement>;
  className?: string;
  style?: React.CSSProperties;
}

export default function PostCardListItem({ post, ...props }: Props) {
  const ShowLastUpdateDate = React.useContext(ShowLastUpdateDateContext);
  const gameEndedAt = React.useMemo(() => {
    if (post.hand.lastStreet === HandStreet.river) return "RIVER";
    if (post.hand.lastStreet === HandStreet.turn) return "TURN";
    if (post.hand.lastStreet === HandStreet.flop) return "FLOP";

    return "PREFLOP";
  }, [post.hand]);

  return (
    <Root {...props}>
      <HeroHand>
        <HeroHandBackground />

        <HeroCard
          suit={post.hand.playerCards.get(post.heroIndex)![0].suit}
          rank={post.hand.playerCards.get(post.heroIndex)![0].rank}
        />
        <HeroCard
          suit={post.hand.playerCards.get(post.heroIndex)![1].suit}
          rank={post.hand.playerCards.get(post.heroIndex)![1].rank}
        />
      </HeroHand>

      <PostTitle>{post.title}</PostTitle>

      <GameDetail>
        <Likes>
          <ThumbsUpIcon />
          {post.likes}
        </Likes>

        <Attributes>
          <PlayAt>
            <span>Play at</span>
            <span>
              {getPositionByPlayerAndIndex(
                post.hand.playerLength,
                post.heroIndex
              )}
            </span>
          </PlayAt>

          <EndedAt>
            <span>Ended at</span>
            <span>{gameEndedAt}</span>
          </EndedAt>

          <FinalPot>
            <span>Final Pot</span>
            <span>{`${Numeral(post.hand.finalPotSize).format(
              "0.0a"
            )} BB`}</span>
          </FinalPot>

          <Posted>
            <span>{ShowLastUpdateDate ? "Last Update" : "Posted"}</span>
            <span>{`${getShortFormatDistanceStrict(
              ShowLastUpdateDate ? post.lastUpdatedAt : post.createdAt
            )} ago`}</span>
          </Posted>
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

const HeroCard = styled(PortraitPlayingCard)`
  position: absolute;
  width: 40%;
  top: 15%;

  & div {
    background-color: #fff;
  }

  &:first-of-type {
    left: 16%;
    transform: rotate(-15deg);
  }

  &:last-of-type {
    right: 16%;
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
  grid-template-columns: 1fr 4fr;
  grid-template-areas: "like attributes";
  margin: 0 8px 8px 8px;
  font-size: 14px;
  font-weight: normal;
  color: #595959;

  ${MOBILE_MEDIA} {
    font-size: 12px;
  }
`;

const Likes = styled.div`
  grid-area: like;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-left: 16px;

  & > svg {
    margin: 4px;
  }
`;

const Attributes = styled.div`
  grid-area: attributes;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-areas: "play-at ended-at final-pot posted";
  width: 100%;
`;

const AttributeCSS = css`
  & > span {
    display: block;
  }

  & > span:first-child {
    margin-bottom: 4px;
  }
`;

const PlayAt = styled.div`
  grid-area: play-at;

  ${AttributeCSS}
`;

const EndedAt = styled.div`
  grid-area: ended-at;

  ${AttributeCSS}
`;

const FinalPot = styled.div`
  grid-area: final-pot;

  ${AttributeCSS}
`;

const Posted = styled.div`
  grid-area: posted;

  ${AttributeCSS}
`;
