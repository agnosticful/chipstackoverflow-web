import Head from "next/head";
import * as React from "react";
import CreateNewPostPage from "../../pageComponents/CreateNewPostPage";

export default function() {
  return (
    <>
      <Head>
        <title>New Post 🦈 chipstackoverflow</title>
      </Head>

      <CreateNewPostPage />
    </>
  );
}
