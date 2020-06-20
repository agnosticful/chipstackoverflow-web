import { HandAction } from "@@/models/Hand";
import PlayingCard from "@@/models/PlayingCard";
import { GameType } from "@@/models/Post";

export default interface PostInput {
  title: string;
  body: string;
  gameType: GameType;
  playerLength: number;
  playerStackSizes: number[];
  playerCards: (PlayingCard | null)[][];
  communityCards: (PlayingCard | null)[];
  heroIndex: number;
  smallBlindSize: number;
  antiSize: number;
  preflopActions: HandAction[];
  flopActions: HandAction[];
  turnActions: HandAction[];
  riverActions: HandAction[];
}
