import { Button, Col, Row, Typography } from "antd";
import * as React from "react";
import styled from "styled-components";
import useRecentPosts from "../../hooks/useRecentPosts";
import Post from "../../models/Post";
import PostList from "../PostList";

interface Props {
  initialRecentPosts?: Post[];
  className?: string;
}

export default function RecentPosts({ initialRecentPosts, ...props }: Props) {
  const { recentPosts, areFirstRecentPostsLoaded } = useRecentPosts();
  const posts =
    !areFirstRecentPostsLoaded && initialRecentPosts
      ? initialRecentPosts
      : recentPosts;

  return (
    <Row {...props}>
      <Col span={20} offset={2}>
        <Typography.Title level={2}>Recent Posts</Typography.Title>
      </Col>

      <ListCol span={20} offset={2}>
        <PostList posts={posts} />
      </ListCol>

      <ButtonsCol span={20} offset={2}>
        <Button type="primary">Create New Post</Button>

        <SeeMoreButton>See more</SeeMoreButton>
      </ButtonsCol>
    </Row>
  );
}

const ListCol = styled(Col)`
  margin-top: 16px;
`;

const ButtonsCol = styled(Col)`
  display: flex;
  justify-content: flex-end;
  margin-top: 16px;
`;

const SeeMoreButton = styled(Button)`
  margin-left: 16px;
`;
