import Head from "next/head";
import * as React from "react";
import NewPostPage from "../../pageComponents/NewPostPage";

export default function Page() {
  return (
    <>
      <Head>
        <title>New Post | Chipstackoverflow</title>
      </Head>

      <NewPostPage />
    </>
  );
}
