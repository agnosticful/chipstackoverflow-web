import calculateFinalPot from "./calculateFinalPot";
import { GameType, GameStreetActionType } from "../models/GameSituation";
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
                {
                  type: GameStreetActionType.raise,
                  playerIndex: 0,
                  betSize: 3,
                },
                { type: GameStreetActionType.fold, playerIndex: 1, betSize: 1 },
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
                { type: GameStreetActionType.bet, playerIndex: 2, betSize: 2 },
                { type: GameStreetActionType.call, playerIndex: 0, betSize: 2 },
                {
                  type: GameStreetActionType.raise,
                  playerIndex: 1,
                  betSize: 4,
                },
                { type: GameStreetActionType.fold, playerIndex: 2, betSize: 2 },
                { type: GameStreetActionType.fold, playerIndex: 0, betSize: 2 },
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
                { type: GameStreetActionType.bet, playerIndex: 2, betSize: 2 },
                { type: GameStreetActionType.call, playerIndex: 3, betSize: 2 },
                { type: GameStreetActionType.call, playerIndex: 0, betSize: 2 },
                { type: GameStreetActionType.call, playerIndex: 1, betSize: 2 },
                {
                  type: GameStreetActionType.raise,
                  playerIndex: 2,
                  betSize: 4,
                },
                { type: GameStreetActionType.call, playerIndex: 3, betSize: 4 },
                { type: GameStreetActionType.call, playerIndex: 0, betSize: 4 },
                {
                  type: GameStreetActionType.raise,
                  playerIndex: 1,
                  betSize: 8,
                },
                { type: GameStreetActionType.fold, playerIndex: 2, betSize: 4 },
                { type: GameStreetActionType.fold, playerIndex: 3, betSize: 4 },
                { type: GameStreetActionType.fold, playerIndex: 0, betSize: 4 },
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
                { type: GameStreetActionType.bet, playerIndex: 2, betSize: 2 },
                { type: GameStreetActionType.call, playerIndex: 3, betSize: 2 },
                { type: GameStreetActionType.call, playerIndex: 4, betSize: 2 },
                { type: GameStreetActionType.call, playerIndex: 5, betSize: 2 },
                {
                  type: GameStreetActionType.raise,
                  playerIndex: 0,
                  betSize: 4,
                },
                { type: GameStreetActionType.fold, playerIndex: 1, betSize: 1 },
                { type: GameStreetActionType.call, playerIndex: 2, betSize: 4 },
                { type: GameStreetActionType.call, playerIndex: 3, betSize: 4 },
                {
                  type: GameStreetActionType.raise,
                  playerIndex: 4,
                  betSize: 7,
                },
                { type: GameStreetActionType.fold, playerIndex: 5, betSize: 2 },
                { type: GameStreetActionType.call, playerIndex: 0, betSize: 7 },
                {
                  type: GameStreetActionType.raise,
                  playerIndex: 2,
                  betSize: 10,
                },
                {
                  type: GameStreetActionType.call,
                  playerIndex: 3,
                  betSize: 10,
                },
                {
                  type: GameStreetActionType.raise,
                  playerIndex: 4,
                  betSize: 15,
                },
                { type: GameStreetActionType.fold, playerIndex: 0, betSize: 7 },
                {
                  type: GameStreetActionType.call,
                  playerIndex: 2,
                  betSize: 15,
                },
                {
                  type: GameStreetActionType.raise,
                  playerIndex: 3,
                  betSize: 22,
                },
                {
                  type: GameStreetActionType.fold,
                  playerIndex: 4,
                  betSize: 15,
                },
                {
                  type: GameStreetActionType.raise,
                  playerIndex: 2,
                  betSize: 30,
                },
                {
                  type: GameStreetActionType.fold,
                  playerIndex: 3,
                  betSize: 22,
                },
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
                { type: GameStreetActionType.bet, playerIndex: 2, betSize: 1 },
                { type: GameStreetActionType.call, playerIndex: 3, betSize: 1 },
                { type: GameStreetActionType.call, playerIndex: 0, betSize: 1 },
                { type: GameStreetActionType.call, playerIndex: 1, betSize: 1 },
              ],
            },
            flop: {
              actions: [
                { type: GameStreetActionType.bet, playerIndex: 0, betSize: 2 },
                { type: GameStreetActionType.fold, playerIndex: 1, betSize: 0 },
                { type: GameStreetActionType.fold, playerIndex: 2, betSize: 0 },
                { type: GameStreetActionType.fold, playerIndex: 3, betSize: 0 },
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
                { type: GameStreetActionType.bet, playerIndex: 2, betSize: 1 },
                { type: GameStreetActionType.call, playerIndex: 3, betSize: 1 },
                { type: GameStreetActionType.call, playerIndex: 0, betSize: 1 },
                { type: GameStreetActionType.call, playerIndex: 1, betSize: 1 },
              ],
            },
            flop: {
              actions: [
                { type: GameStreetActionType.bet, playerIndex: 0, betSize: 2 },
                { type: GameStreetActionType.call, playerIndex: 1, betSize: 2 },
                { type: GameStreetActionType.call, playerIndex: 2, betSize: 2 },
                {
                  type: GameStreetActionType.raise,
                  playerIndex: 3,
                  betSize: 4,
                },
                { type: GameStreetActionType.fold, playerIndex: 0, betSize: 2 },
                { type: GameStreetActionType.fold, playerIndex: 1, betSize: 2 },
                { type: GameStreetActionType.fold, playerIndex: 2, betSize: 2 },
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
                { type: GameStreetActionType.bet, playerIndex: 2, betSize: 1 },
                { type: GameStreetActionType.call, playerIndex: 3, betSize: 1 },
                { type: GameStreetActionType.call, playerIndex: 0, betSize: 1 },
                { type: GameStreetActionType.call, playerIndex: 1, betSize: 1 },
              ],
            },
            flop: {
              actions: [
                { type: GameStreetActionType.bet, playerIndex: 0, betSize: 2 },
                { type: GameStreetActionType.call, playerIndex: 1, betSize: 2 },
                { type: GameStreetActionType.call, playerIndex: 2, betSize: 2 },
                { type: GameStreetActionType.call, playerIndex: 3, betSize: 2 },
                {
                  type: GameStreetActionType.raise,
                  playerIndex: 0,
                  betSize: 4,
                },
                { type: GameStreetActionType.call, playerIndex: 1, betSize: 4 },
                { type: GameStreetActionType.call, playerIndex: 2, betSize: 4 },
                {
                  type: GameStreetActionType.raise,
                  playerIndex: 3,
                  betSize: 8,
                },
                { type: GameStreetActionType.fold, playerIndex: 0, betSize: 4 },
                { type: GameStreetActionType.fold, playerIndex: 1, betSize: 4 },
                { type: GameStreetActionType.fold, playerIndex: 2, betSize: 4 },
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
                { type: GameStreetActionType.bet, playerIndex: 2, betSize: 1 },
                { type: GameStreetActionType.call, playerIndex: 3, betSize: 1 },
                { type: GameStreetActionType.call, playerIndex: 4, betSize: 1 },
                { type: GameStreetActionType.call, playerIndex: 0, betSize: 1 },
                { type: GameStreetActionType.call, playerIndex: 1, betSize: 1 },
              ],
            },
            flop: {
              actions: [
                {
                  type: GameStreetActionType.check,
                  playerIndex: 0,
                  betSize: 0,
                },
                { type: GameStreetActionType.bet, playerIndex: 1, betSize: 2 },
                { type: GameStreetActionType.call, playerIndex: 2, betSize: 2 },
                {
                  type: GameStreetActionType.raise,
                  playerIndex: 3,
                  betSize: 4,
                },
                { type: GameStreetActionType.fold, playerIndex: 4, betSize: 0 },
                { type: GameStreetActionType.fold, playerIndex: 0, betSize: 0 },
                { type: GameStreetActionType.call, playerIndex: 1, betSize: 4 },
                {
                  type: GameStreetActionType.raise,
                  playerIndex: 2,
                  betSize: 8,
                },
                { type: GameStreetActionType.call, playerIndex: 3, betSize: 8 },
                {
                  type: GameStreetActionType.raise,
                  playerIndex: 1,
                  betSize: 14,
                },
                { type: GameStreetActionType.fold, playerIndex: 2, betSize: 8 },
                {
                  type: GameStreetActionType.raise,
                  playerIndex: 3,
                  betSize: 20,
                },
                {
                  type: GameStreetActionType.fold,
                  playerIndex: 1,
                  betSize: 14,
                },
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
                { type: GameStreetActionType.bet, playerIndex: 2, betSize: 1 },
                { type: GameStreetActionType.call, playerIndex: 3, betSize: 1 },
                { type: GameStreetActionType.call, playerIndex: 0, betSize: 1 },
                { type: GameStreetActionType.call, playerIndex: 1, betSize: 1 },
              ],
            },
            flop: {
              actions: [
                {
                  type: GameStreetActionType.check,
                  playerIndex: 0,
                  betSize: 0,
                },
                {
                  type: GameStreetActionType.check,
                  playerIndex: 1,
                  betSize: 0,
                },
                {
                  type: GameStreetActionType.check,
                  playerIndex: 2,
                  betSize: 0,
                },
                {
                  type: GameStreetActionType.check,
                  playerIndex: 3,
                  betSize: 0,
                },
              ],
              communityCards: {
                left: { rank: Rank.ace, suit: Suit.club },
                center: { rank: Rank.deuce, suit: Suit.club },
                right: { rank: Rank.eight, suit: Suit.club },
              },
            },
            turn: {
              actions: [
                { type: GameStreetActionType.bet, playerIndex: 0, betSize: 1 },
                { type: GameStreetActionType.fold, playerIndex: 1, betSize: 0 },
                { type: GameStreetActionType.fold, playerIndex: 2, betSize: 0 },
                { type: GameStreetActionType.fold, playerIndex: 3, betSize: 0 },
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
                { type: GameStreetActionType.bet, playerIndex: 2, betSize: 1 },
                { type: GameStreetActionType.call, playerIndex: 3, betSize: 1 },
                { type: GameStreetActionType.call, playerIndex: 0, betSize: 1 },
                { type: GameStreetActionType.call, playerIndex: 1, betSize: 1 },
              ],
            },
            flop: {
              actions: [
                {
                  type: GameStreetActionType.check,
                  playerIndex: 0,
                  betSize: 0,
                },
                {
                  type: GameStreetActionType.check,
                  playerIndex: 1,
                  betSize: 0,
                },
                {
                  type: GameStreetActionType.check,
                  playerIndex: 2,
                  betSize: 0,
                },
                {
                  type: GameStreetActionType.check,
                  playerIndex: 3,
                  betSize: 0,
                },
              ],
              communityCards: {
                left: { rank: Rank.ace, suit: Suit.club },
                center: { rank: Rank.deuce, suit: Suit.club },
                right: { rank: Rank.eight, suit: Suit.club },
              },
            },
            turn: {
              actions: [
                { type: GameStreetActionType.bet, playerIndex: 0, betSize: 1 },
                { type: GameStreetActionType.call, playerIndex: 1, betSize: 1 },
                { type: GameStreetActionType.call, playerIndex: 2, betSize: 1 },
                { type: GameStreetActionType.bet, playerIndex: 3, betSize: 3 },
                { type: GameStreetActionType.fold, playerIndex: 0, betSize: 1 },
                { type: GameStreetActionType.fold, playerIndex: 1, betSize: 1 },
                { type: GameStreetActionType.fold, playerIndex: 2, betSize: 1 },
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
                { type: GameStreetActionType.bet, playerIndex: 2, betSize: 1 },
                { type: GameStreetActionType.call, playerIndex: 3, betSize: 1 },
                { type: GameStreetActionType.call, playerIndex: 0, betSize: 1 },
                { type: GameStreetActionType.call, playerIndex: 1, betSize: 1 },
              ],
            },
            flop: {
              actions: [
                {
                  type: GameStreetActionType.check,
                  playerIndex: 0,
                  betSize: 0,
                },
                {
                  type: GameStreetActionType.check,
                  playerIndex: 1,
                  betSize: 0,
                },
                {
                  type: GameStreetActionType.check,
                  playerIndex: 2,
                  betSize: 0,
                },
                {
                  type: GameStreetActionType.check,
                  playerIndex: 3,
                  betSize: 0,
                },
              ],
              communityCards: {
                left: { rank: Rank.ace, suit: Suit.club },
                center: { rank: Rank.deuce, suit: Suit.club },
                right: { rank: Rank.eight, suit: Suit.club },
              },
            },
            turn: {
              actions: [
                { type: GameStreetActionType.bet, playerIndex: 0, betSize: 1 },
                { type: GameStreetActionType.call, playerIndex: 1, betSize: 1 },
                { type: GameStreetActionType.call, playerIndex: 2, betSize: 1 },
                {
                  type: GameStreetActionType.raise,
                  playerIndex: 3,
                  betSize: 3,
                },
                { type: GameStreetActionType.call, playerIndex: 0, betSize: 3 },
                { type: GameStreetActionType.call, playerIndex: 1, betSize: 3 },
                {
                  type: GameStreetActionType.raise,
                  playerIndex: 2,
                  betSize: 6,
                },
                { type: GameStreetActionType.fold, playerIndex: 3, betSize: 3 },
                { type: GameStreetActionType.fold, playerIndex: 0, betSize: 3 },
                { type: GameStreetActionType.fold, playerIndex: 1, betSize: 3 },
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
                { type: GameStreetActionType.bet, playerIndex: 2, betSize: 1 },
                { type: GameStreetActionType.call, playerIndex: 3, betSize: 1 },
                { type: GameStreetActionType.call, playerIndex: 4, betSize: 1 },
                { type: GameStreetActionType.call, playerIndex: 5, betSize: 1 },
                { type: GameStreetActionType.call, playerIndex: 0, betSize: 1 },
                { type: GameStreetActionType.call, playerIndex: 1, betSize: 1 },
              ],
            },
            flop: {
              actions: [
                {
                  type: GameStreetActionType.check,
                  playerIndex: 0,
                  betSize: 0,
                },
                {
                  type: GameStreetActionType.check,
                  playerIndex: 1,
                  betSize: 0,
                },
                {
                  type: GameStreetActionType.check,
                  playerIndex: 2,
                  betSize: 0,
                },
                {
                  type: GameStreetActionType.check,
                  playerIndex: 3,
                  betSize: 0,
                },
                {
                  type: GameStreetActionType.check,
                  playerIndex: 4,
                  betSize: 0,
                },
                {
                  type: GameStreetActionType.check,
                  playerIndex: 5,
                  betSize: 0,
                },
              ],
              communityCards: {
                left: { rank: Rank.ace, suit: Suit.club },
                center: { rank: Rank.deuce, suit: Suit.club },
                right: { rank: Rank.eight, suit: Suit.club },
              },
            },
            turn: {
              actions: [
                { type: GameStreetActionType.bet, playerIndex: 0, betSize: 2 },
                { type: GameStreetActionType.fold, playerIndex: 1, betSize: 0 },
                { type: GameStreetActionType.call, playerIndex: 2, betSize: 2 },
                {
                  type: GameStreetActionType.raise,
                  playerIndex: 3,
                  betSize: 4,
                },
                { type: GameStreetActionType.call, playerIndex: 4, betSize: 4 },
                { type: GameStreetActionType.call, playerIndex: 5, betSize: 4 },
                {
                  type: GameStreetActionType.raise,
                  playerIndex: 0,
                  betSize: 6,
                },
                { type: GameStreetActionType.fold, playerIndex: 2, betSize: 2 },
                { type: GameStreetActionType.call, playerIndex: 3, betSize: 6 },
                { type: GameStreetActionType.call, playerIndex: 4, betSize: 6 },
                {
                  type: GameStreetActionType.raise,
                  playerIndex: 5,
                  betSize: 10,
                },
                { type: GameStreetActionType.fold, playerIndex: 0, betSize: 6 },
                {
                  type: GameStreetActionType.call,
                  playerIndex: 3,
                  betSize: 10,
                },
                {
                  type: GameStreetActionType.raise,
                  playerIndex: 4,
                  betSize: 16,
                },
                {
                  type: GameStreetActionType.call,
                  playerIndex: 5,
                  betSize: 16,
                },
                {
                  type: GameStreetActionType.raise,
                  playerIndex: 3,
                  betSize: 24,
                },
                {
                  type: GameStreetActionType.raise,
                  playerIndex: 4,
                  betSize: 34,
                },
                {
                  type: GameStreetActionType.fold,
                  playerIndex: 5,
                  betSize: 16,
                },
                {
                  type: GameStreetActionType.fold,
                  playerIndex: 3,
                  betSize: 24,
                },
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
                { type: GameStreetActionType.bet, playerIndex: 2, betSize: 1 },
                { type: GameStreetActionType.call, playerIndex: 0, betSize: 1 },
                { type: GameStreetActionType.call, playerIndex: 1, betSize: 1 },
              ],
            },
            flop: {
              actions: [
                {
                  type: GameStreetActionType.check,
                  playerIndex: 0,
                  betSize: 0,
                },
                {
                  type: GameStreetActionType.check,
                  playerIndex: 1,
                  betSize: 0,
                },
                {
                  type: GameStreetActionType.check,
                  playerIndex: 2,
                  betSize: 0,
                },
              ],
              communityCards: {
                left: { rank: Rank.ace, suit: Suit.club },
                center: { rank: Rank.deuce, suit: Suit.club },
                right: { rank: Rank.eight, suit: Suit.club },
              },
            },
            turn: {
              actions: [
                {
                  type: GameStreetActionType.check,
                  playerIndex: 0,
                  betSize: 0,
                },
                {
                  type: GameStreetActionType.check,
                  playerIndex: 1,
                  betSize: 0,
                },
                {
                  type: GameStreetActionType.check,
                  playerIndex: 2,
                  betSize: 0,
                },
              ],
              communityCard: { rank: Rank.four, suit: Suit.club },
            },
            river: {
              actions: [
                { type: GameStreetActionType.bet, playerIndex: 0, betSize: 20 },
                { type: GameStreetActionType.fold, playerIndex: 1, betSize: 0 },
                { type: GameStreetActionType.fold, playerIndex: 2, betSize: 0 },
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
                { type: GameStreetActionType.bet, playerIndex: 2, betSize: 1 },
                { type: GameStreetActionType.call, playerIndex: 0, betSize: 1 },
                { type: GameStreetActionType.call, playerIndex: 1, betSize: 1 },
              ],
            },
            flop: {
              actions: [
                {
                  type: GameStreetActionType.check,
                  playerIndex: 0,
                  betSize: 0,
                },
                {
                  type: GameStreetActionType.check,
                  playerIndex: 1,
                  betSize: 0,
                },
                {
                  type: GameStreetActionType.check,
                  playerIndex: 2,
                  betSize: 0,
                },
              ],
              communityCards: {
                left: { rank: Rank.ace, suit: Suit.club },
                center: { rank: Rank.deuce, suit: Suit.club },
                right: { rank: Rank.eight, suit: Suit.club },
              },
            },
            turn: {
              actions: [
                {
                  type: GameStreetActionType.check,
                  playerIndex: 0,
                  betSize: 0,
                },
                {
                  type: GameStreetActionType.check,
                  playerIndex: 1,
                  betSize: 0,
                },
                {
                  type: GameStreetActionType.check,
                  playerIndex: 2,
                  betSize: 0,
                },
              ],
              communityCard: { rank: Rank.four, suit: Suit.club },
            },
            river: {
              actions: [
                { type: GameStreetActionType.bet, playerIndex: 0, betSize: 5 },
                { type: GameStreetActionType.call, playerIndex: 1, betSize: 5 },
                {
                  type: GameStreetActionType.raise,
                  playerIndex: 2,
                  betSize: 15,
                },
                { type: GameStreetActionType.fold, playerIndex: 0, betSize: 5 },
                { type: GameStreetActionType.fold, playerIndex: 1, betSize: 5 },
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
                { type: GameStreetActionType.bet, playerIndex: 2, betSize: 1 },
                { type: GameStreetActionType.call, playerIndex: 3, betSize: 1 },
                { type: GameStreetActionType.call, playerIndex: 4, betSize: 1 },
                { type: GameStreetActionType.call, playerIndex: 5, betSize: 1 },
                { type: GameStreetActionType.call, playerIndex: 6, betSize: 1 },
                { type: GameStreetActionType.call, playerIndex: 7, betSize: 1 },
                { type: GameStreetActionType.call, playerIndex: 8, betSize: 1 },
                { type: GameStreetActionType.call, playerIndex: 9, betSize: 1 },
                { type: GameStreetActionType.call, playerIndex: 0, betSize: 1 },
                { type: GameStreetActionType.call, playerIndex: 1, betSize: 1 },
              ],
            },
            flop: {
              actions: [
                { type: GameStreetActionType.bet, playerIndex: 0, betSize: 5 },
                { type: GameStreetActionType.call, playerIndex: 1, betSize: 5 },
                { type: GameStreetActionType.call, playerIndex: 2, betSize: 5 },
                { type: GameStreetActionType.call, playerIndex: 3, betSize: 5 },
                { type: GameStreetActionType.call, playerIndex: 4, betSize: 5 },
                { type: GameStreetActionType.call, playerIndex: 5, betSize: 5 },
                { type: GameStreetActionType.call, playerIndex: 6, betSize: 5 },
                { type: GameStreetActionType.call, playerIndex: 7, betSize: 5 },
                { type: GameStreetActionType.call, playerIndex: 8, betSize: 5 },
                { type: GameStreetActionType.call, playerIndex: 9, betSize: 5 },
              ],
              communityCards: {
                left: { rank: Rank.ace, suit: Suit.club },
                center: { rank: Rank.deuce, suit: Suit.club },
                right: { rank: Rank.eight, suit: Suit.club },
              },
            },
            turn: {
              actions: [
                { type: GameStreetActionType.bet, playerIndex: 0, betSize: 10 },
                {
                  type: GameStreetActionType.call,
                  playerIndex: 1,
                  betSize: 10,
                },
                {
                  type: GameStreetActionType.call,
                  playerIndex: 2,
                  betSize: 10,
                },
                {
                  type: GameStreetActionType.call,
                  playerIndex: 3,
                  betSize: 10,
                },
                {
                  type: GameStreetActionType.call,
                  playerIndex: 4,
                  betSize: 10,
                },
                {
                  type: GameStreetActionType.call,
                  playerIndex: 5,
                  betSize: 10,
                },
                {
                  type: GameStreetActionType.call,
                  playerIndex: 6,
                  betSize: 10,
                },
                {
                  type: GameStreetActionType.call,
                  playerIndex: 7,
                  betSize: 10,
                },
                {
                  type: GameStreetActionType.call,
                  playerIndex: 8,
                  betSize: 10,
                },
                {
                  type: GameStreetActionType.call,
                  playerIndex: 9,
                  betSize: 10,
                },
              ],
              communityCard: { rank: Rank.four, suit: Suit.club },
            },
            river: {
              actions: [
                { type: GameStreetActionType.bet, playerIndex: 0, betSize: 10 },
                {
                  type: GameStreetActionType.call,
                  playerIndex: 1,
                  betSize: 10,
                },
                {
                  type: GameStreetActionType.call,
                  playerIndex: 2,
                  betSize: 10,
                },
                {
                  type: GameStreetActionType.call,
                  playerIndex: 3,
                  betSize: 10,
                },
                {
                  type: GameStreetActionType.call,
                  playerIndex: 4,
                  betSize: 10,
                },
                {
                  type: GameStreetActionType.call,
                  playerIndex: 5,
                  betSize: 10,
                },
                {
                  type: GameStreetActionType.call,
                  playerIndex: 6,
                  betSize: 10,
                },
                {
                  type: GameStreetActionType.call,
                  playerIndex: 7,
                  betSize: 10,
                },
                {
                  type: GameStreetActionType.call,
                  playerIndex: 8,
                  betSize: 10,
                },
                {
                  type: GameStreetActionType.raise,
                  playerIndex: 9,
                  betSize: 20,
                },
                {
                  type: GameStreetActionType.call,
                  playerIndex: 0,
                  betSize: 20,
                },
                {
                  type: GameStreetActionType.call,
                  playerIndex: 1,
                  betSize: 20,
                },
                {
                  type: GameStreetActionType.call,
                  playerIndex: 2,
                  betSize: 20,
                },
                {
                  type: GameStreetActionType.call,
                  playerIndex: 3,
                  betSize: 20,
                },
                {
                  type: GameStreetActionType.call,
                  playerIndex: 4,
                  betSize: 20,
                },
                {
                  type: GameStreetActionType.call,
                  playerIndex: 5,
                  betSize: 20,
                },
                {
                  type: GameStreetActionType.call,
                  playerIndex: 6,
                  betSize: 20,
                },
                {
                  type: GameStreetActionType.call,
                  playerIndex: 7,
                  betSize: 20,
                },
                {
                  type: GameStreetActionType.raise,
                  playerIndex: 8,
                  betSize: 100,
                },
                {
                  type: GameStreetActionType.fold,
                  playerIndex: 9,
                  betSize: 20,
                },
                {
                  type: GameStreetActionType.fold,
                  playerIndex: 0,
                  betSize: 20,
                },
                {
                  type: GameStreetActionType.fold,
                  playerIndex: 1,
                  betSize: 20,
                },
                {
                  type: GameStreetActionType.fold,
                  playerIndex: 2,
                  betSize: 20,
                },
                {
                  type: GameStreetActionType.fold,
                  playerIndex: 3,
                  betSize: 20,
                },
                {
                  type: GameStreetActionType.fold,
                  playerIndex: 4,
                  betSize: 20,
                },
                {
                  type: GameStreetActionType.fold,
                  playerIndex: 5,
                  betSize: 20,
                },
                {
                  type: GameStreetActionType.fold,
                  playerIndex: 6,
                  betSize: 20,
                },
                {
                  type: GameStreetActionType.fold,
                  playerIndex: 7,
                  betSize: 20,
                },
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
                { type: GameStreetActionType.bet, playerIndex: 2, betSize: 1 },
                { type: GameStreetActionType.call, playerIndex: 3, betSize: 1 },
                { type: GameStreetActionType.call, playerIndex: 4, betSize: 1 },
                { type: GameStreetActionType.call, playerIndex: 0, betSize: 1 },
                { type: GameStreetActionType.call, playerIndex: 1, betSize: 1 },
              ],
            },
            flop: {
              actions: [
                {
                  type: GameStreetActionType.check,
                  playerIndex: 0,
                  betSize: 0,
                },
                {
                  type: GameStreetActionType.check,
                  playerIndex: 1,
                  betSize: 0,
                },
                {
                  type: GameStreetActionType.check,
                  playerIndex: 2,
                  betSize: 0,
                },
                {
                  type: GameStreetActionType.check,
                  playerIndex: 3,
                  betSize: 0,
                },
                {
                  type: GameStreetActionType.check,
                  playerIndex: 4,
                  betSize: 0,
                },
              ],
              communityCards: {
                left: { rank: Rank.ace, suit: Suit.club },
                center: { rank: Rank.deuce, suit: Suit.club },
                right: { rank: Rank.eight, suit: Suit.club },
              },
            },
            turn: {
              actions: [
                {
                  type: GameStreetActionType.check,
                  playerIndex: 0,
                  betSize: 0,
                },
                {
                  type: GameStreetActionType.check,
                  playerIndex: 1,
                  betSize: 0,
                },
                {
                  type: GameStreetActionType.check,
                  playerIndex: 2,
                  betSize: 0,
                },
                {
                  type: GameStreetActionType.check,
                  playerIndex: 3,
                  betSize: 0,
                },
                {
                  type: GameStreetActionType.check,
                  playerIndex: 4,
                  betSize: 0,
                },
              ],
              communityCard: { rank: Rank.four, suit: Suit.club },
            },
            river: {
              actions: [
                {
                  type: GameStreetActionType.check,
                  playerIndex: 0,
                  betSize: 0,
                },
                {
                  type: GameStreetActionType.check,
                  playerIndex: 1,
                  betSize: 0,
                },
                {
                  type: GameStreetActionType.check,
                  playerIndex: 2,
                  betSize: 0,
                },
                {
                  type: GameStreetActionType.check,
                  playerIndex: 3,
                  betSize: 0,
                },
                { type: GameStreetActionType.bet, playerIndex: 4, betSize: 2 },
                {
                  type: GameStreetActionType.raise,
                  playerIndex: 0,
                  betSize: 6,
                },
                { type: GameStreetActionType.fold, playerIndex: 1, betSize: 0 },
                {
                  type: GameStreetActionType.raise,
                  playerIndex: 2,
                  betSize: 12,
                },
                {
                  type: GameStreetActionType.call,
                  playerIndex: 3,
                  betSize: 12,
                },
                {
                  type: GameStreetActionType.raise,
                  playerIndex: 4,
                  betSize: 20,
                },
                { type: GameStreetActionType.fold, playerIndex: 0, betSize: 6 },
                {
                  type: GameStreetActionType.call,
                  playerIndex: 2,
                  betSize: 20,
                },
                {
                  type: GameStreetActionType.fold,
                  playerIndex: 3,
                  betSize: 12,
                },
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
                { type: GameStreetActionType.bet, playerIndex: 0, betSize: 1 },
                { type: GameStreetActionType.fold, playerIndex: 1, betSize: 0 },
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
                { type: GameStreetActionType.bet, playerIndex: 0, betSize: 1 },
                { type: GameStreetActionType.fold, playerIndex: 1, betSize: 0 },
                { type: GameStreetActionType.call, playerIndex: 2, betSize: 1 },
              ],
            },
            flop: {
              communityCards: {
                left: { rank: Rank.ace, suit: Suit.club },
                center: { rank: Rank.deuce, suit: Suit.club },
                right: { rank: Rank.eight, suit: Suit.club },
              },
              actions: [
                { type: GameStreetActionType.bet, playerIndex: 0, betSize: 1 },
                { type: GameStreetActionType.fold, playerIndex: 2, betSize: 0 },
              ],
            },
          })
        ).toBe(3.9);
      });
    });
  });
});
