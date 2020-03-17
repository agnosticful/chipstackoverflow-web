import * as React from "react";
import styled, { FlattenSimpleInterpolation, css } from "styled-components";

interface Props extends React.Attributes {
  fullWidth?: boolean;
  placeholder?: string;
  rows?: number;
  size?: InputSize;
  type?: InputType;
  onChange?: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
  className?: string;
  style?: React.CSSProperties;
}

export default function TextInput({
  fullWidth = false,
  placeholder = "",
  rows = 1,
  size = InputSize.medium,
  type = InputType.text,
  onChange,
  ...props
}: Props) {
  const [value, setValue] = React.useState("");
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const val = e.currentTarget.value;
    if (type === InputType.number && !val.match(/[^0-9]/)) setValue(val);
    else setValue(val);
    if (onChange) onChange(e);
  };

  return 1 < rows ? (
    <TextAreaRoot
      fullWidth={fullWidth}
      placeholder={placeholder}
      rows={rows}
      size={size}
      value={value}
      onChange={handleChange}
      {...props}
    />
  ) : (
    <TextInputRoot
      type={type}
      fullWidth={fullWidth}
      placeholder={placeholder}
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

export enum InputType {
  text = "text",
  number = "number"
}

const TextInputRoot = styled.input<{
  fullWidth: boolean;
  size: InputSize;
}>`
  background-color: #fff;
  border: solid 1px #576574;
  border-radius: 4px;
  color: #576574;
  font-size: 16px;
  height: 32px;
  padding: 0 0 0 8px;

  &:focus {
    outline: solid 1px #576574;
  }

  &:: placeholder {
    font-size: 16px;
  }

  ${({ fullWidth }) => (fullWidth ? "width: 100%;" : "")}
  ${({ size }) => SIZE_CSS[size]}
`;

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

  ${({ fullWidth }) => (fullWidth ? "width: 100%;" : "")}
  ${({ size }) => SIZE_CSS[size]}
`;

const SIZE_CSS: Record<InputSize, FlattenSimpleInterpolation> = {
  [InputSize.large]: css`
    min-width: 224px;
    height: 46px;
  `,
  [InputSize.medium]: css`
    min-width: 160px;
    height: 38px;
  `,
  [InputSize.small]: css`
    min-width: 96px;
    height: 30px;
  `
};
