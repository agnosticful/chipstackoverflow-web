import { GetStaticPropsContext } from "next";
import Error from "next/error";
import Head from "next/head";
import { useRouter } from "next/router";
import * as React from "react";
import { PostId } from "@@/models/Post";
import PostDetailPage from "@@/pageComponents/PostDetailPage";
import { getSingletonServerSideApolloClient } from "@@/repositories/apolloClient";
import getPostById from "@@/repositories/getPostById";
import { fromPost, toPost } from "@@/serializers/json/post";

interface Props {
  prerenderedPostJSON: Record<string, any> | null;
}

export default ({ prerenderedPostJSON }: Props) => {
  const { query, isFallback } = useRouter();
  const postId = `${query.postId}` as PostId;
  const post = prerenderedPostJSON ? toPost(prerenderedPostJSON) : null;

  if (post === null && !isFallback) {
    return <Error statusCode={404} />;
  }

  return (
    <>
      <Head>
        <title>{post ? post.title : "Loading..."} | Chipstackoverflow</title>
      </Head>

      <PostDetailPage postId={postId} />
    </>
  );
};

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: true,
  };
}

export async function getStaticProps({
  params,
}: GetStaticPropsContext<{ postId: PostId }>) {
  const apolloClient = getSingletonServerSideApolloClient();
  const post = await getPostById(params!.postId, {
    apolloClient,
    authenticationToken: null,
  });

  return {
    props: {
      prerenderedPostJSON: post ? fromPost(post) : null,
    },
    unstable_revalidate: 1,
  };
}
