import { boolean, number, select } from "@storybook/addon-knobs";
import * as React from "react";
import PokerTable, { ActionType, Street } from "@@/components/PokerTable";
import Rank from "@@/models/Rank";
import Suit from "@@/models/Suit";

export default {
  title: "PokerTable",
  component: PokerTable,
};

export const example = () => {
  const street = select(
    "street",
    {
      "Street.preflop": Street.preflop,
      "Street.flop": Street.flop,
      "Street.turn": Street.turn,
      "Street.river": Street.river,
      "Street.showdown": Street.showdown,
    },
    Street.showdown,
    "General"
  );
  const potSize = number("potSize", 22.5, { min: 0 }, "General");
  const playerLength = number(
    "Number of players",
    6,
    { min: 2, max: 10 },
    "General"
  );
  const heroIndex = number(
    "heroIndex",
    2,
    { min: 0, max: playerLength - 1 },
    "General"
  );
  const activePlayerIndex = number(
    "activePlayerIndex",
    0,
    {
      min: 0,
      max: playerLength - 1,
    },
    "General"
  );

  const communityCards = [
    {
      rank: select("(1) Rank", RANKS, Rank.king, "Community Cards"),
      suit: select("(1) Suit", SUITS, Suit.spade, "Community Cards"),
    },
    {
      rank: select("(2) Rank", RANKS, Rank.queen, "Community Cards"),
      suit: select("(2) Suit", SUITS, Suit.spade, "Community Cards"),
    },
    {
      rank: select("(3) Rank", RANKS, Rank.nine, "Community Cards"),
      suit: select("(3) Suit", SUITS, Suit.spade, "Community Cards"),
    },
    {
      rank: select("(4) Rank", RANKS, Rank.eight, "Community Cards"),
      suit: select("(4) Suit", SUITS, Suit.spade, "Community Cards"),
    },
    {
      rank: select("(5) Rank", RANKS, Rank.seven, "Community Cards"),
      suit: select("(5) Suit", SUITS, Suit.spade, "Community Cards"),
    },
  ];

  const players = Array.from({ length: playerLength }, (_, i) => {
    const groupId = `Player ${i + 1}`;
    const isPlaying = boolean("Playing", true, groupId);

    const stackSize = number("stackSize", 100, { min: 0 }, groupId);

    const cards: any = [
      {
        rank: select("(1) Rank", RANKS, Rank.ace, groupId),
        suit: select("(1) Suit", SUITS, Suit.spade, groupId),
      },
      {
        rank: select("(2) Rank", RANKS, Rank.king, groupId),
        suit: select("(2) Suit", SUITS, Suit.spade, groupId),
      },
    ];

    const hasAction = boolean("Action", true, groupId);

    const actionType = select(
      "action.type",
      {
        "ActionType.blindBet": ActionType.blindBet,
        "ActionType.fold": ActionType.fold,
        "ActionType.check": ActionType.check,
        "ActionType.call": ActionType.call,
        "ActionType.bet": ActionType.bet,
        "ActionType.raise": ActionType.raise,
        "ActionType.acquireChip": ActionType.acquireChip,
      },
      ActionType.check,
      groupId
    );
    const betSize = number("action.betSize", 0, { min: 0 }, groupId);

    return isPlaying
      ? {
          stackSize,
          cards,
          action: hasAction ? { type: actionType, betSize } : null,
        }
      : null;
  });

  return (
    <PokerTable
      street={street}
      potSize={potSize}
      communityCards={
        communityCards.filter(({ rank, suit }) => rank && suit) as any
      }
      players={players}
      heroIndex={heroIndex}
      activePlayerIndex={activePlayerIndex}
    />
  );
};

export const showdown = () => {
  return (
    <PokerTable
      street={Street.showdown}
      potSize={0}
      communityCards={[
        { rank: Rank.king, suit: Suit.spade },
        { rank: Rank.queen, suit: Suit.spade },
        { rank: Rank.nine, suit: Suit.spade },
        { rank: Rank.eight, suit: Suit.spade },
        { rank: Rank.seven, suit: Suit.spade },
      ]}
      players={[
        {
          stackSize: 200,
          cards: [
            { rank: Rank.ace, suit: Suit.spade },
            { rank: Rank.ace, suit: Suit.heart },
          ],
          action: {
            type: ActionType.acquireChip,
            betSize: 101.2,
          },
        },
        {
          stackSize: 140,
          cards: [
            { rank: Rank.king, suit: Suit.diamond },
            { rank: Rank.king, suit: Suit.club },
          ],
          action: null,
        },
        {
          stackSize: 80,
          cards: [
            { rank: Rank.queen, suit: Suit.heart },
            { rank: Rank.queen, suit: Suit.club },
          ],
          action: null,
        },
        {
          stackSize: 172.75,
          cards: [
            { rank: Rank.jack, suit: Suit.spade },
            { rank: Rank.jack, suit: Suit.diamond },
          ],
          action: null,
        },
        null,
        {
          stackSize: 131,
          cards: [
            { rank: Rank.ten, suit: Suit.heart },
            { rank: Rank.ten, suit: Suit.club },
          ],
          action: null,
        },
      ]}
      heroIndex={3}
      activePlayerIndex={2}
    />
  );
};

export const middleOfStreet = () => {
  return (
    <PokerTable
      street={Street.turn}
      potSize={84.2}
      communityCards={[
        { rank: Rank.king, suit: Suit.spade },
        { rank: Rank.queen, suit: Suit.spade },
        { rank: Rank.nine, suit: Suit.spade },
        { rank: Rank.eight, suit: Suit.spade },
      ]}
      players={[
        null,
        {
          stackSize: 140,
          cards: null,
          action: { type: ActionType.bet, betSize: 12 },
        },
        null,
        {
          stackSize: 172.75,
          cards: null,
          action: { type: ActionType.bet, betSize: 28 },
        },
        null,
        {
          stackSize: 131,
          cards: [
            { rank: Rank.ace, suit: Suit.diamond },
            { rank: Rank.ace, suit: Suit.club },
          ],
          action: null,
        },
        null,
        null,
      ]}
      heroIndex={5}
      activePlayerIndex={3}
    />
  );
};

export const sixMax = () => {
  return (
    <PokerTable
      street={Street.river}
      potSize={101.2}
      communityCards={[
        { rank: Rank.king, suit: Suit.spade },
        { rank: Rank.queen, suit: Suit.spade },
        { rank: Rank.nine, suit: Suit.spade },
        { rank: Rank.eight, suit: Suit.spade },
        { rank: Rank.seven, suit: Suit.spade },
      ]}
      players={[
        {
          stackSize: 200,
          cards: null,
          action: {
            type: ActionType.call,
            betSize: 4,
          },
        },
        {
          stackSize: 140,
          cards: null,
          action: {
            type: ActionType.call,
            betSize: 4,
          },
        },
        {
          stackSize: 80,
          cards: null,
          action: {
            type: ActionType.call,
            betSize: 4,
          },
        },
        {
          stackSize: 172.75,
          cards: [
            { rank: Rank.jack, suit: Suit.spade },
            { rank: Rank.jack, suit: Suit.diamond },
          ],
          action: {
            type: ActionType.bet,
            betSize: 4,
          },
        },
        null,
        {
          stackSize: 131,
          cards: null,
          action: {
            type: ActionType.call,
            betSize: 4,
          },
        },
      ]}
      heroIndex={3}
      activePlayerIndex={2}
    />
  );
};

export const headsUp = () => {
  return (
    <PokerTable
      street={Street.preflop}
      potSize={101.2}
      communityCards={[]}
      players={[
        {
          stackSize: 200,
          cards: null,
          action: { type: ActionType.raise, betSize: 3 },
        },
        {
          stackSize: 140,
          cards: [
            { rank: Rank.king, suit: Suit.diamond },
            { rank: Rank.king, suit: Suit.club },
          ],
          action: null,
        },
      ]}
      heroIndex={1}
    />
  );
};

export const justGameStarted = () => {
  return (
    <PokerTable
      street={Street.preflop}
      potSize={0}
      communityCards={[]}
      players={[
        {
          stackSize: 200,
          cards: null,
          action: null,
        },
        {
          stackSize: 140,
          cards: null,
          action: null,
        },
        {
          stackSize: 80,
          cards: null,
          action: null,
        },
        {
          stackSize: 172.75,
          cards: null,
          action: null,
        },
        {
          stackSize: 100,
          cards: null,
          action: null,
        },
        {
          stackSize: 131,
          cards: null,
          action: null,
        },
      ]}
      heroIndex={5}
      activePlayerIndex={2}
    />
  );
};

const RANKS = {
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

const SUITS = {
  None: null,
  "Suit.spade": Suit.spade,
  "Suit.heart": Suit.heart,
  "Suit.diamond": Suit.diamond,
  "Suit.club": Suit.club,
};
