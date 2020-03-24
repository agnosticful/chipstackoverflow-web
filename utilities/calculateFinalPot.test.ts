import { GameType } from "../models/GameSituation";
import { Rank, Suit } from "../models/PlayingCard";
import calculateFinalPot from "./calculateFinalPot";

describe("calculateFinalPot()", () => {
  it("returns final pot when ended street is preflop", () => {
    expect(
      calculateFinalPot({
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
        antiSize: 0.2,
        preflop: {
          actions: [
            {
              playerIndex: 0,
              betSize: 0
            },
            {
              playerIndex: 1,
              betSize: 0.05
            }
          ]
        }
      })
    ).toBe(0.45);
  });

  it("returns final pot when ended street is flop", () => {
    expect(
      calculateFinalPot({
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
        antiSize: 0,
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
        antiSize: 0.05,
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
    ).toBe(3.2);
  });

  it("returns final pot when ended street is river", () => {
    expect(
      calculateFinalPot({
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
        antiSize: 0,
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
