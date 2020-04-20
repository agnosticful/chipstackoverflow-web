import * as React from "react";
import styled from "styled-components";
import StreetActionSelector from "../../components/StreetActionSelector";
import { MOBILE_MEDIA } from "../../constants/mediaquery";
import {
  GameStreetAction,
  GameStreetActionType,
} from "../../models/GameSituation";

interface Props extends React.Attributes {
  playerActions: {
    position: string;
    gameStreetAction: GameStreetAction;
    tableMaxBetSize: number;
    previousBetSize: number;
  }[];
  onChange?: (
    index: number,
    type: GameStreetActionType,
    betSize: number
  ) => void;
}

export default function PlayerActionSelectors({
  playerActions,
  onChange = () => undefined,
}: Props) {
  return (
    <PlayerActions>
      {playerActions.map(
        ({ position, tableMaxBetSize, previousBetSize }, index) => (
          <PlayerAction key={index}>
            <SmallTitle>{`${position}:`}</SmallTitle>

            <StreetActionSelector
              tableMaxBetSize={tableMaxBetSize}
              previousBetSize={previousBetSize}
              onChange={(type, betSize) => {
                onChange(index, type, betSize);
              }}
            />
          </PlayerAction>
        )
      )}
    </PlayerActions>
  );
}

const PlayerActions = styled.div`
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
