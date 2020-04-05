import Router from "next/router";
import * as React from "react";
import styled from "styled-components";
import PostList, { PostCardListItem } from "../../components/PostCardList";
import { MOBILE_MEDIA } from "../../constants/mediaquery";
import useRepository from "../../hooks/useRepository";
import Post from "../../models/Post";

export default function RecentPosts() {
  const { getRecentPosts } = useRepository();
  const [post, setPost] = React.useState<Post[]>([]);

  React.useEffect(() => {
    (async () => {
      setPost(await getRecentPosts({ limit: 6 }));
    })();
  }, [setPost, getRecentPosts]);

  return (
    <Root>
      <Headline>Recent Posts</Headline>
      <PostList>
        {post.map(postItem => (
          <PostCardListItem
            key={postItem.id}
            post={postItem}
            onClick={() => {
              Router.push(`/posts/${postItem.id}`);
            }}
          />
        ))}
      </PostList>
    </Root>
  );
}

const Root = styled.div`
  width: 80%;
  margin: 0 auto 80px;

  & > div {
    max-width: 900px;
  }
`;

const Headline = styled.h2`
  margin: 0 auto 32px;
  font-size: 32px;

  ${MOBILE_MEDIA} {
    font-size: 24px;
  }
`;
