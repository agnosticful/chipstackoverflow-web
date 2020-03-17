import * as React from 'react';
import styled, { FlattenSimpleInterpolation, css } from 'styled-components';
import TextInput, { InputSize, InputType } from './TextInput';

interface Props extends React.Attributes {
  fullWidth?: boolean;
  rows?: number;
  placeholder?: string;
  size?: InputSize;
  type?: InputType;
  onChange?: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
}

export default function TextInputWithIcon({
  placeholder,
  size = InputSize.medium,
  type = InputType.text,
  onChange,
  children,
  ...props
}: Props) {
  return (
    <Root size={size} {...props}>
      <TextInput placeholder={placeholder} type={type} onChange={onChange} />
      {children}
    </Root>
  );
}

const Root = styled.div<{
  size: InputSize;
}>`
  display: inline-block;
  border: solid 1px #576574;
  border-radius: 4px;

  & > input {
    border: none;
    outline: none;

    &: focus {
      outline: none;
    }
  }

  & svg {
    color: #576574;
    vertical-align: middle;
  }
  ${({ size }) => SIZE_CSS[size]}
`;

const SIZE_CSS: Record<InputSize, FlattenSimpleInterpolation> = {
  [InputSize.large]: css`
    & > input {
      min-width: 198px;
      height: 46px;
    }

    & > svg {
      width: 20px;
      height: 20px;
      margin: 0 6px 6px 0;
    }
  `,
  [InputSize.medium]: css`
    & > input {
      min-width: 134px;
      height: 38px;
    }

    & > svg {
      width: 20px;
      height: 20px;
      margin: 0 6px 6px 0;
    }
  `,
  [InputSize.small]: css`
    & > input {
      min-width: 76px;
      height: 30px;
    }

    & > svg {
      width: 16px;
      height: 16px;
      margin: 0 4px 4px 0;
    }
  `
};
