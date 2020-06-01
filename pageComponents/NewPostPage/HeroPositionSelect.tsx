import * as React from "react";
import Select, { Option } from "../../components/Select";
import { POSITION_CORRESPONDENCE_EACH_PLAYER_LENGTH } from "../../utilities/getPositionByPlayerAndIndex";

interface Props extends React.Attributes {
  playerLength: number;
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>, value: string) => void;
  className?: string;
  style?: React.CSSProperties;
}

export default function HeroPositionSelect({
  playerLength,
  onChange,
  ...props
}: Props) {
  const [positions, setPositions] = React.useState(
    POSITION_CORRESPONDENCE_EACH_PLAYER_LENGTH.get(2)
  );

  React.useEffect(() => {
    setPositions(POSITION_CORRESPONDENCE_EACH_PLAYER_LENGTH.get(playerLength));
  }, [playerLength]);

  return (
    <Select defaultValue={positions![0]} onChange={onChange} {...props}>
      {positions!.map((val) => (
        <Option key={val} value={val}>{`${val}`}</Option>
      ))}
    </Select>
  );
}
