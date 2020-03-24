import { GameType } from "../models/GameSituation";
import { Rank, Suit } from "../models/PlayingCard";
import calculateFinalPot from "./calculateFinalPot";

describe("calculateFinalPot()", () => {
  const baseGameSituation = {
    type: GameType.cash,
    playerLength: 2,
    playerStackSizes: [0, 0],
    heroIndex: 0,
    playerCards: [
      {
        left: {
          rank: Rank.seven,
          suit: Suit.heart
        },
        right: {
          rank: Rank.eight,
          suit: Suit.diamond
        }
      },
      null
    ],
    smallBlindSize: 0.05,
    antiSize: 0
  };

  it("returns final pot when ended street is preflop", () => {
    expect(
      calculateFinalPot({
        ...baseGameSituation,
        preflop: {
          actions: [
            {
              playerIndex: 0,
              betSize: 0
            },
            {
              playerIndex: 1,
              betSize: 0.025
            }
          ]
        }
      })
    ).toBe(0.025);
  });

  it("returns final pot when ended street is flop", () => {
    expect(
      calculateFinalPot({
        ...baseGameSituation,
        preflop: {
          actions: [
            {
              playerIndex: 0,
              betSize: 0.05
            },
            {
              playerIndex: 1,
              betSize: 0.05
            },
            {
              playerIndex: 0,
              betSize: 0
            },
            {
              playerIndex: 1,
              betSize: 0
            }
          ]
        },
        flop: {
          communityCards: {
            left: {
              suit: Suit.diamond,
              rank: Rank.five
            },
            center: {
              suit: Suit.diamond,
              rank: Rank.six
            },
            right: {
              suit: Suit.diamond,
              rank: Rank.seven
            }
          },
          actions: [
            {
              playerIndex: 0,
              betSize: 1.0
            },
            {
              playerIndex: 1,
              betSize: 0
            }
          ]
        }
      })
    ).toBe(1.1);
  });

  it("returns final pot when ended street is turn", () => {
    expect(
      calculateFinalPot({
        ...baseGameSituation,
        preflop: {
          actions: [
            {
              playerIndex: 0,
              betSize: 0.05
            },
            {
              playerIndex: 1,
              betSize: 0.05
            },
            {
              playerIndex: 0,
              betSize: 0
            },
            {
              playerIndex: 1,
              betSize: 0
            }
          ]
        },
        flop: {
          communityCards: {
            left: {
              suit: Suit.diamond,
              rank: Rank.five
            },
            center: {
              suit: Suit.diamond,
              rank: Rank.six
            },
            right: {
              suit: Suit.diamond,
              rank: Rank.seven
            }
          },
          actions: [
            {
              playerIndex: 0,
              betSize: 1.0
            },
            {
              playerIndex: 1,
              betSize: 1.0
            },
            {
              playerIndex: 0,
              betSize: 0
            },
            {
              playerIndex: 1,
              betSize: 0
            }
          ]
        },
        turn: {
          communityCard: {
            suit: Suit.diamond,
            rank: Rank.five
          },
          actions: [
            {
              playerIndex: 0,
              betSize: 1.0
            },
            {
              playerIndex: 1,
              betSize: 0
            }
          ]
        }
      })
    ).toBe(3.1);
  });

  it("returns final pot when ended street is river", () => {
    expect(
      calculateFinalPot({
        ...baseGameSituation,
        preflop: {
          actions: [
            {
              playerIndex: 0,
              betSize: 0.05
            },
            {
              playerIndex: 1,
              betSize: 0.05
            },
            {
              playerIndex: 0,
              betSize: 0
            },
            {
              playerIndex: 1,
              betSize: 0
            }
          ]
        },
        flop: {
          communityCards: {
            left: {
              suit: Suit.diamond,
              rank: Rank.five
            },
            center: {
              suit: Suit.diamond,
              rank: Rank.six
            },
            right: {
              suit: Suit.diamond,
              rank: Rank.seven
            }
          },
          actions: [
            {
              playerIndex: 0,
              betSize: 1.0
            },
            {
              playerIndex: 1,
              betSize: 1.0
            },
            {
              playerIndex: 0,
              betSize: 0
            },
            {
              playerIndex: 1,
              betSize: 0
            }
          ]
        },
        turn: {
          communityCard: {
            suit: Suit.diamond,
            rank: Rank.five
          },
          actions: [
            {
              playerIndex: 0,
              betSize: 1.0
            },
            {
              playerIndex: 1,
              betSize: 1.0
            },
            {
              playerIndex: 0,
              betSize: 0
            },
            {
              playerIndex: 1,
              betSize: 0
            }
          ]
        },
        river: {
          communityCard: {
            suit: Suit.diamond,
            rank: Rank.seven
          },

          actions: [
            {
              playerIndex: 0,
              betSize: 1.0
            },
            {
              playerIndex: 1,
              betSize: 0
            }
          ]
        }
      })
    ).toBe(5.1);
  });
});
