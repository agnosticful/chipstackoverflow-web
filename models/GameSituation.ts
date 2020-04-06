import PlayingCard from "./PlayingCard";

export default interface GameSituation {
  type: GameType;
  playerLength: number;
  playerStackSizes: number[];
  playerCards: ({
    left: PlayingCard;
    right: PlayingCard;
  } | null)[];
  heroIndex: number;
  smallBlindSize: number;
  antiSize: number;
  preflop: {
    actions: GameStreetAction[];
  };
  flop?: {
    communityCards: {
      left: PlayingCard;
      center: PlayingCard;
      right: PlayingCard;
    };
    actions: GameStreetAction[];
  };
  turn?: {
    communityCard: PlayingCard;
    actions: GameStreetAction[];
  };
  river?: {
    communityCard: PlayingCard;
    actions: GameStreetAction[];
  };
}

export enum GameType {
  cash = "CASH",
  tournament = "TOURNAMENT",
}

export interface GameStreetAction {
  type: Type;
  playerIndex: number;
  betSize: number;
}

export enum Type {
  fold = "FOLD",
  check = "CHECK",
  call = "CALL",
  bet = "BET",
  raise = "RAISE",
}
