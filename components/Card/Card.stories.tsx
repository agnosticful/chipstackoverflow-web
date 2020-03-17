import { action } from "@storybook/addon-actions";
import * as React from "react";
import Card from "./Card";

export default {
  title: "Card",
  component: Card
};

export const example = () => <Card onClick={action("clicked")} />;

export const WithContent = () => (
  <Card onClick={action("clicked")} style={{ width: "400px" }}>
    <h3>nibh tortor id</h3>
    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
      tempor incididunt ut labore et dolore magna aliqua.
    </p>
  </Card>
);
