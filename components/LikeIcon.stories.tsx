import * as React from "react";
import LikeIcon from "./LikeIcon";

export default {
  title: "like",
  component: LikeIcon
};

export const icon = () => (
  <LikeIcon style={{ width: 25, height: 25, margin: "16px" }} />
);
