import { action } from "@storybook/addon-actions";
import * as React from "react";
import HandPlayer from "@@/components/HandPlayer";
import Hand, { HandActionType } from "@@/models/Hand";
import Rank from "@@/models/Rank";
import Suit from "@@/models/Suit";

export default {
  title: "HandPlayer",
  component: HandPlayer,
};

export const example = () => (
  <HandPlayer
    hand={
      new Hand({
        playerInitialStackSizes: new Map(
          [82, 103.2, 107.6, 113.2, 100.6, 94.8].map((v, k) => [k, v])
        ),
        playerCards: new Map([
          [
            2,
            [
              { rank: Rank.ace, suit: Suit.diamond },
              { rank: Rank.king, suit: Suit.heart },
            ],
          ],
          [
            3,
            [
              { rank: Rank.four, suit: Suit.spade },
              { rank: Rank.four, suit: Suit.heart },
            ],
          ],
        ]),
        smallBlindSize: 0.4,
        antiSize: 0,
        communityCards: [
          { rank: Rank.four, suit: Suit.club },
          { rank: Rank.seven, suit: Suit.club },
          { rank: Rank.six, suit: Suit.spade },
          { rank: Rank.three, suit: Suit.spade },
        ],
        preflopActions: [
          { type: HandActionType.raise, playerIndex: 2, betSize: 3 },
          { type: HandActionType.call, playerIndex: 3, betSize: 3 },
          { type: HandActionType.fold, playerIndex: 4, betSize: 0 },
          { type: HandActionType.fold, playerIndex: 5, betSize: 0 },
          { type: HandActionType.call, playerIndex: 0, betSize: 3 },
          { type: HandActionType.fold, playerIndex: 1, betSize: 1 },
        ],
        flopActions: [
          { type: HandActionType.check, playerIndex: 0, betSize: 0 },
          { type: HandActionType.bet, playerIndex: 2, betSize: 4.8 },
          { type: HandActionType.call, playerIndex: 3, betSize: 4.8 },
          { type: HandActionType.fold, playerIndex: 0, betSize: 0 },
        ],
        turnActions: [
          { type: HandActionType.bet, playerIndex: 2, betSize: 9.4 },
          { type: HandActionType.raise, playerIndex: 3, betSize: 22 },
          { type: HandActionType.fold, playerIndex: 2, betSize: 9.4 },
        ],
        riverActions: [],
      })
    }
    heroIndex={2}
    onPlayStateChange={action("onPlayStateChange")}
    onSnapshotIndexChange={action("onSnapshotIndexChange")}
  />
);

export const withDefaultSnapshotIndex = () => (
  <HandPlayer
    hand={
      new Hand({
        playerInitialStackSizes: new Map(
          [82, 103.2, 107.6, 113.2, 100.6, 94.8].map((v, k) => [k, v])
        ),
        playerCards: new Map([
          [
            2,
            [
              { rank: Rank.ace, suit: Suit.diamond },
              { rank: Rank.king, suit: Suit.heart },
            ],
          ],
          [
            3,
            [
              { rank: Rank.four, suit: Suit.spade },
              { rank: Rank.four, suit: Suit.heart },
            ],
          ],
        ]),
        smallBlindSize: 0.4,
        antiSize: 0,
        communityCards: [
          { rank: Rank.four, suit: Suit.club },
          { rank: Rank.seven, suit: Suit.club },
          { rank: Rank.six, suit: Suit.spade },
          { rank: Rank.three, suit: Suit.spade },
        ],
        preflopActions: [
          { type: HandActionType.raise, playerIndex: 2, betSize: 3 },
          { type: HandActionType.call, playerIndex: 3, betSize: 3 },
          { type: HandActionType.fold, playerIndex: 4, betSize: 0 },
          { type: HandActionType.fold, playerIndex: 5, betSize: 0 },
          { type: HandActionType.call, playerIndex: 0, betSize: 3 },
          { type: HandActionType.fold, playerIndex: 1, betSize: 1 },
        ],
        flopActions: [
          { type: HandActionType.check, playerIndex: 0, betSize: 0 },
          { type: HandActionType.bet, playerIndex: 2, betSize: 4.8 },
          { type: HandActionType.call, playerIndex: 3, betSize: 4.8 },
          { type: HandActionType.fold, playerIndex: 0, betSize: 0 },
        ],
        turnActions: [
          { type: HandActionType.bet, playerIndex: 2, betSize: 9.4 },
          { type: HandActionType.raise, playerIndex: 3, betSize: 22 },
          { type: HandActionType.fold, playerIndex: 2, betSize: 9.4 },
        ],
        riverActions: [],
      })
    }
    heroIndex={2}
    defaultSnapshotIndex={4}
    onPlayStateChange={action("onPlayStateChange")}
    onSnapshotIndexChange={action("onSnapshotIndexChange")}
  />
);

export const pausedByDefault = () => (
  <HandPlayer
    hand={
      new Hand({
        playerInitialStackSizes: new Map(
          [82, 103.2, 107.6, 113.2, 100.6, 94.8].map((v, k) => [k, v])
        ),
        playerCards: new Map([
          [
            2,
            [
              { rank: Rank.ace, suit: Suit.diamond },
              { rank: Rank.king, suit: Suit.heart },
            ],
          ],
          [
            3,
            [
              { rank: Rank.four, suit: Suit.spade },
              { rank: Rank.four, suit: Suit.heart },
            ],
          ],
        ]),
        smallBlindSize: 0.4,
        antiSize: 0,
        communityCards: [
          { rank: Rank.four, suit: Suit.club },
          { rank: Rank.seven, suit: Suit.club },
          { rank: Rank.six, suit: Suit.spade },
          { rank: Rank.three, suit: Suit.spade },
        ],
        preflopActions: [
          { type: HandActionType.raise, playerIndex: 2, betSize: 3 },
          { type: HandActionType.call, playerIndex: 3, betSize: 3 },
          { type: HandActionType.fold, playerIndex: 4, betSize: 0 },
          { type: HandActionType.fold, playerIndex: 5, betSize: 0 },
          { type: HandActionType.call, playerIndex: 0, betSize: 3 },
          { type: HandActionType.fold, playerIndex: 1, betSize: 1 },
        ],
        flopActions: [
          { type: HandActionType.check, playerIndex: 0, betSize: 0 },
          { type: HandActionType.bet, playerIndex: 2, betSize: 4.8 },
          { type: HandActionType.call, playerIndex: 3, betSize: 4.8 },
          { type: HandActionType.fold, playerIndex: 0, betSize: 0 },
        ],
        turnActions: [
          { type: HandActionType.bet, playerIndex: 2, betSize: 9.4 },
          { type: HandActionType.raise, playerIndex: 3, betSize: 22 },
          { type: HandActionType.fold, playerIndex: 2, betSize: 9.4 },
        ],
        riverActions: [],
      })
    }
    heroIndex={2}
    defaultPlaying={false}
    onPlayStateChange={action("onPlayStateChange")}
    onSnapshotIndexChange={action("onSnapshotIndexChange")}
  />
);
