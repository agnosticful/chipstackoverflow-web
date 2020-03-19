import { action } from "@storybook/addon-actions";
import * as React from "react";
import styled from "styled-components";
import GameSituation, {
  GameType,
  GameStreetAction
} from "../../models/GameSituation";
import PlayingCard, { Suit, Rank } from "../../models/PlayingCard";
import Post, { PostId, PostTitle, PostBody } from "../../models/Post";
import { UserId } from "../../models/User";
import { MOBILE_MEDIA } from "../../constants/mediaquery";
import PostCardListItem from "./PostCardListItem";

export default {
  title: "PostCardListItem",
  component: PostCardListItem
};

export const example = () => (
  <PostCardListItem isRecentPost post={post} onClick={action("onClick")} />
);

export const isRecentPost = () => (
  <>
    <PostCardListItem isRecentPost post={post} onClick={action("onClick")} />
    <PostCardListItem post={post} onClick={action("onClick")} />
  </>
);

export const inGrid = () => (
  <Layout>
    <PostCardListItem isRecentPost post={post} onClick={action("onClick")} />
    <PostCardListItem isRecentPost post={post} onClick={action("onClick")} />
    <PostCardListItem isRecentPost post={post} onClick={action("onClick")} />
    <PostCardListItem isRecentPost post={post} onClick={action("onClick")} />
    <PostCardListItem isRecentPost post={post} onClick={action("onClick")} />
    <PostCardListItem isRecentPost post={post} onClick={action("onClick")} />
  </Layout>
);

const Layout = styled.div`
  display: grid;
  grid-template-columns: 440px 440px;
  grid-template-rows: 1fr 1fr 1fr;
  grid-gap: 16px;

  ${MOBILE_MEDIA} {
    grid-template-columns: 100%;
    grid-template-rows: 1fr 1fr 1fr 1fr 1fr 1fr;
  }
`;

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
        } as PlayingCard,
        right: {
          rank: Rank.eight,
          suit: Suit.diamond
        } as PlayingCard
      }
    ],
    smallBlindSize: 0.05,
    antiSize: 0,
    preflop: {
      actions: [
        {
          playerIndex: 0,
          betSize: 0.05
        } as GameStreetAction,
        {
          playerIndex: 1,
          betSize: 0.05
        } as GameStreetAction
      ] as GameStreetAction[]
    },
    flop: {
      communityCards: [
        {
          suit: Suit.diamond,
          rank: Rank.five
        } as PlayingCard,
        {
          suit: Suit.diamond,
          rank: Rank.six
        } as PlayingCard,
        {
          suit: Suit.diamond,
          rank: Rank.seven
        } as PlayingCard
      ] as PlayingCard[],
      actions: [
        {
          playerIndex: 0,
          betSize: 1.0
        } as GameStreetAction,
        {
          playerIndex: 1,
          betSize: 0
        } as GameStreetAction
      ] as GameStreetAction[]
    }
  } as unknown) as GameSituation,
  createdAt: new Date(2020, 2, 4, 12, 15, 43, 100),
  lastUpdatedAt: new Date(2020, 2, 4, 12, 15, 43, 100)
};
