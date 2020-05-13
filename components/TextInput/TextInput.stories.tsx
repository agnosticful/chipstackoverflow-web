import { action } from "@storybook/addon-actions";
import { select, text } from "@storybook/addon-knobs";
import * as React from "react";
import TextInput, { TextInputSize } from "@@/components/TextInput";

export default {
  title: "TextInput",
  component: TextInput,
};

export const example = () => (
  <TextInput
    size={select("size", SIZES, TextInputSize.medium)}
    defaultValue={text("defaultValue", "")}
    placeholder={text("placeholder", "Lorem ipsum ...")}
    onChange={action("onChange")}
  />
);

export const large = () => (
  <TextInput
    size={TextInputSize.large}
    defaultValue={text("defaultValue", "")}
    placeholder={text("placeholder", "Lorem ipsum ...")}
    onChange={action("onChange")}
  />
);

const SIZES = {
  "TextInputSize.medium": TextInputSize.medium,
  "TextInputSize.large": TextInputSize.large,
};
