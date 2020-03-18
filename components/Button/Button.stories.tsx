import { action } from "@storybook/addon-actions";
import { select } from "@storybook/addon-knobs";
import * as React from "react";
import { SignOutIcon } from "../Icon";
import Button, { ButtonSize, ButtonVariant } from "./Button";

export default {
  title: "Button",
  component: Button
};

export const example = () => (
  <Button
    variant={select("variant", VARIANTS, undefined)}
    size={select("size", SIZES, undefined)}
    onClick={action("onClick")}
  >
    Click me!
  </Button>
);

export const variants = () => (
  <>
    <Button
      variant={ButtonVariant.default}
      size={select("size", SIZES, undefined)}
      onClick={action("onClick")}
    >
      Default Button
    </Button>
    <Button
      variant={ButtonVariant.primary}
      size={select("size", SIZES, undefined)}
      onClick={action("onClick")}
    >
      Primary Button
    </Button>
    <Button
      variant={ButtonVariant.secondary}
      size={select("size", SIZES, undefined)}
      onClick={action("onClick")}
    >
      Secondary Button
    </Button>
  </>
);

export const sizes = () => (
  <>
    <Button
      variant={select("variant", VARIANTS, undefined)}
      size={ButtonSize.small}
      onClick={action("onClick")}
    >
      Small Button
    </Button>
    <Button
      variant={select("variant", VARIANTS, undefined)}
      size={ButtonSize.medium}
      onClick={action("onClick")}
    >
      Regular Button
    </Button>
    <Button
      variant={select("variant", VARIANTS, undefined)}
      size={ButtonSize.large}
      onClick={action("onClick")}
    >
      Large Button
    </Button>
  </>
);

export const withIcon = () => (
  <Button
    variant={select("variant", VARIANTS, undefined)}
    size={select("size", SIZES, undefined)}
    onClick={action("onClick")}
  >
    <SignOutIcon /> Sign out
  </Button>
);

export const Anchor = () => (
  <Button
    variant={select("variant", VARIANTS, undefined)}
    size={select("size", SIZES, undefined)}
    onClick={action("onClick")}
  >
    <a href="#">Go to next page</a>
  </Button>
);

const VARIANTS = {
  "ButtonVariant.default": ButtonVariant.default,
  "ButtonVariant.primary": ButtonVariant.primary,
  "ButtonVariant.secondary": ButtonVariant.secondary
};

const SIZES = {
  "ButtonSize.large": ButtonSize.large,
  "ButtonSize.medium": ButtonSize.medium,
  "ButtonSize.small": ButtonSize.small
};
