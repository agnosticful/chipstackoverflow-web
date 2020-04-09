import Router from "next/router";
import * as React from "react";
import styled from "styled-components";
import PostList, {
  PostCardListItem,
  PostCardListItemLoader,
} from "../../components/PostCardList";
import { MOBILE_MEDIA } from "../../constants/mediaquery";
import { NUMBER_OF_POST_TO_FETCH } from "../../constants/user";
import useRepository from "../../hooks/useRepository";
import Post from "../../models/Post";

export default function RecentPosts({
  prefetchedRecentPosts,
}: {
  prefetchedRecentPosts: Post[];
}) {
  const { subscribeRecentPosts } = useRepository();
  const [posts, setPosts] = React.useState<Post[]>(prefetchedRecentPosts);

  React.useEffect(() => {
    const recentPostsChanged = subscribeRecentPosts({
      limit: NUMBER_OF_POST_TO_FETCH,
    });

    const recentPostsSubscription = recentPostsChanged.subscribe(
      (recentPosts) => {
        setPosts(recentPosts);
      }
    );

    return () => {
      recentPostsSubscription.unsubscribe();
    };
  }, [setPosts, subscribeRecentPosts]);

  return (
    <>
      <Headline>Recent Posts</Headline>
      <PostList>
        {posts.length === 0 ? (
          <>
            {Array.from({ length: NUMBER_OF_POST_TO_FETCH }, (_, i) => (
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
  margin: 0 auto 32px;
  font-size: 32px;

  ${MOBILE_MEDIA} {
    font-size: 24px;
  }
`;
