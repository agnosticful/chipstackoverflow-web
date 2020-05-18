import Router from "next/router";
import * as React from "react";
import styled from "styled-components";
import PostList, {
  PostCardListItem,
  PostCardListItemLoader,
} from "@@/components/PostCardList";
import { MOBILE_MEDIA } from "@@/constants/mediaquery";
import { NUMBER_OF_POSTS_IN_INDEX } from "@@/constants/post";
import useRecentPosts from "@@/hooks/useRecentPosts";

export default function RecentPosts() {
  const { recentPosts, isLoading } = useRecentPosts();

  return (
    <>
      <Headline>Recent Posts</Headline>

      <PostList>
        {isLoading
          ? Array.from({ length: NUMBER_OF_POSTS_IN_INDEX }, (_, i) => (
              <PostCardListItemLoader key={i} />
            ))
          : recentPosts.map((post) => (
              <PostCardListItem
                key={post.id}
                post={post}
                onClick={() =>
                  Router.push(`/posts/[postId]`, `/posts/${post.id}`)
                }
              />
            ))}
      </PostList>
    </>
  );
}

const Headline = styled.h2`
  margin-bottom: 32px;
  font-size: 32px;

  ${MOBILE_MEDIA} {
    font-size: 24px;
  }
`;
