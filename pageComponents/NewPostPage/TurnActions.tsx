import * as React from "react";
import styled from "styled-components";
import { MOBILE_MEDIA } from "../../constants/mediaquery";
import SelectablePlayingCard from "../../components/SelectablePlayingCard";
import StreetActionSelector from "../../components/StreetActionSelector";
import { GameStreetActionType } from "../../models/GameSituation";
import PlayingCard from "../../models/PlayingCard";

interface Props extends React.Attributes {
  communityCard?: PlayingCard;
  turnActions: {
    position: string;
    type: GameStreetActionType;
    playerIndex: number;
    betSize: number;
    tableMaxBetSize: number;
    previousBetSize: number;
  }[];
}

export default function TurnActions({ communityCard, turnActions }: Props) {
  return (
    <>
      {0 < turnActions.length ? (
        <>
          <PartTitle>
            Turn <SmallTitle>(Heads-up)</SmallTitle>
          </PartTitle>

          <CommunityCardsArea>
            <SmallTitle>Card:</SmallTitle>
            <div>
              <SelectablePlayingCard
                initialRank={communityCard ? communityCard.rank : undefined}
                initialSuit={communityCard ? communityCard.suit : undefined}
              />
            </div>
          </CommunityCardsArea>

          <PlayerActions>
            {turnActions.map(
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
      ) : null}
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

const CommunityCardsArea = styled.section`
  display: grid;
  grid-template-columns: 90px 200px;
  grid-gap: 16px;
  margin-bottom: 32px;

  & > span {
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }

  & > div {
    display: flex;
    justify-content: start;
    align-items: center;
    height: 100%;
    width: 100%;
  }

  ${MOBILE_MEDIA} {
    grid-template-columns: 40px 1fr;
  }
`;
