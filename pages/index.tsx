import * as React from "react";
import IndexPage from "../pageComponents/IndexPage";
import {
  NUMBER_OF_POSTS,
  POPULAR_POSTS_TERM_FROM_IN_MONTH,
} from "../constants/post";
import { createGetPopularPosts } from "../repositories/getPopularPosts";
import postToJSON from "../serializers/postToJSON";
import getFirebaseApp from "../utilities/getFirebaseApp";
import jsonToPost from "../serializers/jsonToPost";

export default function Page({
  prefetchedPopularPostsJSON,
}: {
  prefetchedPopularPostsJSON: Record<string, any>[];
}) {
  return (
    <IndexPage
      prefetchedPopularPosts={prefetchedPopularPostsJSON.map(
        (prefetchedPopularPostJSON) => jsonToPost(prefetchedPopularPostJSON)
      )}
    />
  );
}

export async function getServerSideProps() {
  const firebaseApp = getFirebaseApp();
  const getPopularPosts = createGetPopularPosts({ firebaseApp });

  const acquisitionTermFrom = new Date();
  acquisitionTermFrom.setFullYear(
    acquisitionTermFrom.getFullYear() - POPULAR_POSTS_TERM_FROM_IN_MONTH
  );

  const popularPosts = await getPopularPosts({
    limit: NUMBER_OF_POSTS,
    acquisitionTermFrom,
  });

  return {
    props: {
      prefetchedPopularPostsJSON: popularPosts.map((popularPost) =>
        postToJSON(popularPost)
      ),
    },
  };
}
