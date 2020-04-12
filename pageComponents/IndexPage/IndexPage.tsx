import * as React from "react";
import styled from "styled-components";
import HeadBar from "../../components/HeadBar";
import FootBar from "../../components/FootBar";
import { MOBILE_MEDIA } from "../../constants/mediaquery";
import Post from "../../models/Post";
import Eyecatch from "./Eyecatch";
import PopularPosts from "./PopularPosts";

interface Props extends React.Attributes {
  prefetchedPopularPosts: Post[];
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
}

export default function IndexPage({
  prefetchedPopularPosts,
  children,
  ...props
}: Props) {
  return (
    <Root {...props}>
      <HeadBar />

      <Content>
        <Eyecatch />
      </Content>

      <Content>
        <PopularPosts prefetchedPopularPosts={prefetchedPopularPosts} />
      </Content>

      <FootBar />
    </Root>
  );
}

const Root = styled.div``;

const Content = styled.section`
  box-sizing: border-box;
  max-width: 1280px;
  min-width: 375px;
  margin: 0 auto;
  padding: 0 128px 128px;

  ${MOBILE_MEDIA} {
    margin: 0;
    padding: 0 16px 64px;
  }
`;
