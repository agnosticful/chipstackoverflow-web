import * as React from "react";
import styled, { FlattenSimpleInterpolation, css } from "styled-components";

interface Props extends React.Attributes {
  variant?: ButtonVariant;
  size?: ButtonSize;
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
  size = ButtonSize.regular,
  children,
  ...props
}: Props) {
  return (
    <Root variant={variant} size={size} {...props}>
      {children}
    </Root>
  );
}

export enum ButtonSize {
  large,
  regular,
  small
}

export enum ButtonVariant {
  default,
  primary,
  secondary
}

const Root = styled.button<{
  variant: ButtonVariant;
  size: ButtonSize;
}>`
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  outline: none;
  font: inherit;
  cursor: pointer;
  transition: background 200ms ease, border 200ms ease, color 200ms ease,
    box-shadow 200ms ease, transform 200ms ease;

  :hover,
  :focus {
    transform: translate3d(0px, -2px, 0px);
  }

  & a {
    color: inherit;
    text-decoration: none;
  }

  ${({ variant }) => VARIANT_CSS[variant]}
  ${({ size }) => SIZE_CSS[size]}
`;

const VARIANT_CSS: Record<ButtonVariant, FlattenSimpleInterpolation> = {
  [ButtonVariant.default]: css`
    background: #0f151c;
    border: 1px transparent solid;
    color: #fff;

    :hover,
    :focus {
      background: #fff;
      border: 1px #0f151c solid;
      color: #0f151c;
    }
  `,
  [ButtonVariant.primary]: css`
    background: #0773fa;
    border: 1px transparent solid;
    color: #fff;

    :hover,
    :focus {
      background: #fff;
      border: 1px #0773fa solid;
      color: #0773fa;
    }
  `,
  [ButtonVariant.secondary]: css`
    background: #fff;
    border: 1px #c8d6e5 solid;
    color: #576574;

    :hover,
    :focus {
      border: 1px #0f151c solid;
      color: #0f151c;
    }
  `
};

const SIZE_CSS: Record<ButtonSize, FlattenSimpleInterpolation> = {
  [ButtonSize.large]: css`
    min-width: 224px;
    height: 48px;
    padding: 0 24px;
    font-size: 16px;
    box-shadow: 0px 0px 12px #222f3e1f, 0px 12px 24px #222f3e0f;

    :hover,
    :focus {
      box-shadow: 0px 0px 12px #222f3e3f, 0px 12px 24px #222f3e1f;
    }

    & > svg {
      width: 20px;
      height: 20px;
      margin-right: 8px;
    }
  `,
  [ButtonSize.regular]: css`
    min-width: 160px;
    height: 40px;
    padding: 0 16px;
    font-size: 16px;
    box-shadow: 0px 0px 10px #222f3e1f, 0px 10px 20px #222f3e0f;

    :hover,
    :focus {
      box-shadow: 0px 0px 10px #222f3e3f, 0px 10px 20px #222f3e1f;
    }

    & > svg {
      width: 20px;
      height: 20px;
      margin-right: 8px;
    }
  `,
  [ButtonSize.small]: css`
    min-width: 96px;
    height: 32px;
    padding: 0 12px;
    font-size: 14px;
    box-shadow: 0px 0px 8px #222f3e1f, 0px 8px 16px #222f3e0f;

    :hover,
    :focus {
      box-shadow: 0px 0px 8px #222f3e3f, 0px 8px 16px #222f3e1f;
    }

    & > svg {
      width: 16px;
      height: 16px;
      margin-right: 4px;
    }
  `
};
