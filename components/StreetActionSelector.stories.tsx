import * as React from "react";
import StreetActionSelector from "./StreetActionSelector";
import { action } from "@storybook/addon-actions";
import { number } from "@storybook/addon-knobs";

export default {
  title: "StreetActionSelector",
  component: StreetActionSelector
};

export const example = () => {
  const tableMaxBetSize = number("tableMaxBetSize", undefined as any, {
    min: 0
  });

  return (
    <StreetActionSelector
      tableMaxBetSize={tableMaxBetSize}
      previousBetSize={number("previousBetSize", undefined as any, {
        min: 0,
        max: tableMaxBetSize
      })}
      minBetSizeDiff={number("minBetSizeDiff", undefined as any, { min: 0 })}
      onChange={action("onChange")}
    />
  );
};

export const whenSomeoneAlreadyBet = () => (
  <StreetActionSelector tableMaxBetSize={22.5} onChange={action("onChange")} />
);

export const atBigBlind = () => (
  <StreetActionSelector
    tableMaxBetSize={1}
    previousBetSize={1}
    minBetSizeDiff={1}
    onChange={action("onChange")}
  />
);
