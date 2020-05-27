import Hand from "@@/models/Hand";

export function fromHand(hand: Hand): Record<string, any> {
  return {
    playerInitialStackSizes: [...hand.playerInitialStackSizes],
    playerCards: [...hand.playerCards],
    smallBlindSize: hand.smallBlindSize,
    antiSize: hand.antiSize,
    communityCards: hand.communityCards,
    preflopActions: hand.preflopActions,
    flopActions: hand.flopActions,
    turnActions: hand.turnActions,
    riverActions: hand.riverActions,
  };
}

export function toHand(json: Record<string, any>): Hand {
  return new Hand({
    playerInitialStackSizes: new Map(json.playerInitialStackSizes),
    playerCards: new Map(json.playerCards),
    smallBlindSize: json.smallBlindSize,
    antiSize: json.antiSize,
    communityCards: json.communityCards,
    preflopActions: json.preflopActions,
    flopActions: json.flopActions,
    turnActions: json.turnActions,
    riverActions: json.riverActions,
  });
}
