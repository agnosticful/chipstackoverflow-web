import { action } from "@storybook/addon-actions";
import { boolean, select } from "@storybook/addon-knobs";
import * as React from "react";
import { LoadingIcon, SignOutIcon } from "../Icon";
import Button, { ButtonSize, ButtonVariant } from "./Button";

export default {
  title: "Button",
  component: Button,
};

export const example = () => (
  <Button
    variant={select("variant", VARIANTS, ButtonVariant.default)}
    size={select("size", SIZES, ButtonSize.medium)}
    onClick={action("onClick")}
  >
    Click me!
  </Button>
);

export const variants = () => {
  const size = select("size", SIZES, ButtonSize.medium);
  const disabled = boolean("disabled", false);

  return (
    <>
      <Button
        variant={ButtonVariant.default}
        size={size}
        disabled={disabled}
        onClick={action("onClick")}
      >
        Default Button
      </Button>
      <Button
        variant={ButtonVariant.primary}
        size={size}
        disabled={disabled}
        onClick={action("onClick")}
      >
        Primary Button
      </Button>
      <Button
        variant={ButtonVariant.secondary}
        size={size}
        disabled={disabled}
        onClick={action("onClick")}
      >
        Secondary Button
      </Button>
    </>
  );
};

export const sizes = () => {
  const variant = select("variant", VARIANTS, ButtonVariant.default);
  const disabled = boolean("disabled", false);

  return (
    <>
      <Button
        variant={variant}
        size={ButtonSize.small}
        disabled={disabled}
        onClick={action("onClick")}
      >
        Small Button
      </Button>
      <Button
        variant={variant}
        size={ButtonSize.medium}
        disabled={disabled}
        onClick={action("onClick")}
      >
        Regular Button
      </Button>
      <Button
        variant={variant}
        size={ButtonSize.large}
        disabled={disabled}
        onClick={action("onClick")}
      >
        Large Button
      </Button>
    </>
  );
};

export const disabled = () => (
  <>
    <Button
      variant={select("variant", VARIANTS, ButtonVariant.default)}
      size={select("size", SIZES, ButtonSize.medium)}
      disabled
      onClick={action("onClick")}
    >
      <SignOutIcon /> Sign out
    </Button>

    <Button
      variant={select("variant", VARIANTS, ButtonVariant.default)}
      size={select("size", SIZES, ButtonSize.medium)}
      disabled
      onClick={action("onClick")}
    >
      <LoadingIcon /> Signing in...
    </Button>
  </>
);

export const withIcon = () => (
  <Button
    variant={select("variant", VARIANTS, ButtonVariant.default)}
    size={select("size", SIZES, ButtonSize.medium)}
    disabled={boolean("disabled", false)}
    onClick={action("onClick")}
  >
    <SignOutIcon /> Sign out
  </Button>
);

export const Anchor = () => (
  <Button
    variant={select("variant", VARIANTS, ButtonVariant.default)}
    size={select("size", SIZES, ButtonSize.medium)}
    disabled={boolean("disabled", false)}
    onClick={action("onClick")}
  >
    <a href="#">Go to next page</a>
  </Button>
);

const VARIANTS = {
  "ButtonVariant.default": ButtonVariant.default,
  "ButtonVariant.primary": ButtonVariant.primary,
  "ButtonVariant.secondary": ButtonVariant.secondary,
};

const SIZES = {
  "ButtonSize.large": ButtonSize.large,
  "ButtonSize.medium": ButtonSize.medium,
  "ButtonSize.small": ButtonSize.small,
};
