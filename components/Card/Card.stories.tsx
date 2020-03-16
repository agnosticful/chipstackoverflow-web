import * as React from "react";
import { action } from "@storybook/addon-actions";
import Card from "./Card";

export default {
  title: "Card",
  component: Card
};

export const card = () => (
  <Card
    onClick={action("clicked")}
    style={{ width: "500px", height: "150px" }}
  />
);
