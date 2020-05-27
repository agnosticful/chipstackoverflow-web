import * as React from "react";
import styled from "styled-components";
import useRect from "@@/hooks/useRect";

interface Props extends React.Attributes {
  value?: number;
  defaultValue?: number;
  /**
   * The left-edge value. Inclusive.
   */
  min?: number;
  /**
   * The right-edge value. Inclusive.
   */
  max?: number;
  onChange?: (value: number) => void;
  className?: string;
  style?: React.CSSProperties;
}

/**
 * An UI component lets users seek a certain point in sequences such like videos.
 */
export default function SeekBar({
  value: givenValue,
  defaultValue = 0,
  min = 0,
  max = 20,
  onChange = () => {},
  ...props
}: Props) {
  const [ref, rect] = useRect();
  const [value, setValue] = React.useState(givenValue ?? defaultValue);
  const [isDragging, setDragging] = React.useState(false);
  const [draggingX, setDraggingX] = React.useState(0);
  const length = max - min;

  React.useEffect(() => {
    setValue(givenValue === undefined ? defaultValue : givenValue);
  }, [givenValue]);

  const onMouseDown = (e: React.MouseEvent<HTMLElement>) => {
    const mouseMoveEventListner = (e: MouseEvent) => {
      const relativeX = e.clientX - rect.left;
      const closestValue = Math.round((relativeX / rect.width) * length + min);
      const validClosestValue = Math.min(max, Math.max(min, closestValue));

      setDraggingX(Math.min(Math.max(relativeX, 0), rect.width));

      if (givenValue === undefined) {
        setValue(validClosestValue);
      }

      onChange(validClosestValue);
    };

    const mouseUpEventListener = () => {
      window.removeEventListener("mousemove", mouseMoveEventListner);
      window.removeEventListener("mouseup", mouseUpEventListener);

      setDragging(false);
    };

    window.addEventListener("mousemove", mouseMoveEventListner);
    window.addEventListener("mouseup", mouseUpEventListener);

    const relativeX = e.clientX - rect.left;
    const closestValue = Math.round((relativeX / rect.width) * length + min);
    const validClosestValue = Math.min(max, Math.max(min, closestValue));

    setDragging(true);
    setDraggingX(Math.min(Math.max(relativeX, 0), rect.width));

    if (givenValue === undefined) {
      setValue(validClosestValue);
    }

    onChange(validClosestValue);
  };

  return (
    <Root onMouseDown={onMouseDown} ref={ref} {...props}>
      <Indicator
        style={{
          width: isDragging
            ? `${draggingX}px`
            : `${((value - min) / length) * rect.width}px`,
        }}
        isDragging={isDragging}
      />
    </Root>
  );
}

const Root = styled.div`
  position: relative;
  height: 6px;
  background-color: #c8d6e5;
  border-radius: 2px;
  cursor: pointer;

  @media (prefers-color-scheme: dark) {
    background: #576574;
  }
`;

const Indicator = styled.div<{ isDragging: boolean }>`
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  background-color: #f53333;
  border-radius: 2px;

  ${({ isDragging }) =>
    isDragging ? "" : "transition: width 150ms ease-in-out 0ms;"}
`;
