import { text } from "@storybook/addon-knobs";
import * as React from "react";
import Avatar from "@@/components/Avatar";

export default {
  title: "Avatar",
  component: Avatar,
};

export const example = () => (
  <Avatar src={text("src", "https://www.kohei.dev/profile.jpg")}></Avatar>
);
