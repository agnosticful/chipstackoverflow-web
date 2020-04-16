import * as React from "react";
import Option from "../../components/Select/Option";
import Select from "../../components/Select";

interface Props extends React.Attributes {
  defaultValue?: string;
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>, value: string) => void;
  className?: string;
  style?: React.CSSProperties;
}

export default function HeroPositionSelectBox({
  defaultValue,
  onChange,
  ...props
}: Props) {
  return (
    <Select defaultValue={defaultValue} onChange={onChange} {...props}>
      <Option value="sb">SB</Option>
      <Option value="bb">BB</Option>
      <Option value="utg">UTG</Option>
      <Option value="ep2">EP2</Option>
      <Option value="mp1">MP1</Option>
      <Option value="mp2">MP2</Option>
      <Option value="mp3">MP3</Option>
      <Option value="lp1">LP1</Option>
      <Option value="lp2">LP2</Option>
      <Option value="btn">BTN</Option>
    </Select>
  );
}
