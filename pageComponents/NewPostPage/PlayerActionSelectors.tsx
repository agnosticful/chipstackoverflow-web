import * as React from "react";
import styled from "styled-components";
import StreetActionSelector from "@@/components/StreetActionSelector";
import { MOBILE_MEDIA } from "@@/constants/mediaquery";
import { HandAction, HandActionType, HandStreet } from "@@/models/Hand";
import getPositionByPlayerAndIndex from "@@/utilities/getPositionByPlayerAndIndex";

interface Props extends React.Attributes {
  playerLength: number;
  street: HandStreet;
  playerActions: HandAction[];
  onChange?: (index: number, type: HandActionType, betSize: number) => void;
  className?: string;
  style?: React.CSSProperties;
}

export default function PlayerActionSelectors({
  playerLength,
  street,
  playerActions,
  onChange = () => undefined,
  ...props
}: Props) {
  let _tableMaxBetSize = 0;
  const previousBetSizeMap = new Map(
    Array.from({ length: playerLength }, (_, playerIndex) => [
      playerIndex,
      street === HandStreet.preflop && playerIndex === 1 ? 1 : 0,
    ])
  );

  return (
    <Root {...props}>
      {playerActions.map(({ playerIndex, betSize }, index) => {
        const tempTableMaxBetSize = _tableMaxBetSize;
        _tableMaxBetSize = betSize;
        const tempPreviousBetSize = previousBetSizeMap.get(playerIndex);
        previousBetSizeMap.set(playerIndex, betSize);

        return (
          <PlayerAction key={`player-actions-${street}-${index}`}>
            <SmallTitle>
              {getPositionByPlayerAndIndex(playerLength, playerIndex)}
            </SmallTitle>

            <StreetActionSelector
              tableMaxBetSize={tempTableMaxBetSize}
              previousBetSize={tempPreviousBetSize}
              onChange={(type, betSize) => onChange(index, type, betSize)}
            />
          </PlayerAction>
        );
      })}
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
  margin-bottom: 8px;

  &:last-child {
    margin-bottom: 0;
  }

  & > span {
    box-sizing: border-box;
    display: flex;
    width: 72px;
    align-items: center;
    justify-content: flex-end;
    margin-right: 16px;
  }

  ${MOBILE_MEDIA} {
    flex-direction: column;
    width: inherit;

    & > span {
      box-sizing: content-box;
      display: block;
      margin: 0 0 4px 0;
      width: inherit;
    }
  }
`;

const SmallTitle = styled.span`
  font-family: inherit;
`;
