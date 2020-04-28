import * as React from "react";
import styled from "styled-components";
import SelectablePlayingCard from "../../components/SelectablePlayingCard";
import { MOBILE_MEDIA } from "../../constants/mediaquery";
import PlayingCard, { Rank, Suit } from "../../models/PlayingCard";
import getPositionByPlayerAndIndex from "../../utilities/getPositionByPlayerAndIndex";

interface Props extends React.Attributes {
  defaultValues: {
    playerIndex: number;
    playerHand: [PlayingCard | null, PlayingCard | null];
  }[];
  onChange?: (index: number, hand: Hand, rank: Rank, suit: Suit) => void;
}

export default function PlayerHandSelectors({
  defaultValues,
  onChange = () => undefined,
}: Props) {
  const [values, setValues] = React.useState(defaultValues);

  React.useEffect(() => {
    if (defaultValues.length < 2 || 10 < defaultValues.length)
      throw new Error(
        "length of defaultValues must be more than or equal to 2 and less than or equal to 10"
      );

    setValues(defaultValues);
  }, [...defaultValues]);

  return (
    <Root>
      {values.map(({ playerIndex, playerHand }) => {
        const [left, right] = playerHand;

        return (
          <PlayerHandSelector>
            <SmallTitle>{`${getPositionByPlayerAndIndex(
              values.length,
              playerIndex
            )}:`}</SmallTitle>

            <PlayerHand>
              <SelectablePlayingCard
                initialRank={left !== null ? left!.rank : undefined}
                initialSuit={left !== null ? left!.suit : undefined}
                onChange={({ rank, suit }) =>
                  onChange(playerIndex, Hand.left, rank, suit)
                }
              />

              <SelectablePlayingCard
                initialRank={right !== null ? right!.rank : undefined}
                initialSuit={right !== null ? right!.suit : undefined}
                onChange={({ rank, suit }) =>
                  onChange(playerIndex, Hand.right, rank, suit)
                }
              />
            </PlayerHand>
          </PlayerHandSelector>
        );
      })}
    </Root>
  );
}

export enum Hand {
  left = "LEFT",
  right = "RIGHT",
}

const Root = styled.div`
  display: inline-flex;
  flex-direction: column;
`;

const PlayerHandSelector = styled.div`
  display: flex;
  flex-direction: row;
  margin-bottom: 16px;

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

const PlayerHand = styled.div`
  & > div:first-child {
    margin-right: 8px;
  }
`;
