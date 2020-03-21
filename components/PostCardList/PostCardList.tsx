import * as React from "react";
import styled from "styled-components";
import { MOBILE_MEDIA } from "../../constants/mediaquery";
import PostTypeContext, { PostType } from "./PostTypeContext";

interface Props extends React.Attributes {
  postType?: PostType;
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
}

export default function PostCardList({
  postType = PostType.recent,
  children
}: Props) {
  return (
    <Root>
      <PostTypeContext.Provider value={postType}>
        {children}
      </PostTypeContext.Provider>
    </Root>
  );
}

const Root = styled.div`
  display: grid;
  grid-template-columns: 440px 440px;
  grid-gap: 16px;

  ${MOBILE_MEDIA} {
    grid-template-columns: 100%;
  }
`;
