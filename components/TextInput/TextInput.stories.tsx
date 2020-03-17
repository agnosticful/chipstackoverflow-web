import { action } from "@storybook/addon-actions";
import { select } from "@storybook/addon-knobs";
import * as React from "react";
import TextInput, { InputSize, InputType } from "./TextInput";

export default {
  title: "TextInput",
  component: TextInput
};

export const example = () => (
  <TextInput
    placeholder="text input"
    size={select("size", SIZES, undefined)}
    type={select("type", TYPES, undefined)}
    onChange={action("inputed")}
  />
);

export const Sizes = () => (
  <>
    <TextInput
      size={InputSize.small}
      type={select("type", TYPES, undefined)}
      style={{ display: "block" }}
      placeholder="Small"
    />
    <TextInput
      size={InputSize.medium}
      type={select("type", TYPES, undefined)}
      style={{ display: "block" }}
      placeholder="Medium"
    />
    <TextInput
      size={InputSize.large}
      type={select("type", TYPES, undefined)}
      style={{ display: "block" }}
      placeholder="Large"
    />
  </>
);

export const types = () => (
  <>
    <TextInput
      size={select("size", SIZES, undefined)}
      type={InputType.text}
      style={{ display: "block" }}
      placeholder="Text"
    />
    <TextInput
      size={select("size", SIZES, undefined)}
      type={InputType.number}
      style={{ display: "block" }}
      placeholder="Number"
    />
  </>
);

export const fullWidthInput = () => (
  <>
    <TextInput
      fullWidth
      size={InputSize.small}
      type={select("type", TYPES, undefined)}
      style={{ display: "block" }}
      placeholder="Small"
    />
    <TextInput
      fullWidth
      size={InputSize.medium}
      type={select("type", TYPES, undefined)}
      style={{ display: "block" }}
      placeholder="Medium"
    />
    <TextInput
      fullWidth
      size={InputSize.large}
      type={select("type", TYPES, undefined)}
      style={{ display: "block" }}
      placeholder="Large"
    />
  </>
);

export const multiline = () => (
  <TextInput
    size={select("size", SIZES, undefined)}
    type={select("type", TYPES, undefined)}
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
      type={select("type", TYPES, undefined)}
      placeholder="Small"
      rows={5}
    />
    <TextInput
      size={InputSize.medium}
      style={{ display: "block" }}
      type={select("type", TYPES, undefined)}
      placeholder="Medium"
      rows={5}
    />
    <TextInput
      size={InputSize.large}
      style={{ display: "block" }}
      type={select("type", TYPES, undefined)}
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
      type={select("type", TYPES, undefined)}
      placeholder="Small"
      rows={5}
    />
    <TextInput
      fullWidth
      size={InputSize.medium}
      style={{ display: "block" }}
      type={select("type", TYPES, undefined)}
      placeholder="Medium"
      rows={5}
    />
    <TextInput
      fullWidth
      size={InputSize.large}
      style={{ display: "block" }}
      type={select("type", TYPES, undefined)}
      placeholder="Large"
      rows={5}
    />
  </>
);

const SIZES = {
  "InputSize.large": InputSize.large,
  "InputSize.medium": InputSize.medium,
  "InputSize.small": InputSize.small
};

const TYPES = {
  "InputType.text": InputType.text,
  "InputType.number": InputType.number
};
