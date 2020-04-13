import * as React from "react";
import {
  NUMBER_OF_POSTS_IN_INDEX,
  POPULAR_POSTS_TERM_FROM_IN_MONTH,
} from "../constants/post";
import IndexPage from "../pageComponents/IndexPage";
import { createGetPopularPosts } from "../repositories/getPopularPosts";
import jsonToPost from "../serializers/jsonToPost";
import postToJSON from "../serializers/postToJSON";
import getFirebaseApp from "../utilities/getFirebaseApp";

export default function Page({
  prefetchedPopularPostsJSON,
}: {
  prefetchedPopularPostsJSON: Record<string, any>[];
}) {
  return (
    <IndexPage
      prefetchedPopularPosts={prefetchedPopularPostsJSON.map((item) =>
        jsonToPost(item)
      )}
    />
  );
}

export async function getServerSideProps() {
  const firebaseApp = getFirebaseApp();
  const getPopularPosts = createGetPopularPosts({ firebaseApp });

  const acquisitionTermFrom = new Date();
  acquisitionTermFrom.setMonth(
    acquisitionTermFrom.getMonth() - POPULAR_POSTS_TERM_FROM_IN_MONTH
  );

  const popularPosts = await getPopularPosts({
    limit: NUMBER_OF_POSTS_IN_INDEX,
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
