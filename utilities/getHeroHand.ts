import GameSituation from "../models/GameSituation";
import PlayingCard from "../models/PlayingCard";

export default function getHeroHand(
  gameSituation: GameSituation
): [PlayingCard, PlayingCard] {
  const { heroIndex, playerCards } = gameSituation;
  const { left, right } = playerCards[heroIndex];
  return [left, right];
}
