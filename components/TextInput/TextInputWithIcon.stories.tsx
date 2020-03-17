import { action } from "@storybook/addon-actions";
import * as React from "react";
import { InputSize } from "./TextInput";
import TextInputWithIcon from "./TextInputWithIcon";
import { BBIcon } from "../Icon";

export default {
  title: "TextInputWithIcon",
  component: TextInputWithIcon
};

export const example = () => (
  <TextInputWithIcon
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
      onChange={action("inputed")}
    >
      <BBIcon />
    </TextInputWithIcon>

    <TextInputWithIcon
      placeholder="medium"
      size={InputSize.medium}
      onChange={action("inputed")}
    >
      <BBIcon />
    </TextInputWithIcon>

    <TextInputWithIcon
      placeholder="large"
      size={InputSize.large}
      onChange={action("inputed")}
    >
      <BBIcon />
    </TextInputWithIcon>
  </>
);
