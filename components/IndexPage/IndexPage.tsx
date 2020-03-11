import { Col, Layout, Typography, Row } from "antd";
import * as React from "react";
import styled from "styled-components";
import useAuthentication from "../../hooks/useAuthentication";
import Post from "../../models/Post";
import RecentPosts from "./RecentPosts";

interface Props extends React.Attributes {
  initialRecentPosts?: Post[];
}

export default function IndexPage({ initialRecentPosts }: Props) {
  const { isSignedIn, signIn, signOut } = useAuthentication();

  return (
    <Layout>
      <Layout.Header></Layout.Header>

      <Layout.Content>
        <Eyecatch>
          <Row>
            <Col span={20} offset={2}>
              <Typography.Title>Hello!</Typography.Title>
            </Col>
          </Row>
        </Eyecatch>

        <RecentPosts initialRecentPosts={initialRecentPosts} />

        <PopularPosts />

        {isSignedIn ? (
          <button onClick={() => signIn()}>Sign in</button>
        ) : (
          <button onClick={() => signOut()}>Sign out</button>
        )}
      </Layout.Content>
    </Layout>
  );
}

const Eyecatch = styled.div`
  min-height: 480px;
  height: 75vh;
  padding: 150px 0;
`;

const PopularPosts = styled(RecentPosts)`
  margin-top: 32px;
`;
