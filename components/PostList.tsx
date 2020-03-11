import { Avatar, List, Typography } from "antd";
import Link from "next/link";
import * as React from "react";
import Post from "../models/Post";

interface Props extends React.Attributes {
  posts: Post[];
  className?: string;
}

export default function PostList({ posts, ...props }: Props) {
  return (
    <List
      itemLayout="horizontal"
      dataSource={posts}
      renderItem={post => (
        <List.Item>
          <List.Item.Meta
            avatar={
              <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
            }
            title={
              <Link
                href={{ pathname: `/posts/[postId]` }}
                as={{ pathname: `/posts/${post.id}` }}
                passHref
              >
                <a>
                  <Typography>{post.title}</Typography>
                </a>
              </Link>
            }
            description={post.body.slice(0, 60)}
          />
        </List.Item>
      )}
      {...props}
    />
  );
}
