import * as React from "react";
import styled from "styled-components";

interface Props extends React.Attributes {
  /** The height will adjust to this value. */
  rows?: number;
  /** The maximum height will adjust to this value. `Infinity` is default. */
  maxRows?: number;
  /** If it allows users to resize or not. */
  resizable?: boolean;
  placeholder?: string;
  defaultValue?: string;
  onChange?: React.ChangeEventHandler<HTMLTextAreaElement>;
  className?: string;
  style?: React.CSSProperties;
}

/**
 * An UI component that allows users input multi-line text.
 */
export default function TextArea({
  rows = 5,
  maxRows = Infinity,
  resizable = true,
  onChange,
  ...props
}: Props) {
  return (
    <Root _rows={rows} maxRows={maxRows} resizable={resizable} {...props} />
  );
}

const Root = styled.textarea<{
  _rows: number;
  maxRows: number;
  resizable: boolean;
}>`
  box-sizing: border-box;
  width: 100%;
  min-height: calc(1.5em * ${({ _rows }) => _rows} + (16px - 0.25em) * 2 + 2px);
  max-height: ${({ _rows, maxRows }) =>
    maxRows === Infinity
      ? "none"
      : `calc(1.5em * ${Math.max(
          _rows,
          maxRows
        )} + (16px - 0.25em) * 2 + 2px)`};
  height: calc(1.5em * ${({ _rows }) => _rows} + (16px - 0.25em) * 2 + 2px);
  line-height: 1.5;
  padding: calc(16px - 0.25em) 16px;
  background-color: #fff;
  border: 1px #c8d6e5 solid;
  border-radius: 4px;
  outline: none;
  color: #0f151c;
  font-size: 16px;
  font-family: inherit;
  resize: ${({ resizable }) => (resizable ? "vertical" : "none")};
  transition: border 200ms ease, transform 200ms ease, box-shadow 200ms ease;

  &:hover,
  &:focus {
    border-color: #0f151c;
    transform: translate3d(0px, -2px, 0px);
    box-shadow: 0px 0px 10px #222f3e3f, 0px 10px 20px #222f3e1f;
  }

  &::placeholder {
    color: #c8d6e5;
    font-size: 16px;
  }
`;
