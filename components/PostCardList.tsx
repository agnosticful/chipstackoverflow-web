import * as React from "react";
import styled from "styled-components";
import Post from "../models/Post";
import PostCardListItem from "./PostCardListItem";

interface Props {
  posts: Post[];
  handleClick: (id: string) => void;
}

export default function PostCardList({ posts, handleClick }: Props) {
  return (
    <PostCardListGrid>
      {posts.map(post => (
        <PostCardListItem
          key={post.id}
          post={post}
          isRecentPost
          onClick={() => {
            handleClick(post.id);
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
