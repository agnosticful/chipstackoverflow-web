import { action } from "@storybook/addon-actions";
import * as React from "react";
import { InputSize, InputType } from "./TextInput";
import TextInputWithIcon from "./TextInputWithIcon";
import { BBIcon } from "../Icon";
import { select } from "@storybook/addon-knobs";

export default {
  title: "TextInputWithIcon",
  component: TextInputWithIcon
};

export const example = () => (
  <TextInputWithIcon
    size={select("size", SIZES, undefined)}
    type={select("type", TYPES, undefined)}
    placeholder="text input with icon"
    onChange={action("inputed")}
  >
    <BBIcon />
  </TextInputWithIcon>
);

export const sizes = () => (
  <>
    <TextInputWithIcon
      placeholder="small"
      size={InputSize.small}
      type={select("type", TYPES, undefined)}
      onChange={action("inputed")}
    >
      <BBIcon />
    </TextInputWithIcon>

    <TextInputWithIcon
      placeholder="medium"
      size={InputSize.medium}
      type={select("type", TYPES, undefined)}
      onChange={action("inputed")}
    >
      <BBIcon />
    </TextInputWithIcon>

    <TextInputWithIcon
      placeholder="large"
      size={InputSize.large}
      type={select("type", TYPES, undefined)}
      onChange={action("inputed")}
    >
      <BBIcon />
    </TextInputWithIcon>
  </>
);

export const types = () => (
  <>
    <TextInputWithIcon
      placeholder="text"
      size={select("size", SIZES, undefined)}
      type={InputType.text}
      onChange={action("inputed")}
    >
      <BBIcon />
    </TextInputWithIcon>

    <TextInputWithIcon
      placeholder="number"
      size={select("size", SIZES, undefined)}
      type={InputType.number}
      onChange={action("inputed")}
    >
      <BBIcon />
    </TextInputWithIcon>
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
