import * as React from "react";
import { NUMBER_OF_POSTS_IN_INDEX } from "../constants/post";
import IndexPage from "../pageComponents/IndexPage";
import { createGetPopularPosts } from "../repositories/getPopularPosts";
import { createGetRecentPosts } from "../repositories/getRecentPosts";
import jsonToPost from "../serializers/jsonToPost";
import postToJSON from "../serializers/postToJSON";
import getFirebaseApp from "../utilities/getFirebaseApp";

export default function Page({
  prefetchedPopularPostsJSON,
  prefetchedRecentPostsJSON,
}: {
  prefetchedPopularPostsJSON: Record<string, any>[];
  prefetchedRecentPostsJSON: Record<string, any>[];
}) {
  return (
    <IndexPage
      prefetchedPopularPosts={prefetchedPopularPostsJSON.map((item) =>
        jsonToPost(item)
      )}
      prefetchedRecentPosts={prefetchedRecentPostsJSON.map((item) =>
        jsonToPost(item)
      )}
    />
  );
}

export async function getServerSideProps() {
  const firebaseApp = getFirebaseApp();
  const getPopularPosts = createGetPopularPosts({ firebaseApp });
  const getRecentPosts = createGetRecentPosts({ firebaseApp });

  const popularPosts = await getPopularPosts({
    limit: NUMBER_OF_POSTS_IN_INDEX,
  });
  const recentPosts = await getRecentPosts({
    limit: NUMBER_OF_POSTS_IN_INDEX,
  });
  return {
    props: {
      prefetchedPopularPostsJSON: popularPosts.map((popularPost) =>
        postToJSON(popularPost)
      ),
      prefetchedRecentPostsJSON: recentPosts.map((recentPost) =>
        postToJSON(recentPost)
      ),
    },
  };
}
