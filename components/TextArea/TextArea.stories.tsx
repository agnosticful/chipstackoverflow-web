import { action } from "@storybook/addon-actions";
import { select } from "@storybook/addon-knobs";
import * as React from "react";
import TextArea, { InputSize } from "./TextArea";

export default {
  title: "TextArea",
  component: TextArea
};

export const example = () => (
  <TextArea
    size={select("size", SIZES, undefined)}
    onChange={action("inputed")}
  />
);

export const Sizes = () => (
  <>
    <TextArea
      rows={5}
      size={InputSize.small}
      style={{ display: "block" }}
      placeholder="Small"
    />
    <TextArea
      rows={5}
      size={InputSize.medium}
      style={{ display: "block" }}
      placeholder="Medium"
    />
    <TextArea
      rows={5}
      size={InputSize.large}
      style={{ display: "block" }}
      placeholder="Large"
    />
  </>
);
export const fullWidth = () => (
  <>
    <TextArea
      fullWidth
      rows={5}
      size={InputSize.small}
      style={{ display: "block" }}
      placeholder="Small"
    />
    <TextArea
      fullWidth
      rows={5}
      size={InputSize.medium}
      style={{ display: "block" }}
      placeholder="Medium"
    />
    <TextArea
      fullWidth
      rows={5}
      size={InputSize.large}
      style={{ display: "block" }}
      placeholder="Large"
    />
  </>
);

const SIZES = {
  "InputSize.large": InputSize.large,
  "InputSize.medium": InputSize.medium,
  "InputSize.small": InputSize.small
};
