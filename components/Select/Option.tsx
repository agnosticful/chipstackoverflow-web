import * as React from "react";

export interface Props<Value> extends React.Attributes {
  /** This value will be used in `<Select>`'s `defaultValue` and `onChange`. Enums are recommended. */
  value: Value;
  className?: string;
  style?: React.CSSProperties;
  children?: string;
}

export default function Option<Value extends string>({
  value,
  ...props
}: Props<Value>) {
  return <option value={value} {...props} />;
}
