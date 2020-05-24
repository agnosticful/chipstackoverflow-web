import { action } from "@storybook/addon-actions";
import { boolean } from "@storybook/addon-knobs";
import * as React from "react";
import Hand, { HandActionType } from "@@/models/Hand";
import { PostBody, PostId, PostMinimum, PostTitle } from "@@/models/Post";
import Rank from "@@/models/Rank";
import Suit from "@@/models/Suit";
import PostCardList from "./PostCardList";
import PostCardListItem from "./PostCardListItem";

export default {
  title: "PostCardList",
  component: PostCardList,
  subcomponent: { PostCardListItem },
};

export const example = () => {
  return (
    <PostCardList showLastUpdateDate={boolean("showLastUpdate", false)}>
      <PostCardListItem post={post} onClick={action("onClick")} />
      <PostCardListItem post={post} onClick={action("onClick")} />
      <PostCardListItem post={post} onClick={action("onClick")} />
      <PostCardListItem post={post} onClick={action("onClick")} />
      <PostCardListItem post={post} onClick={action("onClick")} />
      <PostCardListItem post={post} onClick={action("onClick")} />
    </PostCardList>
  );
};

export const showLastUpdateDate = () => (
  <>
    <PostCardList showLastUpdateDate>
      <PostCardListItem post={post} onClick={action("onClick")} />
      <PostCardListItem post={post} onClick={action("onClick")} />
      <PostCardListItem post={post} onClick={action("onClick")} />
      <PostCardListItem post={post} onClick={action("onClick")} />
      <PostCardListItem post={post} onClick={action("onClick")} />
      <PostCardListItem post={post} onClick={action("onClick")} />
    </PostCardList>
  </>
);

const post: PostMinimum = {
  id: "rgaergba" as PostId,
  title:
    "suspendisse interdum consectetur libero id undisse interdum consectetur libero deid consectetur libero deid" as
    PostTitle,
  body:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum." as
    PostBody,
  likes: 125,
  dislikes: 12,
  hand: new Hand({
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
  }),
  heroIndex: 2,
  createdAt: new Date(),
  lastUpdatedAt: new Date(),
};
