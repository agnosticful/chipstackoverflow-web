import PlayingCard from "@@/models/PlayingCard";
import * as React from "react";
import usePlayerActions from "./usePlayerActions";

export default function usePostCreation() {
  const [post, setPost] = React.useState<Post>(initialPost);
  const [validtion, setValidation] = React.useState(initialPostValidation);

  const setTitle = React.useCallback((title: string) => {
    const titleValidation = new Set<TitleValidation>();

    if (title === "") {
      titleValidation.add(TitleValidation.required);
    }

    setValidation((prev) => ({ ...prev, title: titleValidation }));
    setPost((prev) => ({ ...prev, title }));
  }, []);

  const setBody = React.useCallback((body: string) => {
    const bodyValidation = new Set<BodyValidation>();

    if (body === "") {
      bodyValidation.add(BodyValidation.required);
    }

    setValidation((prev) => ({ ...prev, body: bodyValidation }));
    setPost((prev) => ({ ...prev, body }));
  }, []);

  const setPlayerLength = React.useCallback((playerLength: number) => {
    const playerLengthValidation = new Set<PlayerLengthValidation>();

    if (playerLength < 2 || 10 < playerLength) {
      playerLengthValidation.add(PlayerLengthValidation.invalidPlayerNumber);
    }

    setValidation((prev) => ({
      ...prev,
      playerLength: playerLengthValidation,
    }));
    setPost((prev) => ({ ...prev, playerLength }));
  }, []);

  const setPlayerStackSizes = React.useCallback(
    (stackSize: number, playerIndex: number) => {
      if (post.playerStackSizes.length <= playerIndex)
        throw Error(
          "Length of playerStackSizes must be more than or equal to playerIndex"
        );

      const playerStackSizes = [...post.playerStackSizes];
      playerStackSizes[playerIndex] = stackSize;

      setPost((prev) => ({ ...prev, playerStackSizes }));
    },
    []
  );

  const setHeroHand = React.useCallback(
    (playingCard: PlayingCard, hand: "LEFT" | "RIGHT") => {
      const heroHandValidation = new Set<PlayingCardValidation>();

      const heroHand = post.heroHand;

      hand === "LEFT"
        ? (heroHand[0] = playingCard)
        : (heroHand[1] = playingCard);

      if (heroHand[0] === null) {
        heroHandValidation.add(PlayingCardValidation.leftHandRequired);
      }

      if (heroHand[1] === null) {
        heroHandValidation.add(PlayingCardValidation.rightHandRequired);
      }

      setValidation((prev) => ({
        ...prev,
        heroHand: heroHandValidation,
      }));
      setPost((prev) => ({
        ...prev,
        heroHand,
      }));
    },
    []
  );

  const setHeroIndex = React.useCallback((heroIndex) => {
    const heroIndexValidation = new Set<HeroIndexValidation>();

    if (heroIndex < 0 || post.playerLength <= heroIndex) {
      heroIndexValidation.add(HeroIndexValidation.invalidIndex);
    }

    setValidation((prev) => ({ ...prev, heroIndex: heroIndexValidation }));
    setPost((prev) => ({ ...prev, heroIndex }));
  }, []);

  const setPlayerCards = React.useCallback(
    (playingCard: PlayingCard, hand: "LEFT" | "RIGHT", playerIndex: number) => {
      if (post.playerCards.length <= playerIndex)
        throw new Error(
          "Length of playerCards must be more than or equal to playerIndex"
        );

      const playerCards = [...post.playerCards];
      const updatePlayingCard = playerCards[playerIndex];

      if (hand === "LEFT") {
        updatePlayingCard[0] = playingCard;
      } else {
        updatePlayingCard[1] = playingCard;
      }

      playerCards[playerIndex] = updatePlayingCard;

      const playerCardsValidation = Array.from(
        { length: post.playerLength },
        () => new Set<PlayingCardValidation>()
      );

      for (const [i, playerCard] of playerCards.entries()) {
        if (playerCard[0] === null) {
          playerCardsValidation[i].add(PlayingCardValidation.leftHandRequired);
        }

        if (playerCard[1] === null) {
          playerCardsValidation[i].add(PlayingCardValidation.leftHandRequired);
        }
      }

      setValidation((prev) => ({
        ...prev,
        playerCards: playerCardsValidation,
      }));
      setPost((prev) => ({ ...prev, playerCards }));
    },
    []
  );

  const setSmallBlindSize = React.useCallback((smallBlindSize) => {
    const smallBlindSizeValidation = new Set<SmallBlindSizeValidation>();

    if (smallBlindSize < 0 || 1 < smallBlindSize) {
      smallBlindSizeValidation.add(SmallBlindSizeValidation.invalidSize);
    }

    setValidation((prev) => ({
      ...prev,
      smallBlindSize: SmallBlindSizeValidation,
    }));
    setPost((prev) => ({ ...prev, smallBlindSize }));
  }, []);

  const setAntiSize = React.useCallback((antiSize) => {
    const antiSizeValidation = new Set<AntiSizeValidation>();

    if (antiSize < 0 || 1 < antiSize) {
      antiSizeValidation.add(AntiSizeValidation.invalidSize);
    }

    setValidation((prev) => ({
      ...prev,
      antiSize: antiSizeValidation,
    }));
    setPost((prev) => ({ ...prev, antiSize }));
  }, []);

  const setCommunityCards = React.useCallback(
    (communityCard: PlayingCard, index: number) => {
      const communityCardsValidation = Array.from(
        { length: 5 },
        () => new Set<CommunityCardsValidation>()
      );

      const communityCards = [...post.communityCards];
      communityCards[index] = communityCard;

      for (const [i, communityCard] of communityCards.entries()) {
        if (communityCard === null) {
          communityCardsValidation[i].add(CommunityCardsValidation.required);
        }
      }

      setValidation((prev) => ({
        ...prev,
        communityCards: communityCardsValidation,
      }));
      setPost((prev) => ({ ...prev, communityCards }));
    },
    []
  );

  const { actions, actionValidations, setPlayerAction } = usePlayerActions({
    playerLength: post.playerLength,
    smallBlindSize: post.smallBlindSize,
    playerStackSizes: post.playerStackSizes,
  });

  const createPost = React.useCallback(() => {
    // validationの確認
    // call api
  }, []);

  return {
    post: { ...post, ...actions },
    validtion: { ...validtion, ...actionValidations },
    setTitle,
    setBody,
    setPlayerLength,
    setPlayerStackSizes,
    setHeroHand,
    setHeroIndex,
    setSmallBlindSize,
    setAntiSize,
    setCommunityCards,
    setPlayerAction,
    setPlayerCards,
    createPost,
  };
}

interface Post {
  title: string;
  body: string;
  playerLength: number;
  playerStackSizes: number[];
  heroHand: [PlayingCard | null, PlayingCard | null];
  playerCards: [PlayingCard | null, PlayingCard | null][];
  communityCards: (PlayingCard | null)[];
  heroIndex: number;
  smallBlindSize: number;
  antiSize: number;
}

const initialPost: Post = {
  title: "",
  body: "",
  playerLength: 2,
  playerStackSizes: [0, 0],
  heroHand: [null, null],
  playerCards: [
    [null, null],
    [null, null],
  ],
  communityCards: [null, null, null, null, null],
  heroIndex: 0,
  smallBlindSize: 0,
  antiSize: 0,
};

enum TitleValidation {
  required,
}

enum BodyValidation {
  required,
}

enum PlayerLengthValidation {
  invalidPlayerNumber,
}

enum PlayingCardValidation {
  leftHandRequired,
  rightHandRequired,
}

enum CommunityCardsValidation {
  required,
}

enum HeroIndexValidation {
  invalidIndex,
}

enum SmallBlindSizeValidation {
  invalidSize,
}

enum AntiSizeValidation {
  invalidSize,
}

const initialPostValidation = {
  title: new Set([TitleValidation.required]),
  body: new Set([BodyValidation.required]),
  playerLength: new Set(),
  heroHand: new Set([
    PlayingCardValidation.leftHandRequired,
    PlayingCardValidation.rightHandRequired,
  ]),
  heroIndex: new Set(),
};
