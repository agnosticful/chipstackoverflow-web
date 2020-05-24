import { number, select, object } from "@storybook/addon-knobs";
import * as React from "react";
import PokerTable from "@@/components/PokerTable";
import Rank from "@@/models/Rank";
import Suit from "@@/models/Suit";
import { HandSnapshotStreet, HandSnapshotActionType } from "@@/models/Hand";

export default {
  title: "PokerTable",
  component: PokerTable,
};

export const example = () => {
  return (
    <PokerTable
      seatLength={number("seatLength", 6, { min: 2, max: 10 })}
      playerCards={new Map(object("playerCards", []))}
      communityCards={object("communityCards", [])}
      street={select(
        "street",
        {
          "HandSnapshotStreet.beginning": HandSnapshotStreet.beginning,
          "HandSnapshotStreet.preflop": HandSnapshotStreet.preflop,
          "HandSnapshotStreet.flop": HandSnapshotStreet.flop,
          "HandSnapshotStreet.turn": HandSnapshotStreet.turn,
          "HandSnapshotStreet.river": HandSnapshotStreet.river,
          "HandSnapshotStreet.showdown": HandSnapshotStreet.showdown,
        },
        HandSnapshotStreet.showdown,
        "General"
      )}
      potSize={number("potSize", 22.5, { min: 0 })}
      activePlayerIndexes={new Set(object("activePlayerIndex", []))}
      playerStackSizes={new Map(object("playerStackSizes", []))}
      playerActions={new Map(object("playerActions", []))}
      actionPlayerIndex={number("actionPlayerIndex", 2, { min: 0, max: 9 })}
      heroIndex={number("heroIndex", 2, { min: 0, max: 9 })}
    />
  );
};

export const showdown = () => {
  return (
    <PokerTable
      seatLength={6}
      playerCards={
        new Map([
          [
            0,
            [
              { rank: Rank.ace, suit: Suit.spade },
              { rank: Rank.ace, suit: Suit.heart },
            ],
          ],
          [
            1,
            [
              { rank: Rank.king, suit: Suit.diamond },
              { rank: Rank.king, suit: Suit.club },
            ],
          ],
          [
            2,
            [
              { rank: Rank.queen, suit: Suit.heart },
              { rank: Rank.queen, suit: Suit.club },
            ],
          ],
          [
            3,
            [
              { rank: Rank.jack, suit: Suit.spade },
              { rank: Rank.jack, suit: Suit.diamond },
            ],
          ],

          [
            5,
            [
              { rank: Rank.ten, suit: Suit.heart },
              { rank: Rank.ten, suit: Suit.club },
            ],
          ],
        ])
      }
      potSize={0}
      communityCards={[
        { rank: Rank.king, suit: Suit.spade },
        { rank: Rank.queen, suit: Suit.spade },
        { rank: Rank.nine, suit: Suit.spade },
        { rank: Rank.eight, suit: Suit.spade },
        { rank: Rank.seven, suit: Suit.spade },
      ]}
      street={HandSnapshotStreet.showdown}
      activePlayerIndexes={new Set([0, 1, 2, 3, 5])}
      playerStackSizes={
        new Map([
          [0, 200],
          [0, 140],
          [0, 80],
          [0, 172.75],
          [0, 131],
        ])
      }
      playerActions={
        new Map([
          [0, { type: HandSnapshotActionType.acquirePot, betSize: 101.2 }],
        ])
      }
      actionPlayerIndex={0}
      heroIndex={3}
    />
  );
};
