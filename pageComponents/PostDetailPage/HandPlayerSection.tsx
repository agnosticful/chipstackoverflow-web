import * as React from "react";
import styled from "styled-components";
import HandPlayer from "@@/components/HandPlayer";
import HandPlayerContentLoader from "@@/components/HandPlayerContentLoader";
import usePost from "@@/hooks/usePost";
import { PostId } from "@@/models/Post";

interface Props extends React.Attributes {
  postId: PostId;
  defaultSnapshotIndex?: number;
  className?: string;
  style?: React.CSSProperties;
}

export default function HandPlayerSection({
  postId,
  defaultSnapshotIndex = 0,
  ...props
}: Props) {
  const { post, isLoading } = usePost(postId);

  let player = <HandPlayerContentLoader />;

  if (!isLoading) {
    if (!post) {
      // while isPostLoading=false, post should not be null.
      throw new Error("You shouldn't reach here.");
    }

    player = (
      <HandPlayer
        hand={post.hand}
        heroIndex={post.heroIndex}
        defaultSnapshotIndex={defaultSnapshotIndex}
      />
    );
  }

  return <Root {...props}>{player}</Root>;
}

const Root = styled.div`
  margin-left: calc((100vw - 100%) / -2);
  margin-right: calc((100vw - 100%) / -2);
  padding: 32px calc((100vw - 100%) / 2);
  background: #f8fafa;
`;
