import { formatDistanceStrict } from "date-fns";
import Link from "next/link";
import numeral from "numeral";
import * as React from "react";
import styled from "styled-components";
import { ThumbsUpIcon } from "@@/components/Icon";
import LandscapePlayingCard from "@@/components/LandscapePlayingCard";
import PortraitPlayingCard from "@@/components/PortraitPlayingCard";
import { PostMinimum } from "@@/models/Post";
import getPositionByPlayerAndIndex from "@@/utilities/getPositionByPlayerAndIndex";

interface Props extends React.Attributes {
  post: PostMinimum;
  onClick?: React.MouseEventHandler;
  className?: string;
  style?: React.CSSProperties;
}

/**
 * Write a description here.
 */
export default function PostTableRow({
  post,
  onClick = () => {},
  ...props
}: Props) {
  return (
    <Link href="/posts/abc">
      <Root
        tabIndex={0}
        onClick={(e) => {
          onClick(e);

          e.currentTarget.blur();
        }}
        {...props}
      >
        <HeroCards>
          <LandscapePlayingCard
            rank={post.hand.playerCards.get(post.heroIndex)![0].rank}
            suit={post.hand.playerCards.get(post.heroIndex)![0].suit}
          />
          <LandscapePlayingCard
            rank={post.hand.playerCards.get(post.heroIndex)![1].rank}
            suit={post.hand.playerCards.get(post.heroIndex)![1].suit}
          />
        </HeroCards>

        <Title>{post.title}</Title>

        <Likes>
          <LikeIcon />

          <LikeCount>
            {post.likes >= 1000
              ? numeral(post.likes).format("0.0a")
              : post.likes}
          </LikeCount>
        </Likes>

        <CommunityCards>
          {Array.from({ length: 5 }, (_, i) => (
            <PortraitPlayingCard
              rank={post.hand.communityCards[i]?.rank}
              suit={post.hand.communityCards[i]?.suit}
              key={i}
            />
          ))}
        </CommunityCards>

        <HeroPosition>
          {getPositionByPlayerAndIndex(post.hand.playerLength, post.heroIndex)}
        </HeroPosition>

        <FinalPotSize>
          {numeral(post.hand.finalPotSize).format("0.0a")} BB
        </FinalPotSize>

        <CreationDate>
          {formatDistanceStrict(post.createdAt, new Date())} ago
        </CreationDate>
      </Root>
    </Link>
  );
}

const Root = styled.a`
  display: inline-grid;
  min-width: 100%;
  grid-template-columns: var(--grid-template-columns);
  grid-template-areas: var(--grid-template-areas);
  align-items: center;
  column-gap: var(--column-gap);
  padding: 8px var(--column-gap);
  text-decoration: none;
  cursor: pointer;

  &:hover {
    background-color: #f7f7f7;
  }

  &:focus {
    outline: none;
    background-color: #f7f7f7;
  }
`;

const HeroCards = styled.div`
  grid-area: hero-cards;
  display: flex;

  & > *:nth-of-type(n + 2) {
    margin-left: calc(var(--column-gap) / 3);
  }
`;

const Title = styled.div`
  grid-area: title;
  color: #0f151c;
  font-size: calc(var(--cell-font-size) * 1.125);
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow-x: hidden;
`;

const Likes = styled.div`
  grid-area: likes;
  display: flex;
  align-items: center;
  color: #576574;
  font-size: var(--cell-font-size);
`;

const LikeIcon = styled(ThumbsUpIcon)`
  width: calc(var(--cell-font-size) * 1.25);
  height: calc(var(--cell-font-size) * 1.25);
`;

const LikeCount = styled.span`
  display: inline-block;
  margin-left: 4px;
  color: #576574;
  font-size: var(--cell-font-size);
`;

const CommunityCards = styled.div`
  grid-area: community-cards;
  display: flex;
  justify-content: flex-start;

  & > * {
    &:nth-of-type(n + 2) {
      margin-left: calc(var(--column-gap) / 6);
    }
  }
`;

const HeroPosition = styled.div`
  grid-area: hero-position;
  color: #576574;
  font-size: var(--cell-font-size);
`;

const FinalPotSize = styled.div`
  grid-area: final-pot-size;
  color: #576574;
  font-size: var(--cell-font-size);
`;

const CreationDate = styled.div`
  grid-area: creation-date;
  color: #576574;
  font-size: var(--cell-font-size);
`;
