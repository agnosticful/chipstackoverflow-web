import Head from "next/head";
import * as React from "react";
import NotFoundPage from "@@/pageComponents/NotFoundPage";

export default () => {
  return (
    <>
      <Head>
        <title>chipstackoverflow</title>
      </Head>

      <NotFoundPage />
    </>
  );
};
