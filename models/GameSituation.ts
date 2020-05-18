import PlayingCard from "@@/models/PlayingCard";

export default interface GameSituation {
  type: GameType;
  players: {
    stackSize: number;
    holeCards: [PlayingCard, PlayingCard] | null;
  }[];
  heroIndex: number;
  smallBlindSize: number;
  antiSize: number;
  communityCards: PlayingCard[];
  preflopActions: GameStreetAction[];
  flopActions: GameStreetAction[];
  turnActions: GameStreetAction[];
  riverActions: GameStreetAction[];
}

export enum GameType {
  cash = "CASH",
  tournament = "TOURNAMENT",
}

export interface GameStreetAction {
  type: GameStreetActionType;
  playerIndex: number;
  betSize: number;
}

export enum GameStreetActionType {
  fold = "FOLD",
  check = "CHECK",
  call = "CALL",
  bet = "BET",
  raise = "RAISE",
}
