import {
  GameStreetActionType,
  GameStreetAction,
} from "../../models/GameSituation";
import { Street } from "./playerActionReducer";

export default function createEmptyGameStreetActions(
  street: Street,
  playerLength?: number
): GameStreetAction[] {
  if (street === Street.preflop)
    return Array.from({ length: playerLength! }, (_, playerIndex) => ({
      type: GameStreetActionType.fold,
      playerIndex,
      betSize: 0,
    }));

  return [];
}
