import * as React from "react";
import styled from "styled-components";
import { Rank, Suit } from "../models/PlayingCard";
import Position from "../models/Position";
import Round from "../models/Round";
import PostCardListItem from "./PostCardListItem";

interface Props {
  postData: {
    id: string;
    hand: [
      {
        rank: Rank;
        suit: Suit;
      },
      {
        rank: Rank;
        suit: Suit;
      }
    ];
    title: string;
    likes: number;
    playAt: Position;
    endedAt: Round;
    finalPod: number;
    posted: Date;
  }[];
  handleClick: (id: string) => void;
}

const postCardList = ({ postData, handleClick }: Props) => {
  return (
    <PostCardListDiv>
      {postData.map(
        ({ id, hand, title, likes, playAt, endedAt, finalPod, posted }) => (
          <PostCardListItem
            key={id}
            hand={hand}
            title={title}
            likes={likes}
            playAt={playAt}
            endedAt={endedAt}
            finalPod={finalPod}
            posted={posted}
            isRecentPost
            onClick={() => {
              handleClick(id);
            }}
          />
        )
      )}
    </PostCardListDiv>
  );
};

const PostCardListDiv = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 500px);
  gap: 16px;

  @media (max-width: 800px) {
    grid-template-columns: repeat(1, 1fr);
  }
`;

export default postCardList;
