import * as React from "react";
import styled, { SimpleInterpolation, css } from "styled-components";
import PortraitPlayingCard from "@@/components/PortraitPlayingCard";
import useRect from "@@/hooks/useRect";
import Rank from "@@/models/Rank";
import Suit from "@@/models/Suit";
import getPositionLabel from "./getPositionLabel";
import ActionType from "./ActionType";
import Player from "./Player";
import PotIndicator from "./PotIndicator";
import Street from "./Street";

interface Props extends React.Attributes {
  street: Street;
  potSize: number;
  communityCards: { rank: Rank; suit: Suit }[];
  players: ({
    stackSize: number;
    cards: [{ rank: Rank; suit: Suit }, { rank: Rank; suit: Suit }] | null;
    action: {
      type: ActionType;
      betSize: number;
    } | null;
  } | null)[];
  heroIndex: number;
  activePlayerIndex?: number;
  className?: string;
  style?: React.CSSProperties;
}

/**
 * An UI displays a snapshot of a game
 */
export default function PokerTable({
  street,
  potSize,
  communityCards,
  players,
  heroIndex,
  activePlayerIndex,
  ...props
}: Props) {
  if (communityCards.length > 5) {
    throw new Error(
      "props.communityCards.length must be less than or equal 5."
    );
  }

  const [ref, rect] = useRect();
  const scale = rect.width / 960;

  return (
    <Root ref={ref} scale={scale} {...props}>
      <BettingLine />

      <CommunityCards>
        {communityCards.map(({ rank, suit }) => (
          <PortraitPlayingCard rank={rank} suit={suit} key={`${rank}${suit}`} />
        ))}
      </CommunityCards>

      <PlayerCards length={players.length}>
        {players.map((player, i) =>
          player ? (
            <_Player
              position={getPositionLabel(i, players.length)}
              stackSize={player.stackSize ?? 0}
              cards={player?.cards ?? undefined}
              action={player.action ?? undefined}
              highlighted={i === activePlayerIndex}
              _hidden={!player}
              data-seat-id={(players.length + i - heroIndex) % players.length}
              key={i}
            />
          ) : null
        )}
      </PlayerCards>

      <_PotIndicator street={street} potSize={potSize} />
    </Root>
  );
}

const Root = styled.div<{ scale: number }>`
  --table-scale: ${({ scale }) => scale};
  box-sizing: border-box;
  position: relative;
  padding-top: 45.5%;
  user-select: none;
`;

const BettingLine = styled.div`
  position: absolute;
  top: 8%;
  bottom: 8%;
  left: 12%;
  right: 12%;
  border: calc(8px * var(--table-scale)) #c8d6e5 solid;
  border-radius: 25%/50%;
`;

const CommunityCards = styled.div`
  position: absolute;
  top: 55%;
  left: 50%;
  display: flex;
  justify-content: flex-start;
  justify-items: flex-start;
  align-content: center;
  align-items: center;
  width: calc(48px * var(--table-scale) * 5 + 12px * var(--table-scale) * 4);
  transform: translate(-50%, -50%);

  & > * {
    width: calc(48px * var(--table-scale));

    &:nth-of-type(n + 2) {
      margin-left: calc(12px * var(--table-scale));
    }
  }
`;

const _PotIndicator = styled(PotIndicator)`
  position: absolute;
  top: 40%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const PlayerCards = styled.div<{ length: number }>`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;

  & > * {
    position: absolute;
  }

  ${({ length }) => PLAYER_POSITION_CSS.get(length)}
`;

const _Player = styled(Player)<{ _hidden: boolean }>`
  opacity: ${({ _hidden }) => (_hidden ? 0 : 1)};
  transition: top 150ms ease-in-out, bottom 150ms ease-in-out,
    left 150ms ease-in-out, right 150ms ease-in-out, opacity 150ms ease-in-out,
    transform 150ms ease-in-out;
`;

const PLAYER_POSITION_CSS = new Map<number, SimpleInterpolation>([
  [
    2,
    css`
      [data-seat-id="0"] {
        bottom: 8%;
        left: 50%;
        transform: translate(-50%, 50%);
      }

      [data-seat-id="1"] {
        top: 8%;
        left: 50%;
        transform: translate(-50%, -50%);
      }
    `,
  ],
  [
    3,
    css`
      [data-seat-id="0"] {
        bottom: 8%;
        left: 50%;
        transform: translate(-50%, 50%);
      }

      [data-seat-id="1"] {
        top: 25%;
        left: 16%;
        transform: translate(-50%, -50%);
      }

      [data-seat-id="2"] {
        top: 25%;
        right: 16%;
        transform: translate(50%, -50%);
      }
    `,
  ],
  [
    4,
    css`
      [data-seat-id="0"] {
        bottom: 8%;
        left: 50%;
        transform: translate(-50%, 50%);
      }

      [data-seat-id="1"] {
        top: 50%;
        left: 12%;
        transform: translate(-50%, -50%);
      }

      [data-seat-id="2"] {
        top: 8%;
        left: 50%;
        transform: translate(-50%, -50%);
      }

      [data-seat-id="3"] {
        top: 50%;
        right: 12%;
        transform: translate(50%, -50%);
      }
    `,
  ],
  [
    5,
    css`
      [data-seat-id="0"] {
        bottom: 8%;
        left: 50%;
        transform: translate(-50%, 50%);
      }

      [data-seat-id="1"] {
        bottom: 35.25%;
        left: 15%;
        transform: translate(-50%, 50%);
      }

      [data-seat-id="2"] {
        top: 17.5%;
        left: 19%;
        transform: translate(-50%, -50%);
      }

      [data-seat-id="3"] {
        top: 17.5%;
        right: 19%;
        transform: translate(50%, -50%);
      }

      [data-seat-id="4"] {
        bottom: 35.25%;
        right: 15%;
        transform: translate(50%, 50%);
      }
    `,
  ],
  [
    6,
    css`
      [data-seat-id="0"] {
        bottom: 8%;
        left: 27.5%;
        transform: translate(-50%, 50%);
      }

      [data-seat-id="1"] {
        top: 50%;
        left: 12%;
        transform: translate(-50%, -50%);
      }

      [data-seat-id="2"] {
        top: 8%;
        left: 27.5%;
        transform: translate(-50%, -50%);
      }

      [data-seat-id="3"] {
        top: 8%;
        right: 27.5%;
        transform: translate(50%, -50%);
      }

      [data-seat-id="4"] {
        top: 50%;
        right: 12%;
        transform: translate(50%, -50%);
      }

      [data-seat-id="5"] {
        bottom: 8%;
        right: 27.5%;
        transform: translate(50%, 50%);
      }
    `,
  ],
  [
    7,
    css`
      [data-seat-id="0"] {
        bottom: 8%;
        left: 50%;
        transform: translate(-50%, 50%);
      }

      [data-seat-id="1"] {
        bottom: 25%;
        left: 17.5%;
        transform: translate(-50%, 50%);
      }

      [data-seat-id="2"] {
        top: 40%;
        left: 13.5%;
        transform: translate(-50%, -50%);
      }

      [data-seat-id="3"] {
        top: 10%;
        left: 27.5%;
        transform: translate(-50%, -50%);
      }

      [data-seat-id="4"] {
        top: 10%;
        right: 27.5%;
        transform: translate(50%, -50%);
      }

      [data-seat-id="5"] {
        top: 40%;
        right: 13.5%;
        transform: translate(50%, -50%);
      }

      [data-seat-id="6"] {
        bottom: 25%;
        right: 17.5%;
        transform: translate(50%, 50%);
      }
    `,
  ],
  [
    8,
    css`
      [data-seat-id="0"] {
        bottom: 8%;
        left: 33.3%;
        transform: translate(-50%, 50%);
      }

      [data-seat-id="1"] {
        bottom: 35%;
        left: 14%;
        transform: translate(-50%, 50%);
      }

      [data-seat-id="2"] {
        top: 35%;
        left: 14%;
        transform: translate(-50%, -50%);
      }

      [data-seat-id="3"] {
        top: 8%;
        left: 33.3%;
        transform: translate(-50%, -50%);
      }

      [data-seat-id="4"] {
        top: 8%;
        right: 33.3%;
        transform: translate(50%, -50%);
      }

      [data-seat-id="5"] {
        top: 35%;
        right: 14%;
        transform: translate(50%, -50%);
      }

      [data-seat-id="6"] {
        bottom: 35%;
        right: 14%;
        transform: translate(50%, 50%);
      }

      [data-seat-id="7"] {
        bottom: 8%;
        right: 33.3%;
        transform: translate(50%, 50%);
      }
    `,
  ],
  [
    9,
    css`
      [data-seat-id="0"] {
        bottom: 8%;
        left: 50%;
        transform: translate(-50%, 50%);
      }

      [data-seat-id="1"] {
        bottom: 14%;
        left: 20%;
        transform: translate(-50%, 50%);
      }

      [data-seat-id="2"] {
        bottom: 42.5%;
        left: 12%;
        transform: translate(-50%, 50%);
      }

      [data-seat-id="3"] {
        top: 30%;
        left: 15%;
        transform: translate(-50%, -50%);
      }

      [data-seat-id="4"] {
        top: 8%;
        left: 35%;
        transform: translate(-50%, -50%);
      }

      [data-seat-id="5"] {
        top: 8%;
        right: 35%;
        transform: translate(50%, -50%);
      }

      [data-seat-id="6"] {
        top: 30%;
        right: 15%;
        transform: translate(50%, -50%);
      }

      [data-seat-id="7"] {
        bottom: 42.5%;
        right: 12%;
        transform: translate(50%, 50%);
      }

      [data-seat-id="8"] {
        bottom: 14%;
        right: 20%;
        transform: translate(50%, 50%);
      }
    `,
  ],
  [
    10,
    css`
      [data-seat-id="0"] {
        bottom: 8%;
        left: 35%;
        transform: translate(-50%, 50%);
      }

      [data-seat-id="1"] {
        bottom: 25%;
        left: 15%;
        transform: translate(-50%, 50%);
      }

      [data-seat-id="2"] {
        top: 50%;
        left: 12%;
        transform: translate(-50%, -50%);
      }

      [data-seat-id="3"] {
        top: 25%;
        left: 15%;
        transform: translate(-50%, -50%);
      }

      [data-seat-id="4"] {
        top: 8%;
        left: 35%;
        transform: translate(-50%, -50%);
      }

      [data-seat-id="5"] {
        top: 8%;
        right: 35%;
        transform: translate(50%, -50%);
      }

      [data-seat-id="6"] {
        top: 25%;
        right: 15%;
        transform: translate(50%, -50%);
      }

      [data-seat-id="7"] {
        top: 50%;
        right: 12%;
        transform: translate(50%, -50%);
      }

      [data-seat-id="8"] {
        bottom: 25%;
        right: 15%;
        transform: translate(50%, 50%);
      }

      [data-seat-id="9"] {
        bottom: 8%;
        right: 35%;
        transform: translate(50%, 50%);
      }
    `,
  ],
]);
