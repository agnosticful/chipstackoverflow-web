import * as React from "react";
import Select, { Option } from "@@/components/Select";

interface Props extends React.Attributes {
  defaultValue?: string;
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>, value: string) => void;
  className?: string;
  style?: React.CSSProperties;
}

export default function GameTypeSelect({
  defaultValue,
  onChange,
  ...props
}: Props) {
  return (
    <Select defaultValue={defaultValue} onChange={onChange} {...props}>
      <Option value={GameType.cash}>{GameType.cash}</Option>
      <Option value={GameType.tournament}>{GameType.tournament}</Option>
    </Select>
  );
}

enum GameType {
  cash = "CASH",
  tournament = "TOURNAMENT",
}
