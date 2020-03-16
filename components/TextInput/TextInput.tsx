import * as React from "react";
import styled, { FlattenSimpleInterpolation, css } from "styled-components";

interface Props extends React.Attributes {
  placeholder?: string;
  size?: TextInputSize;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  style?: React.CSSProperties;
}

export default function InputText({
  placeholder = "",
  size = TextInputSize.regular,
  onChange,
  ...props
}: Props) {
  return (
    <Root
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

const Root = styled.input<{
  size: TextInputSize;
}>`
  height: 32px;
  padding-left: 4px;
  border: solid 1px #576574;
  color: #576574;
  background-color: #fff;
  border-radius: 4px;

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
