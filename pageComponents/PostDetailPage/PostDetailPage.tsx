import * as React from "react";
import styled from "styled-components";
import HeadBar from "../../components/HeadBar";
import Post from "../../models/Post";

interface Props {
  prefetchedPost: Post;
}

export default function PostDetailPage({ prefetchedPost }: Props) {
  return (
    <Root>
      <_HeadBar />

      <Content>
        <h1>(temporary implementation) {prefetchedPost.title}</h1>

        {prefetchedPost.body.split("\n").map((line, i) => (
          <p key={i}>{line}</p>
        ))}
      </Content>
    </Root>
  );
}

const Root = styled.div`
  display: grid;
  min-width: 375px;
  grid-template-columns: minmax(64px, auto) minmax(375px, 1024px) minmax(
      64px,
      auto
    );
  grid-template-areas: "header header header" ". content .";
`;

const _HeadBar = styled(HeadBar)`
  grid-area: header;
`;

const Content = styled.section`
  grid-area: content;
`;
