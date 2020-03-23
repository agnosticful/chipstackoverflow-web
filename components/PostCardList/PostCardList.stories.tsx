import { action } from "@storybook/addon-actions";
import { select } from "@storybook/addon-knobs";
import * as React from "react";
import GameSituation, { GameType } from "../../models/GameSituation";
import { Suit, Rank } from "../../models/PlayingCard";
import Post, { PostId, PostTitle, PostBody } from "../../models/Post";
import { UserId } from "../../models/User";
import PostCardList from "./PostCardList";
import PostCardListItem from "./PostCardListItem";
import { PostType } from "./PostTypeContext";

export default {
  title: "PostCardList",
  component: PostCardList,
  subcomponent: { PostCardListItem }
};

export const example = () => {
  return (
    <PostCardList postType={select("postType", POST_TYPES, PostType.recent)}>
      <PostCardListItem post={post} onClick={action("onClick")} />
      <PostCardListItem post={post} onClick={action("onClick")} />
      <PostCardListItem post={post} onClick={action("onClick")} />
      <PostCardListItem post={post} onClick={action("onClick")} />
      <PostCardListItem post={post} onClick={action("onClick")} />
      <PostCardListItem post={post} onClick={action("onClick")} />
    </PostCardList>
  );
};

export const postCardListItem = () => (
  <PostCardList postType={select("postType", POST_TYPES, PostType.recent)}>
    <PostCardListItem post={post} onClick={action("onClick")} />
  </PostCardList>
);

export const postType = () => (
  <>
    <PostCardList postType={PostType.recent}>
      <PostCardListItem post={post} onClick={action("onClick")} />
    </PostCardList>
    <PostCardList postType={PostType.popular}>
      <PostCardListItem post={post} onClick={action("onClick")} />
    </PostCardList>
  </>
);

const POST_TYPES = {
  "PostType.recent": PostType.recent,
  "PostType.popular": PostType.popular
};

const post: Post = {
  id: "rgaergba" as PostId,
  user: "gagaegaerga" as UserId,
  title: "suspendisse interdum consectetur libero id undisse interdum consectetur libero deid consectetur libero deid" as PostTitle,
  body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum." as PostBody,
  likes: 125,
  dislikes: 12,
  gameSituation: ({
    type: GameType.cash,
    playerLength: 2,
    playerStackSizes: [0, 0],
    heroIndex: 0,
    playerCards: [
      {
        left: {
          rank: Rank.seven,
          suit: Suit.heart
        },
        right: {
          rank: Rank.eight,
          suit: Suit.diamond
        }
      }
    ],
    smallBlindSize: 0.05,
    antiSize: 0,
    preflop: {
      actions: [
        {
          playerIndex: 0,
          betSize: 0.05
        },
        {
          playerIndex: 1,
          betSize: 0.05
        }
      ]
    },
    flop: {
      communityCards: {
        left: {
          suit: Suit.diamond,
          rank: Rank.five
        },
        center: {
          suit: Suit.diamond,
          rank: Rank.six
        },
        right: {
          suit: Suit.diamond,
          rank: Rank.seven
        }
      },
      actions: [
        {
          playerIndex: 0,
          betSize: 1.0
        },
        {
          playerIndex: 1,
          betSize: 0
        }
      ]
    }
  } as unknown) as GameSituation,
  createdAt: new Date(2020, 2, 4, 12, 15, 43, 100),
  lastUpdatedAt: new Date(2020, 2, 4, 12, 15, 43, 100)
};
