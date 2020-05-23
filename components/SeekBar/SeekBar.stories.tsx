import { action } from "@storybook/addon-actions";
import { number } from "@storybook/addon-knobs";
import * as React from "react";
import SeekBar from "@@/components/SeekBar";

export default {
  title: "SeekBar",
  component: SeekBar,
};

export const example = () => (
  <SeekBar
    defaultValue={number("defaultValue", 5, { min: 0 })}
    min={number("min", 0, { min: 0 })}
    max={number("max", 20, { min: 0 })}
    onChange={action("onChange")}
  />
);

export const withMinMax = () => (
  <SeekBar min={10} max={15} defaultValue={12} onChange={action("onChange")} />
);

export const withDefaultValue = () => (
  <SeekBar defaultValue={10} onChange={action("onChange")} />
);

export const controlled = () => {
  const [value, setValue] = React.useState(10);

  React.useEffect(() => {
    const onKeydown = (e: KeyboardEvent) => {
      if (e.keyCode === 37) {
        setValue((value) => Math.max(value - 1, 0));
      }

      if (e.keyCode === 39) {
        setValue((value) => Math.min(value + 1, 20));
      }
    };

    window.addEventListener("keydown", onKeydown);
  }, []);

  return (
    <div>
      <SeekBar value={value} onChange={(value) => setValue(value)} />
      Press ← or → key to move SeekBar
    </div>
  );
};
