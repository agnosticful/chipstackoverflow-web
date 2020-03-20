import * as React from "react";
import styled from "styled-components";

interface Props extends React.Attributes {
  placeholder?: string;
  defaultValue?: number;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>, value: number) => void;
  className?: string;
  style?: React.CSSProperties;
}

/**
 * An UI component that allows users input bet/blind/stack size.
 */
export default function BetSizeInput({
  placeholder,
  defaultValue,
  onChange = () => undefined,
  ...props
}: Props) {
  const inputRef = React.useRef<HTMLInputElement>(null);
  const onRootClick = React.useCallback(() => inputRef.current!.focus(), []);
  const onInputChange = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) =>
      onChange(e, parseFloat(e.currentTarget.value)),
    []
  );

  return (
    <Root onClick={onRootClick} {...props}>
      <Input
        type="number"
        min={0}
        placeholder={placeholder}
        defaultValue={defaultValue}
        onChange={onInputChange}
        ref={inputRef}
      />

      <Suffix>BB</Suffix>
    </Root>
  );
}

const Root = styled.div`
  box-sizing: border-box;
  display: grid;
  grid-template-columns: 1fr auto;
  grid-template-areas: "input suffix";
  align-items: center;
  width: 96px;
  padding-right: 1em;
  background-color: #fff;
  border: 1px #c8d6e5 solid;
  border-radius: 4px;
  font-size: 16px;
  cursor: text;
  transition: border 200ms ease, transform 200ms ease, box-shadow 200ms ease,
    font-size 200ms ease;

  :hover,
  :focus-within {
    border-color: #0f151c;
    transform: translate3d(0px, -2px, 0px);
    box-shadow: 0px 0px 10px #222f3e3f, 0px 10px 20px #222f3e1f;
  }
`;

const Input = styled.input`
  --line-height: 1.5;
  --padding: 0.75em;
  grid-area: input;
  box-sizing: border-box;
  width: 100%;
  line-height: var(--line-height);
  padding-top: calc(var(--padding) - 1em * (var(--line-height) - 1) / 2);
  padding-bottom: calc(var(--padding) - 1em * (var(--line-height) - 1) / 2);
  padding-left: var(--padding);
  padding-right: 0.25em;
  background-color: transparent;
  border: none;
  outline: none;
  color: #0f151c;
  font-size: inherit;
  font-family: inherit;
  text-align: right;
  transition: font-size 200ms ease;

  &::placeholder {
    color: #c8d6e5;
    font-size: 1em;
  }

  ::-webkit-outer-spin-button,
  ::-webkit-inner-spin-button {
    appearance: none;
    margin: 0;
  }

  &[type="number"] {
    -moz-appearance: textfield;
  }
`;

const Suffix = styled.span`
  grid-area: suffix;
  color: #0f151c;
`;
