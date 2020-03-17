import { action } from "@storybook/addon-actions";
import { select } from "@storybook/addon-knobs";
import * as React from "react";
import TextInput, { InputSize } from "./TextInput";

export default {
  title: "TextInput",
  component: TextInput
};

export const example = () => (
  <TextInput
    size={select("size", SIZES, undefined)}
    placeholder="text input"
    onChange={action("inputed")}
  />
);

export const Sizes = () => (
  <>
    <TextInput
      size={InputSize.small}
      style={{ display: "block" }}
      placeholder="Small"
    />
    <TextInput
      size={InputSize.medium}
      style={{ display: "block" }}
      placeholder="Medium"
    />
    <TextInput
      size={InputSize.large}
      style={{ display: "block" }}
      placeholder="Large"
    />
  </>
);

export const fullWidthInput = () => (
  <>
    <TextInput
      fullWidth
      size={InputSize.small}
      style={{ display: "block" }}
      placeholder="Small"
    />
    <TextInput
      fullWidth
      size={InputSize.medium}
      style={{ display: "block" }}
      placeholder="Medium"
    />
    <TextInput
      fullWidth
      size={InputSize.large}
      style={{ display: "block" }}
      placeholder="Large"
    />
  </>
);

export const multiline = () => (
  <TextInput
    size={select("size", SIZES, undefined)}
    placeholder="textarea"
    rows={5}
    onChange={action("inputed")}
  />
);

export const multilineSizes = () => (
  <>
    <TextInput
      size={InputSize.small}
      style={{ display: "block" }}
      placeholder="Small"
      rows={5}
    />
    <TextInput
      size={InputSize.medium}
      style={{ display: "block" }}
      placeholder="Medium"
      rows={5}
    />
    <TextInput
      size={InputSize.large}
      style={{ display: "block" }}
      placeholder="Large"
      rows={5}
    />
  </>
);

export const fullWidthMultiline = () => (
  <>
    <TextInput
      fullWidth
      size={InputSize.small}
      style={{ display: "block" }}
      placeholder="Small"
      rows={5}
    />
    <TextInput
      fullWidth
      size={InputSize.medium}
      style={{ display: "block" }}
      placeholder="Medium"
      rows={5}
    />
    <TextInput
      fullWidth
      size={InputSize.large}
      style={{ display: "block" }}
      placeholder="Large"
      rows={5}
    />
  </>
);

const SIZES = {
  "InputSize.large": InputSize.large,
  "InputSize.regular": InputSize.medium,
  "InputSize.small": InputSize.small
};
