import * as React from "react";
import styled from "styled-components";
import StreetActionSelector from "@@/components/StreetActionSelector";
import { MOBILE_MEDIA } from "@@/constants/mediaquery";
import { HandActionType } from "@@/models/Hand";
import { HandInputTypeAction } from "@@/models/HandInputType";
import getPositionByPlayerAndIndex from "@@/utilities/getPositionByPlayerAndIndex";

interface Props extends React.Attributes {
  playerLength: number;
  playerActions: HandInputTypeAction[];
  onChange?: (index: number, type: HandActionType, betSize: number) => void;
  className?: string;
  style?: React.CSSProperties;
}

export default function StreetActionInput({
  playerLength,
  playerActions,
  onChange,
  ...props
}: Props) {
  return (
    <Root {...props}>
      {playerActions.map(
        ({ playerIndex, previousBetSize, tableMaxBetSize }, index) => {
          return (
            <PlayerAction key={index}>
              <Label>
                {`${getPositionByPlayerAndIndex(playerLength, playerIndex)}:`}
              </Label>

              <StreetActionSelector
                tableMaxBetSize={tableMaxBetSize}
                previousBetSize={previousBetSize}
                onChange={(type, betSize) =>
                  onChange && onChange(index, type, betSize)
                }
              />
            </PlayerAction>
          );
        }
      )}
    </Root>
  );
}

const Root = styled.div`
  display: inline-flex;
  flex-direction: column;
`;

const PlayerAction = styled.div`
  display: flex;
  flex-direction: row;
  margin-bottom: 16px;

  &:last-child {
    margin-bottom: 0;
  }

  ${MOBILE_MEDIA} {
    flex-direction: column;
    width: inherit;
  }
`;

const Label = styled.label`
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  width: 50px;
  margin-right: 8px;
  font-size: 20px;

  ${MOBILE_MEDIA} {
    box-sizing: content-box;
    display: block;
    margin: 0 0 4px 0;
    width: inherit;
  }
`;
