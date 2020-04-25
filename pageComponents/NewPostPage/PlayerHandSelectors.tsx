import * as React from "react";
import styled from "styled-components";
import SelectablePlayingCard from "../../components/SelectablePlayingCard";
import { MOBILE_MEDIA } from "../../constants/mediaquery";
import PlayingCard, { Rank, Suit } from "../../models/PlayingCard";
import getPositionByPlayerAndIndex from "../../utilities/getPositionByPlayerAndIndex";

interface Props extends React.Attributes {
  players: {
    index: number;
    hand: [PlayingCard | null, PlayingCard | null];
  }[];
  onChange?: (index: number, hand: Hand, rank: Rank, suit: Suit) => void;
}

export default function PlayerHandSelectors({
  players,
  onChange = () => undefined,
}: Props) {
  const [activePlayers, setActivePlayers] = React.useState(players);

  React.useEffect(() => {
    if (players.length < 2 || 10 < players.length)
      throw new Error(
        "length of players must be more than or equal to 2 and less than or equal to 10"
      );

    setActivePlayers(players);
  }, [...players]);

  return (
    <Root>
      {activePlayers.map((player) => {
        const playerIndex = player.index;
        const [left, right] = player.hand;

        return (
          <Player>
            <SmallTitle>{`${getPositionByPlayerAndIndex(
              activePlayers.length,
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
          </Player>
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

const Player = styled.div`
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
