import { Radio } from "antd";
import * as React from "react";
import styled from "styled-components";

interface Props extends React.Attributes {
  /** The bet size that the current aggressor made. */
  tableMaxBetSize?: number;
  /** The bet size that the same player already made.
   * If it's preflop and the player seats at BB, the value should be `1`.
   * `previousBetSize` must be less than or equal `tableMaxBetSize`.
   **/
  previousBetSize?: number;
  /** The next minimum raise size will be `tableMaxBetSize` + `minBetSizeDiff`.
   * In general, `previousBetSize` is supposed to be `tableMaxBetSize` - previous `tableMaxBetSize`.
   **/
  minBetSizeDiff?: number;
  onChange?: (betSize: number) => void;
  className?: string;
  style?: React.CSSProperties;
}

export default function StreetActionSelector({
  tableMaxBetSize = 0,
  previousBetSize = 0,
  minBetSizeDiff = 1,
  onChange = () => undefined,
  ...props
}: Props) {
  if (previousBetSize > tableMaxBetSize) {
    throw new Error(
      "previousBetSize must be less than or equal tableMaxBetSize."
    );
  }

  const inputRef = React.useRef<HTMLInputElement>(null);
  const [action, setAction] = React.useState<StreetAction | null>(null);

  return (
    <Radio.Group
      value={action}
      size="large"
      onChange={e => {
        const action = e.target.value;

        setAction(action);

        let newBetSize: number;

        switch (action) {
          case StreetAction.fold:
            newBetSize = previousBetSize;
            break;
          case StreetAction.checkOrCall:
            newBetSize = tableMaxBetSize;
            break;
          case StreetAction.betOrRaise:
            newBetSize = parseFloat(inputRef.current!.value);
            break;
        }

        onChange(newBetSize!);
      }}
      {...props}
    >
      <Radio.Button value={StreetAction.fold}>Fold</Radio.Button>

      <Radio.Button value={StreetAction.checkOrCall}>
        {tableMaxBetSize === previousBetSize ? "Check" : "Call"}
      </Radio.Button>

      <BetButton
        value={StreetAction.betOrRaise}
        onClick={() => {
          inputRef.current!.focus();
        }}
        tabIndex={action === StreetAction.betOrRaise ? -1 : 0}
        active={action === StreetAction.betOrRaise}
      >
        {tableMaxBetSize === 0 ? "Bet" : "Raise"}

        <BetSizeInput
          type="number"
          min={tableMaxBetSize + minBetSizeDiff}
          max={99999999}
          defaultValue={tableMaxBetSize + minBetSizeDiff}
          placeholder={`${tableMaxBetSize}`}
          tabIndex={action === StreetAction.betOrRaise ? 0 : -1}
          onChange={e => {
            if (action !== StreetAction.betOrRaise) return;

            onChange(parseFloat(e.currentTarget.value));
          }}
          ref={inputRef}
          key={`${tableMaxBetSize}`}
          active={action === StreetAction.betOrRaise}
        />

        {action === StreetAction.betOrRaise ? "BB" : null}
      </BetButton>
    </Radio.Group>
  );
}

enum StreetAction {
  fold = "f",
  checkOrCall = "c",
  betOrRaise = "r"
}

const BetButton = styled(Radio.Button)<{ active: boolean }>``;

const BetSizeInput = styled.input<{ active: boolean }>`
  width: ${({ active }) => (active ? "96px" : "0")};
  padding: ${({ active }) => (active ? "0 4px 0 15px" : "0")};
  border: none;
  box-shadow: none;
  outline: none;
  text-align: right;
  opacity: ${({ active }) => (active ? 1 : 0)};
  transition: width 150ms ease-in-out, padding 150ms ease-in-out,
    opacity 150ms ease-in-out;
`;
