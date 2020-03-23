import Router from "next/router";
import * as React from "react";
import { GameStreetAction, GameType } from "../models/GameSituation";
import { PostTitle, PostBody } from "../models/Post";
import { PostData, PostingGameSituation } from "../repositories/createPost";
import useRepository from "./useRepository";

export default function useCreatePost() {
  const { createPost } = useRepository();
  const [post, setPost] = React.useState<PostData>(initialPostData);

  const isValid = React.useCallback<
    ({ showDownPlayerIndexes }: { showDownPlayerIndexes: number[] }) => boolean
  >(
    ({ showDownPlayerIndexes }: { showDownPlayerIndexes: number[] }) => {
      const isTitleNotEmpty = post.title !== "";
      const isBodyNotEmpty = post.body !== "";

      const isHeroHandChosen = !post.gameSituation.playerCards[
        post.gameSituation.playerLength
      ]
        ? false
        : post.gameSituation.playerCards[post.gameSituation.heroIndex]!.left &&
          post.gameSituation.playerCards[post.gameSituation.heroIndex]!.right;

      const isFlopExist = !!post.gameSituation.flop;
      const flopCommunityCards = isFlopExist
        ? post.gameSituation.flop!.communityCards
        : null;
      const isFlopCommunityCardsChosen = flopCommunityCards
        ? flopCommunityCards.left !== null &&
          flopCommunityCards.center !== null &&
          flopCommunityCards.right !== null
        : false;

      const isTurnExist = !!post.gameSituation.turn;
      const isTurnCommunityCardChosen = isTurnExist
        ? !!post.gameSituation.turn!.communityCard
        : false;

      const isRiverExist = !!post.gameSituation.river;
      const isRiverCommunityCardChosen = isRiverExist
        ? !!post.gameSituation.river!.communityCard
        : false;

      let arePlayerHandsChosen = true;
      for (let index in showDownPlayerIndexes) {
        const palyerCards = post.gameSituation.playerCards[index];
        if (!palyerCards || !palyerCards!.left || !palyerCards?.right) {
          arePlayerHandsChosen = false;
          break;
        }
      }

      return isTitleNotEmpty &&
        isBodyNotEmpty &&
        isHeroHandChosen &&
        isFlopExist
        ? isFlopCommunityCardsChosen
        : true && isTurnExist
        ? isTurnCommunityCardChosen
        : true && isRiverExist
        ? isRiverCommunityCardChosen
        : true && arePlayerHandsChosen;
    },
    [post]
  );

  const cancel = React.useCallback(() => Router.back(), []);

  const submit = React.useCallback(async () => {
    const id = await createPost(post);
    Router.replace(`/posts/${id}`);
  }, []);

  return {
    post: post,
    setPost: setPost,
    isValid: isValid,
    cancel: cancel,
    submit: submit
  };
}

const initialPostData = {
  title: "" as PostTitle,
  body: "" as PostBody,
  gameSituation: {
    type: GameType.cash,
    playerLength: 2,
    playerStackSizes: [] as number[],
    playerCards: [null, null, null, null, null, null, null, null, null],
    heroIndex: 0,
    smallBlindSize: 0.5,
    antiSize: 0,
    preflop: {
      actions: [] as GameStreetAction[]
    }
  } as PostingGameSituation
};
