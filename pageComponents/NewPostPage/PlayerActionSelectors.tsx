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
          <React.Fragment key={index}>
            <SmallTitle>{`${position}:`}</SmallTitle>

            <div>
              <StreetActionSelector
                tableMaxBetSize={tableMaxBetSize}
                previousBetSize={previousBetSize}
                onChange={(type, betSize) => {
                  onChange(index, type, betSize);
                }}
              />
            </div>
          </React.Fragment>
        )
      )}
    </PlayerActions>
  );
}

const SmallTitle = styled.span`
  font-family: inherit;
`;

const PlayerActions = styled.div`
  display: grid;
  grid-template-columns: 88px 1fr;
  grid-gap: 16px;

  & > span {
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }

  ${MOBILE_MEDIA} {
    grid-template-columns: 1fr;

    & > span {
      display: inline-block;
    }
  }
`;
