import * as React from "react";
import Select, { Option } from "@@/components/Select";

interface Props extends React.Attributes {
  onChange?: (playerLength: number) => void;
  className?: string;
  style?: React.CSSProperties;
}

export default function PlayerLengthSelect({
  onChange = () => {},
  ...props
}: Props) {
  return (
    <Select onChange={(_, value) => onChange(Number(value))} {...props}>
      <Option value={"2"}>Heads-up</Option>
      <Option value={"3"}>3 players</Option>
      <Option value={"4"}>4 players</Option>
      <Option value={"5"}>5 players</Option>
      <Option value={"6"}>6 players</Option>
      <Option value={"7"}>7 players</Option>
      <Option value={"8"}>8 players</Option>
      <Option value={"9"}>9 players</Option>
      <Option value={"10"}>10 players</Option>
    </Select>
  );
}
