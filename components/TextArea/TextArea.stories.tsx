import { action } from "@storybook/addon-actions";
import { text, number, boolean } from "@storybook/addon-knobs";
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
    onChange={action("onChange")}
  />
);
