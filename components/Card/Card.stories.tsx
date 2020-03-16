import * as React from "react";
import Card from "./Card";

export default {
  title: "Card",
  component: Card
};

export const card = () => (
  <Card
    onClick={() => {
      console.log("clicked");
    }}
    style={{ width: "500px", height: "150px" }}
  />
);
