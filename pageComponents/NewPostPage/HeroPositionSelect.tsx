import * as React from "react";
import Select, { Option } from "@@/components/Select";
import { POSITION_CORRESPONDENCE_EACH_PLAYER_LENGTH } from "@@/utilities/getPositionByPlayerAndIndex";

interface Props extends React.Attributes {
  playerLength: number;
  onChange?: (heroIndex: number) => void;
  className?: string;
  style?: React.CSSProperties;
}

export default function HeroPositionSelect({
  playerLength,
  onChange,
  ...props
}: Props) {
  const [positions, setPositions] = React.useState(
    POSITION_CORRESPONDENCE_EACH_PLAYER_LENGTH.get(playerLength)!
  );

  React.useEffect(() => {
    setPositions(POSITION_CORRESPONDENCE_EACH_PLAYER_LENGTH.get(playerLength)!);
  }, [playerLength]);

  return (
    <Select
      defaultValue={`${positions.length - 1}`}
      onChange={(_, value) => onChange && onChange(Number(value))}
      {...props}
    >
      {positions!.map((val, index) => (
        <Option key={val} value={`${index}`}>{`${val}`}</Option>
      ))}
    </Select>
  );
}
