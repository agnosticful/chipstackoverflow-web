import * as React from "react";
import styled, { FlattenSimpleInterpolation, css } from "styled-components";

interface Props extends React.Attributes {
  multiline?: boolean;
  rows?: number;
  placeholder?: string;
  size?: TextInputSize;
  onChange?: (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  className?: string;
  style?: React.CSSProperties;
}

export default function InputText({
  multiline = false,
  placeholder = "",
  rows = 0,
  size = TextInputSize.regular,
  onChange,
  ...props
}: Props) {
  return multiline ? (
    <TextAreaRoot
      rows={rows}
      placeholder={placeholder}
      size={size}
      onChange={onChange}
      {...props}
    />
  ) : (
    <TextInputRoot
      type="text"
      placeholder={placeholder}
      size={size}
      onChange={onChange}
      {...props}
    />
  );
}

export enum TextInputSize {
  fullWidth,
  large,
  regular,
  small
}

const TextInputRoot = styled.input<{
  size: TextInputSize;
}>`
  background-color: #fff;
  border: solid 1px #576574;
  border-radius: 4px;
  color: #576574;
  font-size: 16px;
  height: 32px;
  padding-left: 4px;

  &:: placeholder {
    font-size: 16px;
  }

  ${({ size }) => SIZE_CSS[size]}
`;

const TextAreaRoot = styled.textarea<{
  size: TextInputSize;
}>`
  background-color: #fff;
  border: solid 1px #576574;
  border-radius: 4px;
  color: #576574;
  font-size: 16px;
  padding-left: 4px;

  &:: placeholder {
    font-size: 16px;
  }

  ${({ size }) => SIZE_CSS[size]}
`;

const SIZE_CSS: Record<TextInputSize, FlattenSimpleInterpolation> = {
  [TextInputSize.fullWidth]: css`
    width: 100%;
  `,
  [TextInputSize.large]: css`
    width: 320px;
  `,
  [TextInputSize.regular]: css`
    width: 160px;
  `,
  [TextInputSize.small]: css`
    width: 80px;
  `
};
