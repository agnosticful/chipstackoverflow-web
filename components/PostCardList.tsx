import * as React from "react";
import styled from "styled-components";
import Post from "../models/Post";
import Round from "../models/Round";
import { Rank, Suit } from "../models/PlayingCard";
import PostCardListItem from "./PostCardListItem";
import getFinalPodOfTheGame from "../utilities/getFinalPodOfTheGame";
import getPositionByPlayerAndIndex from "../utilities/getPositionByPlayerAndIndex";

interface Props {
  posts: Post[];
  handleClick: (id: string) => void;
}

export default function PostCardList({ posts, handleClick }: Props) {
  return (
    <PostCardListGrid>
      {posts.map(({ id, title, likes, createdAt, gameSituation }) => (
        <PostCardListItem
          key={id}
          hand={[
            { rank: Rank.king, suit: Suit.spade },
            { rank: Rank.king, suit: Suit.heart }
          ]} // TODO
          title={title}
          likes={likes}
          playAt={getPositionByPlayerAndIndex(
            gameSituation.players,
            gameSituation.heroIndex
          )}
          endedAt={
            gameSituation.river
              ? Round.RIVER
              : gameSituation.turn
              ? Round.TURN
              : gameSituation.flop
              ? Round.FLOP
              : Round.PREFLOP
          }
          finalPod={getFinalPodOfTheGame(gameSituation)}
          posted={createdAt}
          isRecentPost
          onClick={() => {
            handleClick(id);
          }}
        />
      ))}
    </PostCardListGrid>
  );
}

const PostCardListGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 500px);
  gap: 16px;

  @media (max-width: 800px) {
    grid-template-columns: repeat(1, 1fr);
  }
`;
