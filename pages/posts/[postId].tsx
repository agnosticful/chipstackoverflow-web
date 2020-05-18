import Error from "next/error";
import Head from "next/head";
import { useRouter } from "next/router";
import * as React from "react";
import usePost, { PostProvider } from "@@/hooks/usePost";
import { PostId } from "@@/models/Post";
import PostDetailPage from "@@/pageComponents/PostDetailPage";

export default () => {
  const { query } = useRouter();

  return (
    <PostProvider id={`${query.postId}` as PostId}>
      <Wrapped />
    </PostProvider>
  );
};

function Wrapped() {
  const { post, isLoading } = usePost();

  if (post === null && !isLoading) {
    return <Error statusCode={404} />;
  }

  return (
    <>
      <Head>
        <title>{post ? post.title : "Loading..."} | Chipstackoverflow</title>
      </Head>

      <PostDetailPage />
    </>
  );
}
