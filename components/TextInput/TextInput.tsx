import * as React from "react";
import styled, { FlattenSimpleInterpolation, css } from "styled-components";

interface Props extends React.Attributes {
  size?: TextInputSize;
  placeholder?: string;
  defaultValue?: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  className?: string;
  style?: React.CSSProperties;
}

/**
 * An UI component that allows users input single-line text.
 */
export default function TextInput({
  size = TextInputSize.medium,
  onChange,
  ...props
}: Props) {
  return <Root type="text" onChange={onChange} size={size} {...props} />;
}

export enum TextInputSize {
  medium,
  large
}

const Root = styled.input<{ size: TextInputSize }>`
  box-sizing: border-box;
  width: 100%;
  height: calc(1.5em + 0.75em * 2 + 2px);
  line-height: 1.5;
  padding: 0.75em 1em;
  background-color: #fff;
  border: 1px #c8d6e5 solid;
  border-radius: 4px;
  outline: none;
  color: #0f151c;
  font-size: 16px;
  font-family: inherit;
  resize: vertical;
  transition: border 200ms ease, transform 200ms ease, box-shadow 200ms ease,
    font-size 200ms ease;

  &:hover,
  &:focus {
    border-color: #0f151c;
    transform: translate3d(0px, -2px, 0px);
    box-shadow: 0px 0px 10px #222f3e3f, 0px 10px 20px #222f3e1f;
  }

  &::placeholder {
    color: #c8d6e5;
    font-size: 1em;
  }

  ${({ size }) => SIZE_CSS[size]}
`;

const SIZE_CSS: Record<TextInputSize, FlattenSimpleInterpolation> = {
  [TextInputSize.medium]: css`
    font-size: 16px;
  `,
  [TextInputSize.large]: css`
    font-size: 20px;
  `
};
