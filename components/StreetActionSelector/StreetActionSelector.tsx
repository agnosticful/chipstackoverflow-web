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

  const onFoldButtonClick = React.useCallback(() => {
    setAction(StreetAction.fold);
    onChange(previousBetSize);
  }, [previousBetSize]);

  const onCheckOrCallButtonClick = React.useCallback(() => {
    setAction(StreetAction.checkOrCall);
    onChange(tableMaxBetSize);
  }, [tableMaxBetSize]);

  const onBetOrRaiseButtonClick = React.useCallback(() => {
    setAction(StreetAction.betOrRaise);
    onChange(parseFloat(inputRef.current!.value));

    inputRef.current!.focus();
  }, []);

  const onBetSizeChange = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) =>
      onChange(parseFloat(e.currentTarget.value)),
    []
  );

  return (
    <Root {...props}>
      <SelectableButton
        onClick={onFoldButtonClick}
        active={action === StreetAction.fold}
        data-test-id="fold-button"
      >
        Fold
      </SelectableButton>

      <SelectableButton
        onClick={onCheckOrCallButtonClick}
        active={action === StreetAction.checkOrCall}
        data-test-id="check-or-call-button"
      >
        {tableMaxBetSize === previousBetSize ? "Check" : "Call"}
      </SelectableButton>

      <SelectableButton
        tabIndex={action === StreetAction.betOrRaise ? -1 : 0}
        onClick={onBetOrRaiseButtonClick}
        active={action === StreetAction.betOrRaise}
        data-test-id="bet-or-raise-button"
      >
        {tableMaxBetSize === 0 ? "Bet" : "Raise"}

        <BetSizeInput
          type="number"
          min={tableMaxBetSize + minBetSizeDiff}
          max={99999999}
          defaultValue={tableMaxBetSize + minBetSizeDiff}
          placeholder={`${tableMaxBetSize}`}
          tabIndex={action === StreetAction.betOrRaise ? 0 : -1}
          onChange={onBetSizeChange}
          ref={inputRef}
          key={`${tableMaxBetSize}`}
          active={action === StreetAction.betOrRaise}
          data-test-id="bet-size-input"
        />

        {action === StreetAction.betOrRaise ? "BB" : null}
      </SelectableButton>
    </Root>
  );
}

enum StreetAction {
  fold = "f",
  checkOrCall = "c",
  betOrRaise = "r"
}

const Root = styled.div`
  display: inline-block;
  border-radius: 4px;
  box-shadow: 0px 0px 8px #222f3e1f, 0px 8px 16px #222f3e0f;
  transition: box-shadow 200ms ease, transform 200ms ease;

  :hover {
    box-shadow: 0px 0px 8px #222f3e3f, 0px 8px 16px #222f3e1f;
    transform: translate3d(0px, -2px, 0px);
  }
`;

const SelectableButton = styled.button<{ active: boolean }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 96px;
  height: 32px;
  padding: 0 12px;
  background: #0f151c;
  border-color: transparent;
  border-style: solid;
  border-top-width: 1px;
  border-bottom-width: 1px;
  border-left-width: 1px;
  border-right-width: 0px;
  outline: none;
  color: #fff;
  font-size: 14px;
  -webkit-font-smoothing: antialiased;
  cursor: pointer;
  transition: width 200ms ease, background 200ms ease, border 200ms ease,
    color 200ms ease;

  :first-child {
    border-top-left-radius: 4px;
    border-bottom-left-radius: 4px;
  }

  :last-child {
    border-right-width: 1px;
    border-top-right-radius: 4px;
    border-bottom-right-radius: 4px;
  }

  :hover,
  :focus {
    background: #fff;
    border-color: #0f151c;
    color: #0f151c;
  }

  ${({ active }) =>
    active
      ? `background: #fff;
         border-color: #0f151c;
         color: #0f151c;`
      : ""}
`;

const BetSizeInput = styled.input<{ active: boolean }>`
  box-sizing: border-box;
  width: ${({ active }) => (active ? "80px" : "0")};
  background: transparent;
  line-height: 30px;
  padding: ${({ active }) => (active ? "0 8px" : "0")};
  border: none;
  outline: none;
  color: #0f151c;
  font-size: 14px;
  text-align: right;
  transition: width 200ms ease, padding 200ms ease;

  ::placeholder {
    color: ${({ active }) => (active ? "#c8d6e5" : "transparent")};
    transition: color 200ms ease;
  }

  ::-webkit-outer-spin-button,
  ::-webkit-inner-spin-button {
    appearance: none;
    margin: 0;
  }

  &[type="number"] {
    -moz-appearance: textfield;
  }
`;
