import { HandAction } from "./Hand";
import PlayingCard from "./PlayingCard";
import { GameType } from "./Post";

export default interface PostInputType {
  title: string;
  body: string;
  gameType: GameType;
  playerLength: number;
  playerStackSizes: number[];
  playerCards: PlayingCard[][];
  communityCards: PlayingCard[];
  heroIndex: number;
  smallBlindSize: number;
  antiSize: number;
  preflopActions: HandAction[];
  flopActions: HandAction[];
  turnActions: HandAction[];
  riverActions: HandAction[];
}
