import { GetServerSideProps } from "next";
import Error from "next/error";
import Head from "next/head";
import * as React from "react";
import { PostId } from "../../models/Post";
import PostDetailPage from "../../pageComponents/PostDetailPage";
import { createGetPostById } from "../../repositories/getPostById";
import jsonToPost from "../../serializers/jsonToPost";
import postToJSON from "../../serializers/postToJSON";
import getFirebaseApp from "../../utilities/getFirebaseApp";

export default function Page({
  statusCode,
  prefetchedPostJSON,
}: {
  statusCode: number;
  prefetchedPostJSON: Record<string, any> | null;
  prefetchedAnswersJSON: Record<string, any>[];
}) {
  if (statusCode !== 200) {
    return <Error statusCode={statusCode} />;
  }

  const prefetchedPost = jsonToPost(prefetchedPostJSON!);

  return (
    <>
      <Head>
        <title>{prefetchedPost.title} | Chipstackoverflow</title>
      </Head>

      <PostDetailPage prefetchedPost={prefetchedPost} />
    </>
  );
}

export async function getServerSideProps({
  res,
  params,
}: Parameters<GetServerSideProps>[0]) {
  const postId = params!.postId as PostId;

  const firebaseApp = getFirebaseApp();
  const getPostById = createGetPostById({ firebaseApp });

  const post = await getPostById(postId);

  if (!post) {
    res.statusCode = 404;
  }

  return {
    props: {
      statusCode: res.statusCode,
      prefetchedPostJSON: post ? postToJSON(post) : null,
    },
  };
}
