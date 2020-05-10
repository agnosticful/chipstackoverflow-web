import { action } from "@storybook/addon-actions";
import { boolean } from "@storybook/addon-knobs";
import * as React from "react";
import { GameType, GameStreetActionType } from "../../models/GameSituation";
import { PostBody, PostId, PostMinimum, PostTitle } from "../../models/Post";
import Rank from "../../models/Rank";
import Suit from "../../models/Suit";
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
  gameSituation: {
    type: GameType.cash,
    players: [
      {
        stackSize: 0,
        holeCards: [
          { rank: Rank.seven, suit: Suit.heart },
          { rank: Rank.eight, suit: Suit.diamond },
        ],
      },
      { stackSize: 0, holeCards: null },
    ],
    heroIndex: 0,
    smallBlindSize: 0.05,
    antiSize: 0,
    communityCards: [
      { suit: Suit.diamond, rank: Rank.five },
      { suit: Suit.diamond, rank: Rank.six },
      { suit: Suit.diamond, rank: Rank.seven },
    ],
    preflopActions: [
      { playerIndex: 0, betSize: 1, type: GameStreetActionType.call },
      { playerIndex: 1, betSize: 1, type: GameStreetActionType.check },
    ],
    flopActions: [
      { playerIndex: 0, betSize: 1, type: GameStreetActionType.bet },
      { playerIndex: 1, betSize: 0, type: GameStreetActionType.fold },
    ],
    turnActions: [],
    riverActions: [],
  },
  createdAt: new Date(),
  lastUpdatedAt: new Date(),
};
