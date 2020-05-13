import Head from "next/head";
import * as React from "react";
import { PopularPostsProvider } from "@@/hooks/usePopularPosts";
import { RecentPostsProvider } from "@@/hooks/useRecentPosts";
import IndexPage from "@@/pageComponents/IndexPage";

export default () => {
  return (
    <PopularPostsProvider>
      <RecentPostsProvider>
        <Head>
          <title>chipstackoverflow</title>
        </Head>

        <IndexPage />
      </RecentPostsProvider>
    </PopularPostsProvider>
  );
};
