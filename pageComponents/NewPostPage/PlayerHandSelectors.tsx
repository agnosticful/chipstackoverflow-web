import * as React from "react";
import styled from "styled-components";
import { MOBILE_MEDIA } from "@@/constants/mediaquery";
import SelectablePlayingCard from "@@/components/SelectablePlayingCard";
import PlayingCard from "@@/models/PlayingCard";
import getPositionByPlayerAndIndex from "@@/utilities/getPositionByPlayerAndIndex";

interface Props extends React.Attributes {
  playerLength: number;
  playerHands: [PlayingCard | null, PlayingCard | null][];
  activePlayerIndexes: number[];
  onChange?: (
    index: number,
    type: "LEFT" | "RIGHT",
    playingCard: PlayingCard
  ) => void;
  className?: string;
  style?: React.CSSProperties;
}

export default function PlayerHandSelectors({
  playerLength,
  playerHands,
  activePlayerIndexes,
  onChange = () => {},
  ...props
}: Props) {
  return (
    <Root {...props}>
      {playerHands.map(([left, right], playerIndex) => (
        <Players key={playerIndex}>
          <Label>
            {`${getPositionByPlayerAndIndex(playerLength, playerIndex)}:`}
          </Label>

          <PlayerHand>
            <_SelectablePlayingCard
              initialRank={left ? left.rank : undefined}
              initialSuit={left ? left.suit : undefined}
              onChange={(PlayingCard) =>
                onChange(playerIndex, "LEFT", PlayingCard)
              }
            />

            <_SelectablePlayingCard
              initialRank={right ? right.rank : undefined}
              initialSuit={right ? right.suit : undefined}
              onChange={(PlayingCard) =>
                onChange(playerIndex, "RIGHT", PlayingCard)
              }
            />
          </PlayerHand>
        </Players>
      ))}
    </Root>
  );
}

const Root = styled.div`
  display: inline-flex;
  flex-direction: column;
`;

const Players = styled.div`
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
  font-size: 16px;

  ${MOBILE_MEDIA} {
    box-sizing: content-box;
    display: block;
    margin: 0 0 4px 0;
    width: inherit;
  }
`;

const PlayerHand = styled.div`
  & > div:first-child {
    margin-right: 8px;
  }
`;

const _SelectablePlayingCard = styled(SelectablePlayingCard)`
  width: 48px;
`;
