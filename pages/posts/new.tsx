import Head from "next/head";
import * as React from "react";
import NewPostPage from "../../pageComponents/NewPostPage";

export default function () {
  return (
    <>
      <Head>
        <title>New Post 🦈 chipstackoverflow</title>
      </Head>

      <NewPostPage />
    </>
  );
}
