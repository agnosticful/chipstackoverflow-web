import * as React from "react";
import { NUMBER_OF_POSTS_IN_INDEX } from "../constants/post";
import IndexPage from "../pageComponents/IndexPage";
import { createGetRecentPosts } from "../repositories/getRecentPosts";
import jsonToPost from "../serializers/jsonToPost";
import postToJSON from "../serializers/postToJSON";
import getFirebaseApp from "../utilities/getFirebaseApp";

export default function Page({
  prefetchedRecentPostsJSON,
}: {
  prefetchedRecentPostsJSON: Record<string, any>[];
}) {
  return (
    <IndexPage
      prefetchedRecentPosts={prefetchedRecentPostsJSON.map((item) =>
        jsonToPost(item)
      )}
    />
  );
}

export async function getServerSideProps() {
  const firebaseApp = getFirebaseApp();
  const getRecentPosts = createGetRecentPosts({ firebaseApp });

  const recentPosts = await getRecentPosts({
    limit: NUMBER_OF_POSTS_IN_INDEX,
  });

  return {
    props: {
      prefetchedRecentPostsJSON: recentPosts.map((recentPost) =>
        postToJSON(recentPost)
      ),
    },
  };
}
