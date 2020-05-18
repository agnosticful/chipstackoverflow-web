import { action } from "@storybook/addon-actions";
import { boolean, number, text } from "@storybook/addon-knobs";
import * as React from "react";
import BetSizeInput from "@@/components/BetSizeInput";

export default {
  title: "BetSizeInput",
  component: BetSizeInput,
};

export const example = () => (
  <BetSizeInput
    placeholder={text("placeholder", "0.5")}
    defaultValue={number("defaultValue", undefined as any)}
    disabled={boolean("disabled", false)}
    onChange={action("onChange")}
  />
);

export const disabled = () => (
  <BetSizeInput
    placeholder={text("placeholder", "0.5")}
    defaultValue={number("defaultValue", 1)}
    disabled
    onChange={action("onChange")}
  />
);
