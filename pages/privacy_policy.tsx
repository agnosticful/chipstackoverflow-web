import Head from "next/head";
import * as React from "react";
import PrivacyPolicyPage from "../pageComponents/PrivacyPolicyPage";

export default function () {
  return (
    <>
      <Head>
        <title>Privacy Policy | chipstackoverflow</title>
      </Head>

      <PrivacyPolicyPage />
    </>
  );
}
