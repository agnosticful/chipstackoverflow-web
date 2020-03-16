import { action } from "@storybook/addon-actions";
import * as React from "react";
import TextInput, { TextInputSize } from "./TextInput";

export default {
  title: "TextInput",
  component: TextInput
};

export const example = () => (
  <TextInput placeholder="text input" onChange={action("inputed")} />
);

export const Sizes = () => (
  <>
    <TextInput
      size={TextInputSize.small}
      style={{ display: "block" }}
      placeholder="Small"
    />
    <TextInput
      size={TextInputSize.regular}
      style={{ display: "block" }}
      placeholder="Regular"
    />
    <TextInput
      size={TextInputSize.large}
      style={{ display: "block" }}
      placeholder="Large"
    />
    <TextInput
      size={TextInputSize.fullWidth}
      style={{ display: "block" }}
      placeholder="Full Width"
    />
  </>
);
