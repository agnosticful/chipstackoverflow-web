import { action } from "@storybook/addon-actions";
import { number, text } from "@storybook/addon-knobs";
import * as React from "react";
import BetSizeInput from "./BetSizeInput";

export default {
  title: "BetSizeInput",
  component: BetSizeInput
};

export const example = () => (
  <BetSizeInput
    placeholder={text("placeholder", "0.5")}
    defaultValue={number("defaultValue", undefined as any)}
    onChange={action("onChange")}
  />
);
