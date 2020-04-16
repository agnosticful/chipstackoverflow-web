import * as React from "react";
import styled from "styled-components";
import { MOBILE_MEDIA } from "../../constants/mediaquery";
import SelectablePlayingCard from "../../components/SelectablePlayingCard";
import PlayingCard from "../../models/PlayingCard";

interface Props extends React.Attributes {
  totalPotSize: number;
  playerCards: {
    position: string;
    left?: PlayingCard;
    right?: PlayingCard;
  }[];
}

export default function Showdown({ totalPotSize, playerCards }: Props) {
  return (
    <>
      {0 < playerCards.length ? (
        <>
          <PartTitle>
            Showdown{" "}
            <SmallTitle>{`(Total pot: ${totalPotSize} BB)`}</SmallTitle>
          </PartTitle>

          <PlayersHand>
            {playerCards.map(({ position, left, right }, index) => (
              <React.Fragment key={index}>
                <SmallTitle>{`${position}:`}</SmallTitle>
                <PlayerHand>
                  <SelectablePlayingCard
                    initialRank={left ? left.rank : undefined}
                    initialSuit={left ? left.suit : undefined}
                  />
                  <SelectablePlayingCard
                    initialRank={right ? right.rank : undefined}
                    initialSuit={right ? right.suit : undefined}
                  />
                </PlayerHand>
              </React.Fragment>
            ))}
          </PlayersHand>
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

const PlayersHand = styled.div`
  display: grid;
  grid-template-columns: 90px 150px;
  grid-gap: 16px;

  & > span {
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }

  ${MOBILE_MEDIA} {
    grid-template-columns: 60px 1fr;
  }
`;

const PlayerHand = styled.div`
  & > div:first-child {
    margin-right: 8px;
  }
`;
