import Router from "next/router";
import * as React from "react";
import styled from "styled-components";
import PostList, {
  PostCardListItem,
  PostCardListItemLoader,
} from "../../components/PostCardList";
import { MOBILE_MEDIA } from "../../constants/mediaquery";
import {
  NUMBER_OF_POSTS,
  POPULAR_POSTS_TERM_FROM_IN_MONTH,
} from "../../constants/post";
import useRepository from "../../hooks/useRepository";
import Post from "../../models/Post";

export default function PopularPosts({
  prefetchedPopularPosts,
}: {
  prefetchedPopularPosts: Post[];
}) {
  const { subscribePopularPosts } = useRepository();
  const [posts, setPosts] = React.useState<Post[]>(prefetchedPopularPosts);

  const acquisitionPeriodFrom = new Date();
  acquisitionPeriodFrom.setMonth(
    acquisitionPeriodFrom.getMonth() - POPULAR_POSTS_TERM_FROM_IN_MONTH
  );

  React.useEffect(() => {
    const popularPostsChanged = subscribePopularPosts({
      limit: NUMBER_OF_POSTS,
      acquisitionPeriodFrom,
    });

    const popularPostsSubscription = popularPostsChanged.subscribe(
      (popularPosts) => {
        setPosts(popularPosts);
      }
    );

    return () => {
      popularPostsSubscription.unsubscribe();
    };
  }, [setPosts, subscribePopularPosts]);

  return (
    <>
      <Headline>Popular Posts</Headline>
      <PostList>
        {posts.length === 0 ? (
          <>
            {Array.from({ length: NUMBER_OF_POSTS }, (_, i) => (
              <PostCardListItemLoader key={i} />
            ))}
          </>
        ) : (
          posts.map((post) => (
            <PostCardListItem
              key={post.id}
              post={post}
              onClick={() =>
                Router.push(`/posts/[postId]`, `/posts/${post.id}`)
              }
            />
          ))
        )}
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
