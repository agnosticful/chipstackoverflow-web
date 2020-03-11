import PlayingCard from "./PlayingCard";

export default interface GameSituation {
  type: GameType;
  players: number;
  heroIndex: number;
  smallBlindSize: number;
  antiSize: number;
  preflop: {
    actions: GameStreetAction[];
  };
  flop?: {
    communityCards: PlayingCard[];
    actions: GameStreetAction[];
  };
  turn?: {
    communityCards: PlayingCard[];
    actions: GameStreetAction[];
  };
  river?: {
    communityCards: PlayingCard[];
    actions: GameStreetAction[];
  };
}

export enum GameType {
  cash = "CASH",
  tournament = "TOURNAMENT"
}

export interface GameStreetAction {
  playerIndex: number;
  betSize: number;
}
