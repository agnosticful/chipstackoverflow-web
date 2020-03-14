import "antd/dist/antd.css";
import { action } from "@storybook/addon-actions";
import * as React from "react";
import AuthenticationRepositoryStub from "../testUtilities/AuthenticationRepositoryStub";
import HeadBar from "./HeadBar";

export default {
  title: "HeadBar",
  component: HeadBar
};

export const example = () => (
  <AuthenticationRepositoryStub
    signOut={action("signOut")}
    user={{
      id: "loremipsum",
      name: "Lorem Ipsum",
      profileImageURL: new URL("https://www.kohei.dev/profile.jpg")
    }}
  >
    <HeadBar />
  </AuthenticationRepositoryStub>
);

export const whenSignedOut = () => (
  <AuthenticationRepositoryStub signIn={action("signIn")}>
    <HeadBar />
  </AuthenticationRepositoryStub>
);

export const whileSigningIn = () => (
  <AuthenticationRepositoryStub signingIn>
    <HeadBar />
  </AuthenticationRepositoryStub>
);

export const noLogo = () => (
  <AuthenticationRepositoryStub signIn={action("signIn")}>
    <HeadBar noLogo />
  </AuthenticationRepositoryStub>
);
