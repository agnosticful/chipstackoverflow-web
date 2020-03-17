import * as React from "react";
import styled, { FlattenSimpleInterpolation, css } from "styled-components";

interface Props extends React.Attributes {
  fullWidth?: boolean;
  placeholder?: string;
  rows?: number;
  size?: InputSize;
  onChange?: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
  className?: string;
  style?: React.CSSProperties;
}

export default function TextArea({
  fullWidth = false,
  placeholder = "",
  rows = 1,
  size = InputSize.medium,
  onChange,
  ...props
}: Props) {
  return (
    <TextAreaRoot
      fullWidth={fullWidth}
      placeholder={placeholder}
      rows={rows}
      size={size}
      {...props}
    />
  );
}

export enum InputSize {
  large,
  medium,
  small
}

const TextAreaRoot = styled.textarea<{
  fullWidth: boolean;
  size: InputSize;
}>`
  background-color: #fff;
  border: solid 1px #576574;
  border-radius: 4px;
  color: #576574;
  font-size: 16px;
  padding: 8px 0 0 8px;

  &:focus {
    outline: solid 1px #576574;
  }

  &:: placeholder {
    font-size: 16px;
  }

  ${({ size }) => SIZE_CSS[size]}
  ${({ fullWidth }) => (fullWidth ? "width: 100%;" : "")}
`;

const SIZE_CSS: Record<InputSize, FlattenSimpleInterpolation> = {
  [InputSize.large]: css`
    width: 224px;
    height: 46px;
  `,
  [InputSize.medium]: css`
    width: 160px;
    height: 38px;
  `,
  [InputSize.small]: css`
    width: 96px;
    height: 30px;
  `
};
