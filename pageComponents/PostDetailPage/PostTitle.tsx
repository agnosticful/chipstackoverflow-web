import * as React from "react";
import ContentLoader from "react-content-loader";
import styled from "styled-components";
import usePost from "@@/hooks/usePost";
import { PostId } from "@@/models/Post";

interface Props extends React.Attributes {
  postId: PostId;
  className?: string;
  style?: React.CSSProperties;
}

export default function PostTitle({ postId, ...props }: Props) {
  const { post, isLoading } = usePost({ postId });

  if (isLoading) {
    return (
      <Loader {...props}>
        <rect />
      </Loader>
    );
  }

  if (!post) {
    // while isPostLoading=false, post should not be null.
    throw new Error("You shouldn't reach here.");
  }

  return <Root {...props}>{post.title}</Root>;
}

const Root = styled.h1`
  margin: 0;
  color: #0f151c;
  font-size: 40px;
  overflow-wrap: break-word;
`;

const Loader = styled(ContentLoader)`
  width: 100%;
  height: 40px;

  rect {
    width: 70%;
    height: 40px;
  }
`;
