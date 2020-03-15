import * as React from "react";
import styled from "styled-components";
import HeadBar from "../components/HeadBar";
import RecentPosts from "../components/RecentPosts";

export default function Home() {
  return (
    <Root>
      <HeadBar />
      <RecentPosts />
    </Root>
  );
}

const Root = styled.div``;
