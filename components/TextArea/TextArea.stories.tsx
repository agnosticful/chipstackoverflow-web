import { action } from "@storybook/addon-actions";
import { boolean, number, text } from "@storybook/addon-knobs";
import * as React from "react";
import TextArea from "./TextArea";

export default {
  title: "TextArea",
  component: TextArea
};

export const example = () => (
  <TextArea
    rows={number("rows", 5)}
    maxRows={number("maxRows", Infinity)}
    resizable={boolean("resizable", true)}
    defaultValue={text("defaultValue", "")}
    placeholder={text("placeholder", "Lorem ipsum ...")}
    disabled={boolean("disabled", false)}
    onChange={action("onChange")}
  />
);

export const resizeLimitedly = () => (
  <TextArea
    rows={3}
    maxRows={10}
    resizable={boolean("resizable", true)}
    defaultValue={text("defaultValue", "")}
    placeholder={text("placeholder", "Lorem ipsum ...")}
    disabled={boolean("disabled", false)}
    onChange={action("onChange")}
  />
);

export const noResize = () => (
  <TextArea
    rows={number("rows", 5)}
    maxRows={number("maxRows", Infinity)}
    resizable={false}
    defaultValue={text("defaultValue", "")}
    placeholder={text("placeholder", "Lorem ipsum ...")}
    disabled={boolean("disabled", false)}
    onChange={action("onChange")}
  />
);

export const disabled = () => (
  <TextArea
    rows={number("rows", 5)}
    maxRows={number("maxRows", Infinity)}
    resizable={boolean("resizable", true)}
    defaultValue={text(
      "defaultValue",
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
    )}
    placeholder={text("placeholder", "Lorem ipsum ...")}
    disabled
    onChange={action("onChange")}
  />
);
