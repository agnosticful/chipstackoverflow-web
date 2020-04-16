import * as React from "react";
import styled from "styled-components";
import { MOBILE_MEDIA } from "../../constants/mediaquery";
import StreetActionSelector from "../../components/StreetActionSelector";
import { GameStreetActionType } from "../../models/GameSituation";

interface Props extends React.Attributes {
  preflopActions: {
    position: string;
    type: GameStreetActionType;
    playerIndex: number;
    betSize: number;
    tableMaxBetSize: number;
    previousBetSize: number;
  }[];
}

export default function PreflopActions({ preflopActions }: Props) {
  return (
    <>
      <PartTitle>Preflop</PartTitle>
      <PlayerActions>
        {preflopActions.map(
          ({ position, tableMaxBetSize, previousBetSize }, index) => (
            <React.Fragment key={index}>
              <SmallTitle>{`${position}:`}</SmallTitle>
              <div>
                <StreetActionSelector
                  tableMaxBetSize={tableMaxBetSize}
                  previousBetSize={previousBetSize}
                  onChange={(type, betSize) => {
                    console.log(type, betSize);
                  }}
                />
              </div>
            </React.Fragment>
          )
        )}
      </PlayerActions>
    </>
  );
}

const PartTitle = styled.h2`
  font-family: inherit;
  margin-top: 80px;

  & > span {
    font-size: 16px;
    font-weight: 400;
  }

  ${MOBILE_MEDIA} {
    margin-top: 40px;
  }
`;

const SmallTitle = styled.span`
  font-family: inherit;
`;

const PlayerActions = styled.div`
  display: grid;
  grid-template-columns: 90px 1fr;
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
