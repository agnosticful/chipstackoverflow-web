import * as React from "react";
import styled from "styled-components";
import { ChevronDownIcon } from "../Icon";
import { Props as OptionProps } from "./Option";

interface Props<Value> extends React.Attributes {
  /** If nothing given, the first child will be initially selected. */
  defaultValue?: Value;
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>, value: Value) => void;
  className?: string;
  style?: React.CSSProperties;
  /** Only accepts `<Option>`. */
  children?:
    | React.ReactElement<OptionProps<Value>>
    | React.ReactElement<OptionProps<Value>>[];
}

/**
 * An UI component that allows users select an option.
 */
export default function Select<Value extends string>({
  defaultValue,
  onChange: _onChange = () => undefined,
  children,
  ...props
}: Props<Value>) {
  const onChange = React.useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) =>
      _onChange(e, e.currentTarget.value as Value),
    [defaultValue]
  );

  return (
    <Root {...props}>
      <_Select defaultValue={defaultValue} onChange={onChange}>
        {children}
      </_Select>

      <Arrow />
    </Root>
  );
}

const Root = styled.div`
  box-sizing: border-box;
  display: inline-block;
  position: relative;
  max-width: 100%;
  height: 2.5em;
  background-color: #0f151c;
  border: 1px transparent solid;
  border-radius: 4px;
  color: #fff;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 200ms ease, border 200ms ease,
    box-shadow 200ms ease, color 200ms ease, font-size 200ms ease,
    transform 200ms ease;

  :hover,
  :focus-within {
    background-color: #fff;
    border-color: #0f151c;
    color: #0f151c;
    transform: translate3d(0px, -2px, 0px);
    box-shadow: 0px 0px 10px #222f3e3f, 0px 10px 20px #222f3e1f;
  }
`;

const _Select = styled.select`
  box-sizing: border-box;
  appearance: none;
  width: 100%;
  height: 100%;
  padding-left: 1em;
  padding-right: calc(1em + 24px);
  border-radius: 4px;
  outline: none;
  background-color: inherit;
  border: none;
  color: inherit;
  font-size: inherit;
  font-family: inherit;
  text-overflow: ellipsis;
  cursor: inherit;

  ::placeholder {
    color: #c8d6e5;
    font-size: 1em;
  }

  & > option {
    font-family: -apple-system, system-ui;
  }
`;

const Arrow = styled(ChevronDownIcon)`
  position: absolute;
  top: 50%;
  right: 8px;
  transform: translateY(-50%);
  pointer-events: none;
  z-index: 1;
`;
