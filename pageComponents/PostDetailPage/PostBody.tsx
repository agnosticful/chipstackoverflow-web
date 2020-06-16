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

export default function PostBody({ postId, ...props }: Props) {
  const { post, isLoading } = usePost({ postId });

  if (isLoading) {
    return (
      <Loader {...props}>
        <rect />

        <rect />

        <rect />

        <rect />

        <rect />

        <rect />

        <rect />

        <rect />

        <rect />
      </Loader>
    );
  }

  if (!post) {
    // while isPostLoading=false, post should not be null.
    throw new Error("You shouldn't reach here.");
  }

  return (
    <div {...props}>
      {post.body.split("\n").map((line, i) => (
        <Paragraph key={i}>{line}</Paragraph>
      ))}
    </div>
  );
}

const Paragraph = styled.p`
  line-height: 1.333;

  &:nth-of-type(n + 2) {
    margin-top: 16px;
  }
`;

const Loader = styled(ContentLoader)`
  width: 100%;
  height: calc(1em * 1.333 * 9 + 2em);
  margin-top: 64px;
  font-size: 16px;

  clipPath {
    rect {
      width: 100%;
      height: 1em;
    }

    rect:nth-of-type(3n - 2) {
      width: 100%;
    }

    rect:nth-of-type(3n - 1) {
      width: 75%;
    }

    rect:nth-of-type(3n) {
      width: 85%;
    }

    rect:nth-of-type(1) {
      x: 0;
      y: calc(1em * 0.333 / 2);
    }

    rect:nth-of-type(2) {
      x: 0;
      y: calc(1em * 0.333 / 2 + 1em * 1.333);
    }

    rect:nth-of-type(3) {
      x: 0;
      y: calc(1em * 0.333 / 2 + 1em * 1.333 * 2);
    }

    rect:nth-of-type(4) {
      x: 0;
      y: calc(1em * 0.333 / 2 + 1em * 1.333 * 3 + 1em);
    }

    rect:nth-of-type(5) {
      x: 0;
      y: calc(1em * 0.333 / 2 + 1em * 1.333 * 4 + 1em);
    }

    rect:nth-of-type(6) {
      x: 0;
      y: calc(1em * 0.333 / 2 + 1em * 1.333 * 5 + 1em);
    }

    rect:nth-of-type(7) {
      x: 0;
      y: calc(1em * 0.333 / 2 + 1em * 1.333 * 6 + 2em);
    }

    rect:nth-of-type(8) {
      x: 0;
      y: calc(1em * 0.333 / 2 + 1em * 1.333 * 7 + 2em);
    }

    rect:nth-of-type(9) {
      x: 0;
      y: calc(1em * 0.333 / 2 + 1em * 1.333 * 8 + 2em);
    }
  }
`;
