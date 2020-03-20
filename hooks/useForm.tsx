import * as React from "react";
import { GameStreetAction, GameType } from "../models/GameSituation";
import PlayingCard, { Suit, Rank } from "../models/PlayingCard";
import { PostTitle, PostBody } from "../models/Post";
import { PostData, PostingGameSituation } from "../repositories/createPost";

export type UseForm = {
  formData: PostData;
  setTitle: (title: string) => void;
  setBody: (body: string) => void;
  gameSituationSetter: {
    setPlayerLength: (playerLength: number) => void;
    setGameType: (type: GameType) => void;
    setSmallBlindSize: (smallBlindSize: number) => void;
    setAntiSize: (antiSize: number) => void;
    setPlayerHand: (
      playerIndex: number,
      playerHand: PlayerHand,
      playingHand: PlayingCard
    ) => void;
    setHeroPosition: (index: number) => void;
    setPreflopActions: (
      index: number,
      gameStreetAction: GameStreetAction
    ) => void;
    setFlopCommunityCard: (
      flopCommunityCard: FlopCommunityCard,
      playingHand: PlayingCard
    ) => void;
    setFlopActions: (index: number, gameStreetAction: GameStreetAction) => void;
    deleteStreet: (street: Street) => void;
    setTurnCommunityCard: (playingHand: PlayingCard) => void;
    setTurnActions: (index: number, gameStreetAction: GameStreetAction) => void;
    setRiverCommunityCard: (playingHand: PlayingCard) => void;
    setRiverActions: (
      index: number,
      gameStreetAction: GameStreetAction
    ) => void;
  };
};

export default function useForm(): UseForm {
  const [title, setTitle] = React.useState<string>("");
  const [body, setBody] = React.useState<string>("");
  const [gameSituation, setGameSituation] = React.useState<
    PostingGameSituation
  >(initialPostData);

  const deleteStreet = React.useCallback((street: Street) => {
    setGameSituation(prev => {
      delete prev[street];

      return { ...prev };
    });
  }, []);

  const setPlayerLength = React.useCallback((playerLength: number) => {
    setGameSituation(prev => ({
      ...prev,
      playerLength: playerLength
    }));
  }, []);

  const setGameType = React.useCallback((type: GameType) => {
    setGameSituation(prev => ({
      ...prev,
      type: type
    }));
  }, []);

  const setSmallBlindSize = React.useCallback((smallBlindSize: number) => {
    setGameSituation(prev => ({
      ...prev,
      smallBlindSize: smallBlindSize
    }));
  }, []);

  const setAntiSize = React.useCallback((antiSize: number) => {
    setGameSituation(prev => ({
      ...prev,
      antiSize: antiSize
    }));
  }, []);

  const setPlayerHand = React.useCallback(
    (playerIndex: number, playerHand: PlayerHand, playingHand: PlayingCard) => {
      setGameSituation(prev => {
        if (!prev.playerCards[playerIndex])
          prev.playerCards[playerIndex] = {
            left: null,
            right: null
          } as { left: null; right: null };

        return {
          ...prev,
          playerCards: prev.playerCards.map((hand, index) =>
            prev.heroIndex === index
              ? {
                  ...hand!,
                  [playerHand]: playingHand
                }
              : hand
          )
        };
      });
    },
    []
  );

  const setHeroPosition = React.useCallback((index: number) => {
    setGameSituation(prev => {
      const playerCardsCopy = Array.from(prev.playerCards);
      [playerCardsCopy[index], playerCardsCopy[prev.heroIndex]] = [
        prev.playerCards[prev.heroIndex],
        prev.playerCards[index]
      ];
      return {
        ...prev,
        playerCards: playerCardsCopy,
        heroIndex: index
      };
    });
  }, []);

  const setPreflopActions = React.useCallback(
    (index: number, gameStreetAction: GameStreetAction) => {
      setGameSituation(prev => {
        if (prev.preflop.actions.length - 1 < index) {
          prev.preflop.actions.push(gameStreetAction);
        } else {
          prev.preflop.actions[index] = gameStreetAction;
        }

        return { ...prev };
      });
    },
    []
  );

  const setFlopCommunityCard = React.useCallback(
    (flopCommunityCard: FlopCommunityCard, playingHand: PlayingCard) => {
      setGameSituation(prev => {
        if (!prev.flop)
          prev.flop = {
            actions: [],
            communityCards: {
              left: null,
              center: null,
              right: null
            }
          };

        prev.flop.communityCards[flopCommunityCard] = playingHand;

        return { ...prev };
      });
    },
    []
  );

  const setFlopActions = React.useCallback(
    (index: number, gameStreetAction: GameStreetAction) => {
      setGameSituation(prev => {
        if (!prev.flop)
          prev.flop = {
            communityCards: {
              left: null,
              center: null,
              right: null
            },
            actions: [] as GameStreetAction[]
          };
        prev.flop.actions[index] = gameStreetAction;

        return { ...prev };
      });
    },
    []
  );

  const setTurnCommunityCard = React.useCallback((playingHand: PlayingCard) => {
    setGameSituation(prev => {
      if (!prev.turn)
        prev.turn = {
          communityCard: null,
          actions: [] as GameStreetAction[]
        };

      return {
        ...prev,
        turn: {
          ...prev.turn,
          communityCard: playingHand
        }
      };
    });
  }, []);

  const setTurnActions = React.useCallback(
    (index: number, gameStreetAction: GameStreetAction) => {
      setGameSituation(prev => {
        if (!prev.turn)
          prev.turn = {
            communityCard: null,
            actions: [] as GameStreetAction[]
          };
        prev.turn.actions[index] = gameStreetAction;

        return { ...prev };
      });
    },
    []
  );

  const setRiverCommunityCard = React.useCallback(
    (playingHand: PlayingCard) => {
      setGameSituation(prev => {
        if (!prev.river)
          prev.river = {
            communityCard: playingHand,
            actions: [] as GameStreetAction[]
          };

        return { ...prev };
      });
    },
    []
  );

  const setRiverActions = React.useCallback(
    (index: number, gameStreetAction: GameStreetAction) => {
      setGameSituation(prev => {
        if (!prev.river)
          prev.river = {
            communityCard: null,
            actions: [] as GameStreetAction[]
          };
        prev.river.actions[index] = gameStreetAction;

        return { ...prev };
      });
    },
    []
  );

  const gameSituationSetter = {
    setPlayerLength: setPlayerLength,
    setGameType: setGameType,
    setSmallBlindSize: setSmallBlindSize,
    setAntiSize: setAntiSize,
    setPlayerHand: setPlayerHand,
    setHeroPosition: setHeroPosition,
    setPreflopActions: setPreflopActions,
    setFlopCommunityCard: setFlopCommunityCard,
    setFlopActions: setFlopActions,
    deleteStreet: deleteStreet,
    setTurnCommunityCard: setTurnCommunityCard,
    setTurnActions: setTurnActions,
    setRiverCommunityCard: setRiverCommunityCard,
    setRiverActions: setRiverActions
  };

  return {
    formData: {
      title: title as PostTitle,
      body: body as PostBody,
      gameSituation: gameSituation
    },
    setTitle: setTitle,
    setBody: setBody,
    gameSituationSetter: gameSituationSetter
  };
}

const initialPostData: PostingGameSituation = {
  type: GameType.cash,
  playerLength: 2,
  playerStackSizes: [] as number[],
  playerCards: [
    {
      left: {
        rank: Rank.deuce,
        suit: Suit.club
      } as PlayingCard,
      right: {
        rank: Rank.deuce,
        suit: Suit.diamond
      } as PlayingCard
    },
    null
  ],
  heroIndex: 0,
  smallBlindSize: 0.5,
  antiSize: 0,
  preflop: {
    actions: [] as GameStreetAction[]
  }
};

export enum PlayerHand {
  left = "left",
  right = "right"
}

export enum FlopCommunityCard {
  left = "left",
  center = "center",
  right = "right"
}

export enum Street {
  flop = "flop",
  turn = "turn",
  river = "river"
}
