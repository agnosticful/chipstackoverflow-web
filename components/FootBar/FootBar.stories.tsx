import { action } from "@storybook/addon-actions";
import * as React from "react";
import FootBar from "./FootBar";

export default {
  title: "FootBar",
  component: FootBar,
};

export const example = () => (
  <FootBar onContactClick={action("onContactClick")} />
);
