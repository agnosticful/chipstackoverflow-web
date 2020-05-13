import { action } from "@storybook/addon-actions";
import { select } from "@storybook/addon-knobs";
import * as React from "react";
import Select, { Option } from "@@/components/Select";

export default {
  title: "Select",
  component: Select,
  subcomponents: { Option },
};

export const example = () => {
  const defaultValue = select("defaultValue", T_SHIRT_SIZES, TShirtSize.medium);

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "auto auto",
        columnGap: 16,
        alignItems: "center",
        justifyContent: "flex-start",
      }}
    >
      <span>T-shirt Size :</span>

      <Select
        defaultValue={defaultValue}
        onChange={action("onChange")}
        key={defaultValue}
      >
        <Option value={TShirtSize.xxLarge}>XX Large</Option>
        <Option value={TShirtSize.xLarge}>X Large</Option>
        <Option value={TShirtSize.large}>Large</Option>
        <Option value={TShirtSize.medium}>Medium</Option>
        <Option value={TShirtSize.small}>Small</Option>
        <Option value={TShirtSize.xSmall}>X Small</Option>
      </Select>
    </div>
  );
};

export const longContent = () => {
  const defaultValue = select("defaultValue", T_SHIRT_SIZES, TShirtSize.medium);

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "auto 1fr",
        columnGap: 16,
        alignItems: "center",
      }}
    >
      <span>T-shirt Size :</span>

      <Select
        defaultValue={defaultValue}
        onChange={action("onChange")}
        key={defaultValue}
      >
        <Option value={TShirtSize.xxLarge}>{"XX Large".repeat(100)}</Option>
        <Option value={TShirtSize.xLarge}>{"X Large".repeat(100)}</Option>
        <Option value={TShirtSize.large}>{"Large".repeat(100)}</Option>
        <Option value={TShirtSize.medium}>{"Medium".repeat(100)}</Option>
        <Option value={TShirtSize.small}>{"Small".repeat(100)}</Option>
        <Option value={TShirtSize.xSmall}>{"X Small".repeat(100)}</Option>
      </Select>
    </div>
  );
};

enum TShirtSize {
  xxLarge = "xxLarge",
  xLarge = "xLarge",
  large = "large",
  medium = "medium",
  small = "small",
  xSmall = "xSmall",
}

const T_SHIRT_SIZES = {
  "TShirtSize.xxLarge": TShirtSize.xxLarge,
  "TShirtSize.xLarge": TShirtSize.xLarge,
  "TShirtSize.large": TShirtSize.large,
  "TShirtSize.medium": TShirtSize.medium,
  "TShirtSize.small": TShirtSize.small,
  "TShirtSize.xSmall": TShirtSize.xSmall,
};
