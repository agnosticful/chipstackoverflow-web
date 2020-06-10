import * as React from "react";
import styled from "styled-components";
import { MOBILE_MEDIA } from "@@/constants/mediaquery";
import PlayingCard from "@@/components/PortraitPlayingCard";
import getPositionByPlayerAndIndex from "@@/utilities/getPositionByPlayerAndIndex";
import PlayingCardType from "@@/models/PlayingCard";

interface Props extends React.Attributes {
  playerLength: number;
  playerHands: [PlayingCardType | null, PlayingCardType | null][];
  activePlayerIndexes: number[];
  onChange?: (
    index: number,
    type: "LEFT" | "RIGHT",
    playingCard: PlayingCardType
  ) => void;
  className?: string;
  style?: React.CSSProperties;
}

export default function PlayerHandSelectors({
  playerLength,
  playerHands,
  activePlayerIndexes,
  onChange,
  ...props
}: Props) {
  return (
    <Root {...props}>
      {playerHands
        .map(([left, right], playerIndex) => {
          return (
            <PlayerHand key={playerIndex}>
              <Label>
                {`${getPositionByPlayerAndIndex(playerLength, playerIndex)}:`}
              </Label>

              <HeroHand>
                <PlayingCard
                  suit={left ? left.suit : undefined}
                  rank={left ? left.rank : undefined}
                />
                <PlayingCard
                  suit={right ? right.suit : undefined}
                  rank={right ? right.rank : undefined}
                />
              </HeroHand>
            </PlayerHand>
          );
        })
        .filter((_, index) => activePlayerIndexes.includes(index))}
    </Root>
  );
}

const Root = styled.div`
  display: inline-flex;
  flex-direction: column;
`;

const PlayerHand = styled.div`
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

const HeroHand = styled.div`
  & > span {
    width: 48px;
  }

  & > span:first-child {
    margin-right: 8px;
  }
`;
