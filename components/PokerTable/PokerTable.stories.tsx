import { boolean, number, select } from "@storybook/addon-knobs";
import * as React from "react";
import PokerTable from "@@/components/PokerTable";
import { GameStreetActionType } from "@@/models/GameSituation";
import GameStreet from "@@/models/GameStreet";
import Rank from "@@/models/Rank";
import Suit from "@@/models/Suit";

export default {
  title: "PokerTable",
  component: PokerTable,
};

export const example = () => {
  const street = select("street", STREETS, GameStreet.showdown);
  const heroIndex = number("heroIndex", 2, { min: 0, max: 10 });
  const activePlayerIndex = number("activePlayerIndex", 0, {
    min: 0,
    max: 10,
  });

  const communityCards = [
    {
      rank: select(
        "(1) Rank",
        OPTIONAL_RANKS,
        DEFAULT_COMMUNITY_CARDS[0].rank,
        "Community Cards"
      ),
      suit: select(
        "(1) Suit",
        OPTIONAL_SUITS,
        DEFAULT_COMMUNITY_CARDS[0].suit,
        "Community Cards"
      ),
    },
    {
      rank: select(
        "(2) Rank",
        OPTIONAL_RANKS,
        DEFAULT_COMMUNITY_CARDS[1].rank,
        "Community Cards"
      ),
      suit: select(
        "(2) Suit",
        OPTIONAL_SUITS,
        DEFAULT_COMMUNITY_CARDS[1].suit,
        "Community Cards"
      ),
    },
    {
      rank: select(
        "(3) Rank",
        OPTIONAL_RANKS,
        DEFAULT_COMMUNITY_CARDS[2].rank,
        "Community Cards"
      ),
      suit: select(
        "(3) Suit",
        OPTIONAL_SUITS,
        DEFAULT_COMMUNITY_CARDS[2].suit,
        "Community Cards"
      ),
    },
    {
      rank: select(
        "(4) Rank",
        OPTIONAL_RANKS,
        DEFAULT_COMMUNITY_CARDS[3].rank,
        "Community Cards"
      ),
      suit: select(
        "(4) Suit",
        OPTIONAL_SUITS,
        DEFAULT_COMMUNITY_CARDS[3].suit,
        "Community Cards"
      ),
    },
    {
      rank: select(
        "(5) Rank",
        OPTIONAL_RANKS,
        DEFAULT_COMMUNITY_CARDS[4].rank,
        "Community Cards"
      ),
      suit: select(
        "(5) Suit",
        OPTIONAL_SUITS,
        DEFAULT_COMMUNITY_CARDS[4].suit,
        "Community Cards"
      ),
    },
  ];

  const players = Array.from({ length: 10 }, (_, i) => {
    const groupId = `Player ${i + 1}`;
    const isPlaying = boolean("Playing", true, groupId);
    const cards: any = [
      {
        rank: select(
          "(1) Rank",
          OPTIONAL_RANKS,
          DEFAULT_PLAYERS[i].cards[0].rank,
          groupId
        ),
        suit: select(
          "(1) Suit",
          OPTIONAL_SUITS,
          DEFAULT_PLAYERS[i].cards[0].suit,
          groupId
        ),
      },
      {
        rank: select(
          "(2) Rank",
          OPTIONAL_RANKS,
          DEFAULT_PLAYERS[i].cards[1].rank,
          groupId
        ),
        suit: select(
          "(2) Suit",
          OPTIONAL_SUITS,
          DEFAULT_PLAYERS[i].cards[1].suit,
          groupId
        ),
      },
    ];
    const action = select(
      "action",
      ACTIONS,
      DEFAULT_PLAYERS[i].action,
      groupId
    );
    const stackSize = number(
      "stackSize",
      DEFAULT_PLAYERS[i].stackSize,
      { min: 0 },
      groupId
    );
    const betSize = number(
      "betSize",
      DEFAULT_PLAYERS[i].betSize,
      { min: 0 },
      groupId
    );

    return isPlaying ? { stackSize, cards, action, betSize } : null;
  });

  return (
    <PokerTable
      street={street}
      communityCards={
        communityCards.filter(({ rank, suit }) => rank && suit) as any
      }
      players={players}
      heroIndex={heroIndex}
      activePlayerIndex={activePlayerIndex}
    />
  );
};

export const nineMax = () => {
  return (
    <PokerTable
      street={GameStreet.river}
      communityCards={DEFAULT_COMMUNITY_CARDS}
      players={DEFAULT_PLAYERS.slice(0, 9)}
      heroIndex={2}
      activePlayerIndex={0}
    />
  );
};

export const eightMax = () => {
  return (
    <PokerTable
      street={GameStreet.turn}
      communityCards={DEFAULT_COMMUNITY_CARDS}
      players={DEFAULT_PLAYERS.slice(0, 8)}
      heroIndex={2}
      activePlayerIndex={0}
    />
  );
};

export const sevenMax = () => {
  return (
    <PokerTable
      street={GameStreet.preflop}
      communityCards={DEFAULT_COMMUNITY_CARDS}
      players={DEFAULT_PLAYERS.slice(0, 7)}
      heroIndex={2}
      activePlayerIndex={0}
    />
  );
};

export const sixMax = () => {
  return (
    <PokerTable
      street={GameStreet.showdown}
      communityCards={DEFAULT_COMMUNITY_CARDS}
      players={DEFAULT_PLAYERS.slice(0, 6)}
      heroIndex={2}
      activePlayerIndex={0}
    />
  );
};

export const fiveMax = () => {
  return (
    <PokerTable
      street={GameStreet.river}
      communityCards={DEFAULT_COMMUNITY_CARDS}
      players={DEFAULT_PLAYERS.slice(0, 5)}
      heroIndex={2}
      activePlayerIndex={0}
    />
  );
};

export const fourMax = () => {
  return (
    <PokerTable
      street={GameStreet.flop}
      communityCards={DEFAULT_COMMUNITY_CARDS}
      players={DEFAULT_PLAYERS.slice(0, 4)}
      heroIndex={2}
      activePlayerIndex={0}
    />
  );
};

export const threeMax = () => {
  return (
    <PokerTable
      street={GameStreet.showdown}
      communityCards={DEFAULT_COMMUNITY_CARDS}
      players={DEFAULT_PLAYERS.slice(0, 3)}
      heroIndex={2}
      activePlayerIndex={0}
    />
  );
};

export const headsUp = () => {
  return (
    <PokerTable
      street={GameStreet.preflop}
      communityCards={[]}
      players={[
        {
          stackSize: 200,
          cards: [
            { rank: Rank.ace, suit: Suit.spade },
            { rank: Rank.ace, suit: Suit.heart },
          ],
          action: GameStreetActionType.call,
          betSize: 1,
        },
        {
          stackSize: 140,
          cards: [
            { rank: Rank.king, suit: Suit.diamond },
            { rank: Rank.king, suit: Suit.club },
          ],
          action: GameStreetActionType.check,
          betSize: 1,
        },
      ]}
      heroIndex={1}
    />
  );
};

export const severalPlayerOut = () => {
  return (
    <PokerTable
      street={GameStreet.river}
      communityCards={DEFAULT_COMMUNITY_CARDS}
      players={[
        DEFAULT_PLAYERS[0],
        DEFAULT_PLAYERS[1],
        DEFAULT_PLAYERS[2],
        null,
        null,
        DEFAULT_PLAYERS[5],
      ]}
      heroIndex={2}
      activePlayerIndex={0}
    />
  );
};

const STREETS = {
  "GameStreet.preflop": GameStreet.preflop,
  "GameStreet.flop": GameStreet.flop,
  "GameStreet.turn": GameStreet.turn,
  "GameStreet.river": GameStreet.river,
  "GameStreet.showdown": GameStreet.showdown,
};

const OPTIONAL_RANKS = {
  None: null,
  "Rank.ace": Rank.ace,
  "Rank.deuce": Rank.deuce,
  "Rank.three": Rank.three,
  "Rank.four": Rank.four,
  "Rank.five": Rank.five,
  "Rank.six": Rank.six,
  "Rank.seven": Rank.seven,
  "Rank.eight": Rank.eight,
  "Rank.nine": Rank.nine,
  "Rank.ten": Rank.ten,
  "Rank.jack": Rank.jack,
  "Rank.queen": Rank.queen,
  "Rank.king": Rank.king,
};

const OPTIONAL_SUITS = {
  None: null,
  "Suit.spade": Suit.spade,
  "Suit.heart": Suit.heart,
  "Suit.diamond": Suit.diamond,
  "Suit.club": Suit.club,
};

const ACTIONS: Record<string, GameStreetActionType | null> = {
  None: null,
  "GameStreetActionType.fold": GameStreetActionType.fold,
  "GameStreetActionType.check": GameStreetActionType.check,
  "GameStreetActionType.call": GameStreetActionType.call,
  "GameStreetActionType.bet": GameStreetActionType.bet,
  "GameStreetActionType.raise": GameStreetActionType.raise,
};

const DEFAULT_COMMUNITY_CARDS = [
  { rank: Rank.king, suit: Suit.spade },
  { rank: Rank.queen, suit: Suit.spade },
  { rank: Rank.nine, suit: Suit.spade },
  { rank: Rank.eight, suit: Suit.spade },
  { rank: Rank.seven, suit: Suit.spade },
];

const DEFAULT_PLAYERS: {
  stackSize: number;
  cards: [{ rank: Rank; suit: Suit }, { rank: Rank; suit: Suit }];
  action: GameStreetActionType | null;
  betSize: number;
}[] = [
  {
    stackSize: 200,
    cards: [
      { rank: Rank.ace, suit: Suit.spade },
      { rank: Rank.ace, suit: Suit.heart },
    ],
    action: null,
    betSize: 0.5,
  },
  {
    stackSize: 140,
    cards: [
      { rank: Rank.king, suit: Suit.diamond },
      { rank: Rank.king, suit: Suit.club },
    ],
    action: null,
    betSize: 1,
  },
  {
    stackSize: 80,
    cards: [
      { rank: Rank.queen, suit: Suit.heart },
      { rank: Rank.queen, suit: Suit.club },
    ],
    action: GameStreetActionType.raise,
    betSize: 3,
  },
  {
    stackSize: 172.75,
    cards: [
      { rank: Rank.jack, suit: Suit.spade },
      { rank: Rank.jack, suit: Suit.diamond },
    ],
    action: GameStreetActionType.call,
    betSize: 3,
  },
  {
    stackSize: 100,
    cards: [
      { rank: Rank.ten, suit: Suit.heart },
      { rank: Rank.ten, suit: Suit.club },
    ],
    action: GameStreetActionType.raise,
    betSize: 9,
  },
  {
    stackSize: 131,
    cards: [
      { rank: Rank.ace, suit: Suit.diamond },
      { rank: Rank.ace, suit: Suit.club },
    ],
    action: GameStreetActionType.raise,
    betSize: 27,
  },
  {
    stackSize: 35.5,
    cards: [
      { rank: Rank.king, suit: Suit.heart },
      { rank: Rank.queen, suit: Suit.spade },
    ],
    action: GameStreetActionType.fold,
    betSize: 0,
  },
  {
    stackSize: 200,
    cards: [
      { rank: Rank.queen, suit: Suit.diamond },
      { rank: Rank.jack, suit: Suit.heart },
    ],
    action: GameStreetActionType.fold,
    betSize: 0,
  },
  {
    stackSize: 12.5,
    cards: [
      { rank: Rank.jack, suit: Suit.club },
      { rank: Rank.ten, suit: Suit.diamond },
    ],
    action: GameStreetActionType.call,
    betSize: 27,
  },
  {
    stackSize: 58,
    cards: [
      { rank: Rank.ten, suit: Suit.spade },
      { rank: Rank.nine, suit: Suit.club },
    ],
    action: GameStreetActionType.call,
    betSize: 27,
  },
];
