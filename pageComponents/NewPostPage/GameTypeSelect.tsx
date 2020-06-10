import * as React from "react";
import Select, { Option } from "@@/components/Select";

interface Props extends React.Attributes {
  defaultValue?: string;
  onChange?: (value: string) => void;
  className?: string;
  style?: React.CSSProperties;
}

export default function GameTypeSelect({
  onChange = () => {},
  ...props
}: Props) {
  return (
    <Select onChange={(_, value) => onChange(value)} {...props}>
      <Option value={GameType.cash}>CASH</Option>
      <Option value={GameType.tournament}>TOURNAMENT</Option>
    </Select>
  );
}

enum GameType {
  cash = "Cash",
  tournament = "Tournament",
}
