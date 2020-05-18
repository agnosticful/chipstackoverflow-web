import Router from "next/router";
import * as React from "react";
import styled from "styled-components";
import PostList, {
  PostCardListItem,
  PostCardListItemLoader,
} from "@@/components/PostCardList";
import { MOBILE_MEDIA } from "@@/constants/mediaquery";
import { NUMBER_OF_POSTS_IN_INDEX } from "@@/constants/post";
import usePopularPosts from "@@/hooks/usePopularPosts";

export default function PopularPosts() {
  const { popularPosts, isLoading } = usePopularPosts();

  return (
    <>
      <Headline>Popular Posts</Headline>

      <PostList>
        {isLoading
          ? Array.from({ length: NUMBER_OF_POSTS_IN_INDEX }, (_, i) => (
              <PostCardListItemLoader key={i} />
            ))
          : popularPosts.map((post) => (
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
