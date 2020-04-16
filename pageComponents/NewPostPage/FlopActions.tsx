import * as React from "react";
import styled from "styled-components";
import { MOBILE_MEDIA } from "../../constants/mediaquery";
import SelectablePlayingCard from "../../components/SelectablePlayingCard";
import StreetActionSelector from "../../components/StreetActionSelector";
import { GameStreetActionType } from "../../models/GameSituation";
import PlayingCard from "../../models/PlayingCard";

interface Props extends React.Attributes {
  communityCards: {
    left?: PlayingCard;
    center?: PlayingCard;
    right?: PlayingCard;
  };
  flopActions: {
    position: string;
    type: GameStreetActionType;
    playerIndex: number;
    betSize: number;
    tableMaxBetSize: number;
    previousBetSize: number;
  }[];
}

export default function FlopActions({ communityCards, flopActions }: Props) {
  const { left, center, right } = communityCards;

  return (
    <>
      {0 < flopActions.length ? (
        <>
          <PartTitle>
            Flop <SmallTitle>(X players)</SmallTitle>
          </PartTitle>

          <CommunityCardsArea>
            <SmallTitle>Cards:</SmallTitle>
            <CommunityCards>
              <SelectablePlayingCard
                initialRank={left ? left.rank : undefined}
                initialSuit={left ? left.suit : undefined}
              />
              <SelectablePlayingCard
                initialRank={center ? center.rank : undefined}
                initialSuit={center ? center.suit : undefined}
              />
              <SelectablePlayingCard
                initialRank={right ? right.rank : undefined}
                initialSuit={right ? right.suit : undefined}
              />
            </CommunityCards>
          </CommunityCardsArea>

          <PlayerActions>
            {flopActions.map(
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

const CommunityCards = styled.div`
  & > div:first-child,
  & > div:nth-child(2) {
    margin-right: 8px;
  }
`;
