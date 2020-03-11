import { NextPageContext } from "next";
import * as React from "react";
import IndexPage from "../components/IndexPage";
import { createGetRecentPosts } from "../repositories/getRecentPosts";
import jsonToPost from "../serializers/jsonToPost";
import postToJSON from "../serializers/postToJSON";
import getFirebaseApp from "../utilities/getFirebaseApp";

interface Props {
  recentPostsJSON?: Record<string, any>[];
}

export default function Page({ recentPostsJSON }: Props) {
  const recentPosts = recentPostsJSON
    ? recentPostsJSON.map(item => jsonToPost(item))
    : undefined;

  return <IndexPage initialRecentPosts={recentPosts} />;
}

Page.getInitialProps = async (context: NextPageContext) => {
  let recentPostsJSON: Record<string, any>[] | void;

  if (context.req && context.res) {
    const firebaseApp = getFirebaseApp();
    const getRecentPosts = createGetRecentPosts({ firebaseApp });
    const recentPosts = await getRecentPosts({ limit: 10 });

    recentPostsJSON = recentPosts.map(post => postToJSON(post));
  }

  return { recentPostsJSON };
};
