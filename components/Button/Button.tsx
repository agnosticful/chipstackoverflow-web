import * as React from "react";
import styled, { FlattenSimpleInterpolation, css } from "styled-components";

interface Props extends React.Attributes {
  variant?: ButtonVariant;
  size?: ButtonSize;
  disabled?: boolean;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
}

/**
 * Write the description for this component here.
 */
export default function Button({
  variant = ButtonVariant.default,
  size = ButtonSize.medium,
  disabled = false,
  children,
  ...props
}: Props) {
  return (
    <Root variant={variant} _size={size} disabled={disabled} {...props}>
      {children}
    </Root>
  );
}

export enum ButtonSize {
  large,
  medium,
  small,
}

export enum ButtonVariant {
  default,
  primary,
  secondary,
}

const Root = styled.button<{
  variant: ButtonVariant;
  _size: ButtonSize;
  disabled: boolean;
}>`
  ${({ variant }) => VARIANT_CSS[variant]}
  ${({ _size }) => SIZE_CSS[_size]}

  display: flex;
  align-items: center;
  justify-content: center;
  min-width: var(--min-width);
  height: var(--height);
  padding: var(--padding);
  background: var(--background);
  border: 1px var(--border-color) solid;
  border-radius: 4px;
  box-shadow: var(--box-shadow);
  color: var(--color);
  outline: none;
  font: inherit;
  font-size: var(--font-size);
  cursor: pointer;
  user-select: none;
  transition: background 200ms ease, border 200ms ease, color 200ms ease,
    box-shadow 200ms ease, transform 200ms ease;

  :hover,
  :focus {
    background: var(--hover-background);
    border-color: var(--hover-border-color);
    box-shadow: var(--hover-box-shadow);
    color: var(--hover-color);
    transform: translate3d(0px, -2px, 0px);
  }

  :disabled {
    background: #c8d6e5;
    border-color: transparent;
    box-shadow: none;
    color: #576574;
    transform: none;
    cursor: not-allowed;
  }

  & a {
    color: inherit;
    text-decoration: none;
  }

  & > svg {
    width: var(--inner-svg-size);
    height: var(--inner-svg-size);
    margin-right: var(--inner-svg-margin-right);
  }
`;

const VARIANT_CSS: Record<ButtonVariant, FlattenSimpleInterpolation> = {
  [ButtonVariant.default]: css`
    --background: #0f151c;
    --border-color: transparent;
    --color: #fff;
    --hover-background: #fff;
    --hover-border-color: #0f151c;
    --hover-color: #0f151c;
  `,
  [ButtonVariant.primary]: css`
    --background: #f53333;
    --border-color: transparent;
    --color: #fff;
    --hover-background: #fff;
    --hover-border-color: #f53333;
    --hover-color: #f53333;
  `,
  [ButtonVariant.secondary]: css`
    --background: #fff;
    --border-color: #c8d6e5;
    --color: #576574;
    --hover-background: #fff;
    --hover-border-color: #0f151c;
    --hover-color: #0f151c;
  `,
};

const SIZE_CSS: Record<ButtonSize, FlattenSimpleInterpolation> = {
  [ButtonSize.large]: css`
    --min-width: 224px;
    --height: 48px;
    --padding: 0 24px;
    --box-shadow: 0px 0px 12px #222f3e1f, 0px 12px 24px #222f3e0f;
    --font-size: 16px;
    --inner-svg-size: 20px;
    --inner-svg-margin-right: 8px;
    --hover-box-shadow: 0px 0px 12px #222f3e3f, 0px 12px 24px #222f3e1f;
  `,
  [ButtonSize.medium]: css`
    --min-width: 160px;
    --height: 40px;
    --padding: 0 16px;
    --box-shadow: 0px 0px 10px #222f3e1f, 0px 10px 20px #222f3e0f;
    --font-size: 16px;
    --inner-svg-size: 20px;
    --inner-svg-margin-right: 8px;
    --hover-box-shadow: 0px 0px 10px #222f3e3f, 0px 10px 20px #222f3e1f;
  `,
  [ButtonSize.small]: css`
    --min-width: 96px;
    --height: 32px;
    --padding: 0 12px;
    --box-shadow: 0px 0px 8px #222f3e1f, 0px 8px 16px #222f3e0f;
    --font-size: 14px;
    --inner-svg-size: 16px;
    --inner-svg-margin-right: 4px;
    --hover-box-shadow: 0px 0px 8px #222f3e3f, 0px 8px 16px #222f3e1f;
  `,
};
