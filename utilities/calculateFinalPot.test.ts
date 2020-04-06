import calculateFinalPot from "./calculateFinalPot";
import { GameType } from "../models/GameSituation";
import { Rank, Suit } from "../models/PlayingCard";

describe("calculateFinalPot(gameSituation)", () => {
  describe("return the final pot size", () => {
    describe("when the game ended at preflop", () => {
      test("and players have only one action in the street", () => {
        expect(
          calculateFinalPot({
            type: GameType.cash,
            playerLength: 2,
            playerStackSizes: [100, 120],
            playerCards: [null, null],
            heroIndex: 0,
            smallBlindSize: 0.5,
            antiSize: 0,
            preflop: {
              actions: [
                { playerIndex: 0, betSize: 3 },
                { playerIndex: 1, betSize: 1 },
              ],
            },
          })
        ).toBe(4);
      });

      test("and one player has one action and other have two in the street", () => {
        expect(
          calculateFinalPot({
            type: GameType.cash,
            playerLength: 3,
            playerStackSizes: [100, 120],
            playerCards: [null, null],
            heroIndex: 0,
            smallBlindSize: 0.5,
            antiSize: 0,
            preflop: {
              actions: [
                { playerIndex: 2, betSize: 2 },
                { playerIndex: 0, betSize: 2 },
                { playerIndex: 1, betSize: 4 },
                { playerIndex: 2, betSize: 2 },
                { playerIndex: 0, betSize: 2 },
              ],
            },
          })
        ).toBe(8);
      });

      test("and some players have second action and some other players have third action in the street", () => {
        expect(
          calculateFinalPot({
            type: GameType.cash,
            playerLength: 4,
            playerStackSizes: [100, 120],
            playerCards: [null, null],
            heroIndex: 0,
            smallBlindSize: 0.5,
            antiSize: 0,
            preflop: {
              actions: [
                { playerIndex: 2, betSize: 2 },
                { playerIndex: 3, betSize: 2 },
                { playerIndex: 0, betSize: 2 },
                { playerIndex: 1, betSize: 2 },
                { playerIndex: 2, betSize: 4 },
                { playerIndex: 3, betSize: 4 },
                { playerIndex: 0, betSize: 4 },
                { playerIndex: 1, betSize: 8 },
                { playerIndex: 2, betSize: 4 },
                { playerIndex: 3, betSize: 4 },
                { playerIndex: 0, betSize: 4 },
              ],
            },
          })
        ).toBe(20);
      });

      test("and players have different action number in the street", () => {
        expect(
          calculateFinalPot({
            type: GameType.cash,
            playerLength: 6,
            playerStackSizes: [100, 120],
            playerCards: [null, null],
            heroIndex: 0,
            smallBlindSize: 0.5,
            antiSize: 0,
            preflop: {
              actions: [
                { playerIndex: 2, betSize: 2 },
                { playerIndex: 3, betSize: 2 },
                { playerIndex: 4, betSize: 2 },
                { playerIndex: 5, betSize: 2 },
                { playerIndex: 0, betSize: 4 },
                { playerIndex: 1, betSize: 1 },
                { playerIndex: 2, betSize: 4 },
                { playerIndex: 3, betSize: 4 },
                { playerIndex: 4, betSize: 7 },
                { playerIndex: 5, betSize: 2 },
                { playerIndex: 0, betSize: 7 },
                { playerIndex: 2, betSize: 10 },
                { playerIndex: 3, betSize: 10 },
                { playerIndex: 4, betSize: 15 },
                { playerIndex: 0, betSize: 7 },
                { playerIndex: 2, betSize: 15 },
                { playerIndex: 3, betSize: 22 },
                { playerIndex: 4, betSize: 15 },
                { playerIndex: 2, betSize: 30 },
                { playerIndex: 3, betSize: 22 },
              ],
            },
          })
        ).toBe(77);
      });
    });

    describe("when the game ended at flop", () => {
      test("and players have only one action in the street", () => {
        expect(
          calculateFinalPot({
            type: GameType.cash,
            playerLength: 4,
            playerStackSizes: [100, 120],
            playerCards: [null, null],
            heroIndex: 0,
            smallBlindSize: 0.5,
            antiSize: 0,
            preflop: {
              actions: [
                { playerIndex: 2, betSize: 1 },
                { playerIndex: 3, betSize: 1 },
                { playerIndex: 0, betSize: 1 },
                { playerIndex: 1, betSize: 1 },
              ],
            },
            flop: {
              actions: [
                { playerIndex: 0, betSize: 2 },
                { playerIndex: 1, betSize: 0 },
                { playerIndex: 2, betSize: 0 },
                { playerIndex: 3, betSize: 0 },
              ],
              communityCards: {
                left: { rank: Rank.ace, suit: Suit.club },
                center: { rank: Rank.deuce, suit: Suit.club },
                right: { rank: Rank.eight, suit: Suit.club },
              },
            },
          })
        ).toBe(6);
      });

      test("and one player has one action and other have two in the street", () => {
        expect(
          calculateFinalPot({
            type: GameType.cash,
            playerLength: 4,
            playerStackSizes: [100, 120],
            playerCards: [null, null],
            heroIndex: 0,
            smallBlindSize: 0.5,
            antiSize: 0,
            preflop: {
              actions: [
                { playerIndex: 2, betSize: 1 },
                { playerIndex: 3, betSize: 1 },
                { playerIndex: 0, betSize: 1 },
                { playerIndex: 1, betSize: 1 },
              ],
            },
            flop: {
              actions: [
                { playerIndex: 0, betSize: 2 },
                { playerIndex: 1, betSize: 2 },
                { playerIndex: 2, betSize: 2 },
                { playerIndex: 3, betSize: 4 },
                { playerIndex: 0, betSize: 2 },
                { playerIndex: 1, betSize: 2 },
                { playerIndex: 2, betSize: 2 },
              ],
              communityCards: {
                left: { rank: Rank.ace, suit: Suit.club },
                center: { rank: Rank.deuce, suit: Suit.club },
                right: { rank: Rank.eight, suit: Suit.club },
              },
            },
          })
        ).toBe(14);
      });

      test("and some players have second action and some other players have third action in the street", () => {
        expect(
          calculateFinalPot({
            type: GameType.cash,
            playerLength: 4,
            playerStackSizes: [100, 120],
            playerCards: [null, null],
            heroIndex: 0,
            smallBlindSize: 0.5,
            antiSize: 0,
            preflop: {
              actions: [
                { playerIndex: 2, betSize: 1 },
                { playerIndex: 3, betSize: 1 },
                { playerIndex: 0, betSize: 1 },
                { playerIndex: 1, betSize: 1 },
              ],
            },
            flop: {
              actions: [
                { playerIndex: 0, betSize: 2 },
                { playerIndex: 1, betSize: 2 },
                { playerIndex: 2, betSize: 2 },
                { playerIndex: 3, betSize: 2 },
                { playerIndex: 0, betSize: 4 },
                { playerIndex: 1, betSize: 4 },
                { playerIndex: 2, betSize: 4 },
                { playerIndex: 3, betSize: 8 },
                { playerIndex: 0, betSize: 4 },
                { playerIndex: 1, betSize: 4 },
                { playerIndex: 2, betSize: 4 },
              ],
              communityCards: {
                left: { rank: Rank.ace, suit: Suit.club },
                center: { rank: Rank.deuce, suit: Suit.club },
                right: { rank: Rank.eight, suit: Suit.club },
              },
            },
          })
        ).toBe(24);
      });

      test("and players have different action number in the street", () => {
        expect(
          calculateFinalPot({
            type: GameType.cash,
            playerLength: 5,
            playerStackSizes: [100, 120],
            playerCards: [null, null],
            heroIndex: 0,
            smallBlindSize: 0.5,
            antiSize: 0,
            preflop: {
              actions: [
                { playerIndex: 2, betSize: 1 },
                { playerIndex: 3, betSize: 1 },
                { playerIndex: 4, betSize: 1 },
                { playerIndex: 0, betSize: 1 },
                { playerIndex: 1, betSize: 1 },
              ],
            },
            flop: {
              actions: [
                { playerIndex: 0, betSize: 0 },
                { playerIndex: 1, betSize: 2 },
                { playerIndex: 2, betSize: 2 },
                { playerIndex: 3, betSize: 4 },
                { playerIndex: 4, betSize: 0 },
                { playerIndex: 0, betSize: 0 },
                { playerIndex: 1, betSize: 4 },
                { playerIndex: 2, betSize: 8 },
                { playerIndex: 3, betSize: 8 },
                { playerIndex: 1, betSize: 14 },
                { playerIndex: 2, betSize: 8 },
                { playerIndex: 3, betSize: 20 },
                { playerIndex: 1, betSize: 14 },
              ],
              communityCards: {
                left: { rank: Rank.ace, suit: Suit.club },
                center: { rank: Rank.deuce, suit: Suit.club },
                right: { rank: Rank.eight, suit: Suit.club },
              },
            },
          })
        ).toBe(47);
      });
    });

    describe("when the game ended at turn", () => {
      test("and players have only one action in the street", () => {
        expect(
          calculateFinalPot({
            type: GameType.cash,
            playerLength: 4,
            playerStackSizes: [100, 120],
            playerCards: [null, null],
            heroIndex: 0,
            smallBlindSize: 0.5,
            antiSize: 0,
            preflop: {
              actions: [
                { playerIndex: 2, betSize: 1 },
                { playerIndex: 3, betSize: 1 },
                { playerIndex: 0, betSize: 1 },
                { playerIndex: 1, betSize: 1 },
              ],
            },
            flop: {
              actions: [
                { playerIndex: 0, betSize: 0 },
                { playerIndex: 1, betSize: 0 },
                { playerIndex: 2, betSize: 0 },
                { playerIndex: 3, betSize: 0 },
              ],
              communityCards: {
                left: { rank: Rank.ace, suit: Suit.club },
                center: { rank: Rank.deuce, suit: Suit.club },
                right: { rank: Rank.eight, suit: Suit.club },
              },
            },
            turn: {
              actions: [
                { playerIndex: 0, betSize: 1 },
                { playerIndex: 1, betSize: 0 },
                { playerIndex: 2, betSize: 0 },
                { playerIndex: 3, betSize: 0 },
              ],
              communityCard: { rank: Rank.four, suit: Suit.club },
            },
          })
        ).toBe(5);
      });

      test("and one player has one action and other have two in the street", () => {
        expect(
          calculateFinalPot({
            type: GameType.cash,
            playerLength: 4,
            playerStackSizes: [100, 120],
            playerCards: [null, null],
            heroIndex: 0,
            smallBlindSize: 0.5,
            antiSize: 0,
            preflop: {
              actions: [
                { playerIndex: 2, betSize: 1 },
                { playerIndex: 3, betSize: 1 },
                { playerIndex: 0, betSize: 1 },
                { playerIndex: 1, betSize: 1 },
              ],
            },
            flop: {
              actions: [
                { playerIndex: 0, betSize: 0 },
                { playerIndex: 1, betSize: 0 },
                { playerIndex: 2, betSize: 0 },
                { playerIndex: 3, betSize: 0 },
              ],
              communityCards: {
                left: { rank: Rank.ace, suit: Suit.club },
                center: { rank: Rank.deuce, suit: Suit.club },
                right: { rank: Rank.eight, suit: Suit.club },
              },
            },
            turn: {
              actions: [
                { playerIndex: 0, betSize: 1 },
                { playerIndex: 1, betSize: 1 },
                { playerIndex: 2, betSize: 1 },
                { playerIndex: 3, betSize: 3 },
                { playerIndex: 0, betSize: 1 },
                { playerIndex: 1, betSize: 1 },
                { playerIndex: 2, betSize: 1 },
              ],
              communityCard: { rank: Rank.four, suit: Suit.club },
            },
          })
        ).toBe(10);
      });

      test("and some players have second action and some other players have third action in the street", () => {
        expect(
          calculateFinalPot({
            type: GameType.cash,
            playerLength: 4,
            playerStackSizes: [100, 120],
            playerCards: [null, null],
            heroIndex: 0,
            smallBlindSize: 0.5,
            antiSize: 0,
            preflop: {
              actions: [
                { playerIndex: 2, betSize: 1 },
                { playerIndex: 3, betSize: 1 },
                { playerIndex: 0, betSize: 1 },
                { playerIndex: 1, betSize: 1 },
              ],
            },
            flop: {
              actions: [
                { playerIndex: 0, betSize: 0 },
                { playerIndex: 1, betSize: 0 },
                { playerIndex: 2, betSize: 0 },
                { playerIndex: 3, betSize: 0 },
              ],
              communityCards: {
                left: { rank: Rank.ace, suit: Suit.club },
                center: { rank: Rank.deuce, suit: Suit.club },
                right: { rank: Rank.eight, suit: Suit.club },
              },
            },
            turn: {
              actions: [
                { playerIndex: 0, betSize: 1 },
                { playerIndex: 1, betSize: 1 },
                { playerIndex: 2, betSize: 1 },
                { playerIndex: 3, betSize: 3 },
                { playerIndex: 0, betSize: 3 },
                { playerIndex: 1, betSize: 3 },
                { playerIndex: 2, betSize: 6 },
                { playerIndex: 3, betSize: 3 },
                { playerIndex: 0, betSize: 3 },
                { playerIndex: 1, betSize: 3 },
              ],
              communityCard: { rank: Rank.four, suit: Suit.club },
            },
          })
        ).toBe(19);
      });

      test("and players have different action number in the street", () => {
        expect(
          calculateFinalPot({
            type: GameType.cash,
            playerLength: 6,
            playerStackSizes: [100, 120],
            playerCards: [null, null],
            heroIndex: 0,
            smallBlindSize: 0.5,
            antiSize: 0,
            preflop: {
              actions: [
                { playerIndex: 2, betSize: 1 },
                { playerIndex: 3, betSize: 1 },
                { playerIndex: 4, betSize: 1 },
                { playerIndex: 5, betSize: 1 },
                { playerIndex: 0, betSize: 1 },
                { playerIndex: 1, betSize: 1 },
              ],
            },
            flop: {
              actions: [
                { playerIndex: 0, betSize: 0 },
                { playerIndex: 1, betSize: 0 },
                { playerIndex: 2, betSize: 0 },
                { playerIndex: 3, betSize: 0 },
                { playerIndex: 4, betSize: 0 },
                { playerIndex: 5, betSize: 0 },
              ],
              communityCards: {
                left: { rank: Rank.ace, suit: Suit.club },
                center: { rank: Rank.deuce, suit: Suit.club },
                right: { rank: Rank.eight, suit: Suit.club },
              },
            },
            turn: {
              actions: [
                { playerIndex: 0, betSize: 2 },
                { playerIndex: 1, betSize: 0 },
                { playerIndex: 2, betSize: 2 },
                { playerIndex: 3, betSize: 4 },
                { playerIndex: 4, betSize: 4 },
                { playerIndex: 5, betSize: 4 },
                { playerIndex: 0, betSize: 6 },
                { playerIndex: 2, betSize: 2 },
                { playerIndex: 3, betSize: 6 },
                { playerIndex: 4, betSize: 6 },
                { playerIndex: 5, betSize: 10 },
                { playerIndex: 0, betSize: 6 },
                { playerIndex: 3, betSize: 10 },
                { playerIndex: 4, betSize: 16 },
                { playerIndex: 5, betSize: 16 },
                { playerIndex: 3, betSize: 24 },
                { playerIndex: 4, betSize: 34 },
                { playerIndex: 5, betSize: 16 },
                { playerIndex: 3, betSize: 24 },
              ],
              communityCard: { rank: Rank.four, suit: Suit.club },
            },
          })
        ).toBe(88);
      });
    });

    describe("when the game ended at river", () => {
      test("and players have only one action in the street", () => {
        expect(
          calculateFinalPot({
            type: GameType.cash,
            playerLength: 3,
            playerStackSizes: [100, 120],
            playerCards: [null, null],
            heroIndex: 0,
            smallBlindSize: 0.5,
            antiSize: 0,
            preflop: {
              actions: [
                { playerIndex: 2, betSize: 1 },
                { playerIndex: 0, betSize: 1 },
                { playerIndex: 1, betSize: 1 },
              ],
            },
            flop: {
              actions: [
                { playerIndex: 0, betSize: 0 },
                { playerIndex: 1, betSize: 0 },
                { playerIndex: 2, betSize: 0 },
              ],
              communityCards: {
                left: { rank: Rank.ace, suit: Suit.club },
                center: { rank: Rank.deuce, suit: Suit.club },
                right: { rank: Rank.eight, suit: Suit.club },
              },
            },
            turn: {
              actions: [
                { playerIndex: 0, betSize: 0 },
                { playerIndex: 1, betSize: 0 },
                { playerIndex: 2, betSize: 0 },
              ],
              communityCard: { rank: Rank.four, suit: Suit.club },
            },
            river: {
              actions: [
                { playerIndex: 0, betSize: 20 },
                { playerIndex: 1, betSize: 0 },
                { playerIndex: 2, betSize: 0 },
              ],
              communityCard: { rank: Rank.five, suit: Suit.club },
            },
          })
        ).toBe(23);
      });

      test("and one player has one action and other have two in the street", () => {
        expect(
          calculateFinalPot({
            type: GameType.cash,
            playerLength: 3,
            playerStackSizes: [100, 120],
            playerCards: [null, null],
            heroIndex: 0,
            smallBlindSize: 0.5,
            antiSize: 0,
            preflop: {
              actions: [
                { playerIndex: 2, betSize: 1 },
                { playerIndex: 0, betSize: 1 },
                { playerIndex: 1, betSize: 1 },
              ],
            },
            flop: {
              actions: [
                { playerIndex: 0, betSize: 0 },
                { playerIndex: 1, betSize: 0 },
                { playerIndex: 2, betSize: 0 },
              ],
              communityCards: {
                left: { rank: Rank.ace, suit: Suit.club },
                center: { rank: Rank.deuce, suit: Suit.club },
                right: { rank: Rank.eight, suit: Suit.club },
              },
            },
            turn: {
              actions: [
                { playerIndex: 0, betSize: 0 },
                { playerIndex: 1, betSize: 0 },
                { playerIndex: 2, betSize: 0 },
              ],
              communityCard: { rank: Rank.four, suit: Suit.club },
            },
            river: {
              actions: [
                { playerIndex: 0, betSize: 5 },
                { playerIndex: 1, betSize: 5 },
                { playerIndex: 2, betSize: 15 },
                { playerIndex: 0, betSize: 5 },
                { playerIndex: 1, betSize: 5 },
              ],
              communityCard: { rank: Rank.five, suit: Suit.club },
            },
          })
        ).toBe(28);
      });

      test("and some players have second action and some other players have third action in the street", () => {
        expect(
          calculateFinalPot({
            type: GameType.cash,
            playerLength: 10,
            playerStackSizes: [100, 120],
            playerCards: [null, null],
            heroIndex: 0,
            smallBlindSize: 0.5,
            antiSize: 0,
            preflop: {
              actions: [
                { playerIndex: 2, betSize: 1 },
                { playerIndex: 3, betSize: 1 },
                { playerIndex: 4, betSize: 1 },
                { playerIndex: 5, betSize: 1 },
                { playerIndex: 6, betSize: 1 },
                { playerIndex: 7, betSize: 1 },
                { playerIndex: 8, betSize: 1 },
                { playerIndex: 9, betSize: 1 },
                { playerIndex: 0, betSize: 1 },
                { playerIndex: 1, betSize: 1 },
              ],
            },
            flop: {
              actions: [
                { playerIndex: 0, betSize: 5 },
                { playerIndex: 1, betSize: 5 },
                { playerIndex: 2, betSize: 5 },
                { playerIndex: 3, betSize: 5 },
                { playerIndex: 4, betSize: 5 },
                { playerIndex: 5, betSize: 5 },
                { playerIndex: 6, betSize: 5 },
                { playerIndex: 7, betSize: 5 },
                { playerIndex: 8, betSize: 5 },
                { playerIndex: 9, betSize: 5 },
              ],
              communityCards: {
                left: { rank: Rank.ace, suit: Suit.club },
                center: { rank: Rank.deuce, suit: Suit.club },
                right: { rank: Rank.eight, suit: Suit.club },
              },
            },
            turn: {
              actions: [
                { playerIndex: 0, betSize: 10 },
                { playerIndex: 1, betSize: 10 },
                { playerIndex: 2, betSize: 10 },
                { playerIndex: 3, betSize: 10 },
                { playerIndex: 4, betSize: 10 },
                { playerIndex: 5, betSize: 10 },
                { playerIndex: 6, betSize: 10 },
                { playerIndex: 7, betSize: 10 },
                { playerIndex: 8, betSize: 10 },
                { playerIndex: 9, betSize: 10 },
              ],
              communityCard: { rank: Rank.four, suit: Suit.club },
            },
            river: {
              actions: [
                { playerIndex: 0, betSize: 10 },
                { playerIndex: 1, betSize: 10 },
                { playerIndex: 2, betSize: 10 },
                { playerIndex: 3, betSize: 10 },
                { playerIndex: 4, betSize: 10 },
                { playerIndex: 5, betSize: 10 },
                { playerIndex: 6, betSize: 10 },
                { playerIndex: 7, betSize: 10 },
                { playerIndex: 8, betSize: 10 },
                { playerIndex: 9, betSize: 20 },
                { playerIndex: 0, betSize: 20 },
                { playerIndex: 1, betSize: 20 },
                { playerIndex: 2, betSize: 20 },
                { playerIndex: 3, betSize: 20 },
                { playerIndex: 4, betSize: 20 },
                { playerIndex: 5, betSize: 20 },
                { playerIndex: 6, betSize: 20 },
                { playerIndex: 7, betSize: 20 },
                { playerIndex: 8, betSize: 100 },
                { playerIndex: 9, betSize: 20 },
                { playerIndex: 0, betSize: 20 },
                { playerIndex: 1, betSize: 20 },
                { playerIndex: 2, betSize: 20 },
                { playerIndex: 3, betSize: 20 },
                { playerIndex: 4, betSize: 20 },
                { playerIndex: 5, betSize: 20 },
                { playerIndex: 6, betSize: 20 },
                { playerIndex: 7, betSize: 20 },
              ],
              communityCard: { rank: Rank.five, suit: Suit.club },
            },
          })
        ).toBe(440);
      });

      test("and players have different action number in the street", () => {
        expect(
          calculateFinalPot({
            type: GameType.cash,
            playerLength: 5,
            playerStackSizes: [100, 120],
            playerCards: [null, null],
            heroIndex: 0,
            smallBlindSize: 0.5,
            antiSize: 0,
            preflop: {
              actions: [
                { playerIndex: 2, betSize: 1 },
                { playerIndex: 3, betSize: 1 },
                { playerIndex: 4, betSize: 1 },
                { playerIndex: 0, betSize: 1 },
                { playerIndex: 1, betSize: 1 },
              ],
            },
            flop: {
              actions: [
                { playerIndex: 0, betSize: 0 },
                { playerIndex: 1, betSize: 0 },
                { playerIndex: 2, betSize: 0 },
                { playerIndex: 3, betSize: 0 },
                { playerIndex: 4, betSize: 0 },
              ],
              communityCards: {
                left: { rank: Rank.ace, suit: Suit.club },
                center: { rank: Rank.deuce, suit: Suit.club },
                right: { rank: Rank.eight, suit: Suit.club },
              },
            },
            turn: {
              actions: [
                { playerIndex: 0, betSize: 0 },
                { playerIndex: 1, betSize: 0 },
                { playerIndex: 2, betSize: 0 },
                { playerIndex: 3, betSize: 0 },
                { playerIndex: 4, betSize: 0 },
              ],
              communityCard: { rank: Rank.four, suit: Suit.club },
            },
            river: {
              actions: [
                { playerIndex: 0, betSize: 0 },
                { playerIndex: 1, betSize: 0 },
                { playerIndex: 2, betSize: 0 },
                { playerIndex: 3, betSize: 0 },
                { playerIndex: 4, betSize: 2 },
                { playerIndex: 0, betSize: 6 },
                { playerIndex: 1, betSize: 0 },
                { playerIndex: 2, betSize: 12 },
                { playerIndex: 3, betSize: 12 },
                { playerIndex: 4, betSize: 20 },
                { playerIndex: 0, betSize: 6 },
                { playerIndex: 2, betSize: 20 },
                { playerIndex: 3, betSize: 12 },
              ],
              communityCard: { rank: Rank.five, suit: Suit.club },
            },
          })
        ).toBe(63);
      });
    });

    describe("when the antiSize is set", () => {
      it("returns finalPot including antiSize * playerLength", () => {
        expect(
          calculateFinalPot({
            type: GameType.cash,
            playerLength: 2,
            playerStackSizes: [100, 120],
            playerCards: [null, null],
            heroIndex: 0,
            smallBlindSize: 0.5,
            antiSize: 0.2,
            preflop: {
              actions: [
                { playerIndex: 0, betSize: 1 },
                { playerIndex: 1, betSize: 0 },
              ],
            },
          })
        ).toBe(1.4);
        expect(
          calculateFinalPot({
            type: GameType.cash,
            playerLength: 3,
            playerStackSizes: [100, 120],
            playerCards: [null, null],
            heroIndex: 0,
            smallBlindSize: 0.5,
            antiSize: 0.3,
            preflop: {
              actions: [
                { playerIndex: 0, betSize: 1 },
                { playerIndex: 1, betSize: 0 },
                { playerIndex: 2, betSize: 1 },
              ],
            },
            flop: {
              communityCards: {
                left: { rank: Rank.ace, suit: Suit.club },
                center: { rank: Rank.deuce, suit: Suit.club },
                right: { rank: Rank.eight, suit: Suit.club },
              },
              actions: [
                { playerIndex: 0, betSize: 1 },
                { playerIndex: 2, betSize: 0 },
              ],
            },
          })
        ).toBe(3.9);
      });
    });
  });
});
