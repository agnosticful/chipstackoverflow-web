import Head from "next/head";
import * as React from "react";
import IndexPage from "@@/pageComponents/IndexPage";

export default () => {
  return (
    <>
      <Head>
        <title>chipstackoverflow</title>
      </Head>

      <IndexPage />
    </>
  );
};
