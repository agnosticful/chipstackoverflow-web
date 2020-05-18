import { action } from "@storybook/addon-actions";
import * as React from "react";
import HeadBar from "@@/components/HeadBar";

export default {
  title: "HeadBar",
  component: HeadBar,
};

export const example = () => (
  <HeadBar
    user={
      {
        id: "loremipsum",
        name: "Lorem Ipsum",
        profileImageURL: new URL("https://www.kohei.dev/profile.jpg"),
      } as any
    }
    onSignOutButtonClick={action("onSignOutButtonClick")}
  />
);

export const whenSignedOut = () => (
  <HeadBar onSignInButtonClick={action("onSignInButtonClick")} />
);

export const whileSigningIn = () => <HeadBar authenticationChecking />;

export const noLogo = () => (
  <HeadBar noLogo onSignInButtonClick={action("onSignInButtonClick")} />
);
