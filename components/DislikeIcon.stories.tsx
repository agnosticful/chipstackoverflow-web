import * as React from "react";
import DislikeIcon from "./DislikeIcon";

export default {
  title: "dislike",
  component: DislikeIcon
};

export const icon = () => (
  <DislikeIcon color="gray" style={{ width: 25, height: 25, margin: "16px" }} />
);
