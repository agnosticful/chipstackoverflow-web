import * as React from "react";
import styled from "styled-components";
import { HandActionType } from "@@/models/Hand";

interface Props extends React.Attributes {
  /**
   * The bet size that the current aggressor made.
   * */
  tableMaxBetSize?: number;
  /**
   * The bet size that the same player already made.
   * If it's preflop and the player seats at BB, the value should be `1`.
   * `previousBetSize` must be less than or equal `tableMaxBetSize`.
   **/
  previousBetSize?: number;
  onChange?: (type: HandActionType, betSize: number) => void;
  className?: string;
  style?: React.CSSProperties;
}

export default function HandActionTypeSelector({
  tableMaxBetSize = 0,
  previousBetSize = 0,
  onChange = () => undefined,
  ...props
}: Props) {
  if (previousBetSize > tableMaxBetSize) {
    throw new Error(
      "previousBetSize must be less than or equal tableMaxBetSize."
    );
  }

  const inputRef = React.useRef<HTMLInputElement>(null);
  const [action, setAction] = React.useState<HandActionType | null>(null);

  const onFoldButtonClick = React.useCallback(() => {
    setAction(HandActionType.fold);
    onChange(HandActionType.fold, previousBetSize);
  }, [previousBetSize]);

  const onCheckOrCallButtonClick = React.useCallback(() => {
    const action =
      tableMaxBetSize === 0 ? HandActionType.check : HandActionType.call;

    setAction(action);
    onChange(action, tableMaxBetSize);
  }, [tableMaxBetSize]);

  const onBetOrRaiseButtonClick = React.useCallback(() => {
    const action =
      tableMaxBetSize === 0 ? HandActionType.bet : HandActionType.raise;

    setAction(action);
    onChange(action, parseFloat(inputRef.current!.value));

    inputRef.current!.focus();
  }, []);

  const onBetSizeChange = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) =>
      onChange(
        tableMaxBetSize === 0 ? HandActionType.bet : HandActionType.raise,
        parseFloat(e.currentTarget.value)
      ),
    []
  );

  return (
    <Root {...props}>
      <SelectableButton
        onClick={onFoldButtonClick}
        active={action === HandActionType.fold}
        data-test-id="fold-button"
      >
        Fold
      </SelectableButton>

      <SelectableButton
        onClick={onCheckOrCallButtonClick}
        active={
          action === HandActionType.check || action === HandActionType.call
        }
        data-test-id="check-or-call-button"
      >
        {tableMaxBetSize === previousBetSize ? "Check" : "Call"}
      </SelectableButton>

      <SelectableButton
        tabIndex={
          action === HandActionType.bet || action === HandActionType.raise
            ? -1
            : 0
        }
        onClick={onBetOrRaiseButtonClick}
        active={
          action === HandActionType.bet || action === HandActionType.raise
        }
        data-test-id="bet-or-raise-button"
      >
        {tableMaxBetSize === 0 ? "Bet" : "Raise"}

        <BetSizeInput
          type="number"
          min={0}
          max={99999999}
          defaultValue={tableMaxBetSize}
          placeholder={`${tableMaxBetSize}`}
          tabIndex={
            action === HandActionType.bet || action === HandActionType.raise
              ? 0
              : -1
          }
          onChange={onBetSizeChange}
          ref={inputRef}
          key={`${tableMaxBetSize}`}
          active={
            action === HandActionType.bet || action === HandActionType.raise
          }
          data-test-id="bet-size-input"
        />

        {action === HandActionType.bet || action === HandActionType.raise
          ? "BB"
          : null}
      </SelectableButton>
    </Root>
  );
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
