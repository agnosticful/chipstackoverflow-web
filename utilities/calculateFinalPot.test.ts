import calculateFinalPot from "./calculateFinalPot";
import { GameType, GameStreetActionType } from "@@/models/GameSituation";
import Rank from "@@/models/Rank";
import Suit from "@@/models/Suit";

describe("calculateFinalPot(gameSituation)", () => {
  describe("return the final pot size", () => {
    describe("when the game ended at preflop", () => {
      test("and players have only one action in the street", () => {
        expect(
          calculateFinalPot({
            type: GameType.cash,
            players: [
              { stackSize: 100, holeCards: null },
              { stackSize: 200, holeCards: null },
            ],
            heroIndex: 0,
            smallBlindSize: 0.5,
            antiSize: 0,
            communityCards: [],
            preflopActions: [
              {
                type: GameStreetActionType.raise,
                playerIndex: 0,
                betSize: 3,
              },
              { type: GameStreetActionType.fold, playerIndex: 1, betSize: 1 },
            ],
            flopActions: [],
            turnActions: [],
            riverActions: [],
          })
        ).toBe(4);
      });

      test("and one player has one action and other have two in the street", () => {
        expect(
          calculateFinalPot({
            type: GameType.cash,
            players: [
              { stackSize: 100, holeCards: null },
              { stackSize: 200, holeCards: null },
              { stackSize: 300, holeCards: null },
            ],
            heroIndex: 0,
            smallBlindSize: 0.5,
            antiSize: 0,
            communityCards: [],
            preflopActions: [
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
            flopActions: [],
            turnActions: [],
            riverActions: [],
          })
        ).toBe(8);
      });

      test("and some players have second action and some other players have third action in the street", () => {
        expect(
          calculateFinalPot({
            type: GameType.cash,
            players: [
              { stackSize: 100, holeCards: null },
              { stackSize: 200, holeCards: null },
              { stackSize: 100, holeCards: null },
              { stackSize: 200, holeCards: null },
            ],
            heroIndex: 0,
            smallBlindSize: 0.5,
            antiSize: 0,
            communityCards: [],
            preflopActions: [
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
            flopActions: [],
            turnActions: [],
            riverActions: [],
          })
        ).toBe(20);
      });

      test("and players have different action number in the street", () => {
        expect(
          calculateFinalPot({
            type: GameType.cash,
            players: [
              { stackSize: 100, holeCards: null },
              { stackSize: 200, holeCards: null },
              { stackSize: 100, holeCards: null },
              { stackSize: 200, holeCards: null },
              { stackSize: 100, holeCards: null },
              { stackSize: 200, holeCards: null },
            ],
            heroIndex: 0,
            smallBlindSize: 0.5,
            antiSize: 0,
            communityCards: [],
            preflopActions: [
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
            flopActions: [],
            turnActions: [],
            riverActions: [],
          })
        ).toBe(77);
      });
    });

    describe("when the game ended at flop", () => {
      test("and players have only one action in the street", () => {
        expect(
          calculateFinalPot({
            type: GameType.cash,
            players: [
              { stackSize: 100, holeCards: null },
              { stackSize: 200, holeCards: null },
              { stackSize: 100, holeCards: null },
              { stackSize: 200, holeCards: null },
            ],
            heroIndex: 0,
            smallBlindSize: 0.5,
            antiSize: 0,
            communityCards: [
              { rank: Rank.ace, suit: Suit.club },
              { rank: Rank.deuce, suit: Suit.club },
              { rank: Rank.eight, suit: Suit.club },
            ],
            preflopActions: [
              { type: GameStreetActionType.bet, playerIndex: 2, betSize: 1 },
              { type: GameStreetActionType.call, playerIndex: 3, betSize: 1 },
              { type: GameStreetActionType.call, playerIndex: 0, betSize: 1 },
              { type: GameStreetActionType.call, playerIndex: 1, betSize: 1 },
            ],

            flopActions: [
              { type: GameStreetActionType.bet, playerIndex: 0, betSize: 2 },
              { type: GameStreetActionType.fold, playerIndex: 1, betSize: 0 },
              { type: GameStreetActionType.fold, playerIndex: 2, betSize: 0 },
              { type: GameStreetActionType.fold, playerIndex: 3, betSize: 0 },
            ],
            turnActions: [],
            riverActions: [],
          })
        ).toBe(6);
      });

      test("and one player has one action and other have two in the street", () => {
        expect(
          calculateFinalPot({
            type: GameType.cash,
            players: [
              { stackSize: 100, holeCards: null },
              { stackSize: 200, holeCards: null },
              { stackSize: 100, holeCards: null },
              { stackSize: 200, holeCards: null },
            ],
            heroIndex: 0,
            smallBlindSize: 0.5,
            antiSize: 0,
            communityCards: [
              { rank: Rank.ace, suit: Suit.club },
              { rank: Rank.deuce, suit: Suit.club },
              { rank: Rank.eight, suit: Suit.club },
            ],
            preflopActions: [
              { type: GameStreetActionType.bet, playerIndex: 2, betSize: 1 },
              { type: GameStreetActionType.call, playerIndex: 3, betSize: 1 },
              { type: GameStreetActionType.call, playerIndex: 0, betSize: 1 },
              { type: GameStreetActionType.call, playerIndex: 1, betSize: 1 },
            ],

            flopActions: [
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
            turnActions: [],
            riverActions: [],
          })
        ).toBe(14);
      });

      test("and some players have second action and some other players have third action in the street", () => {
        expect(
          calculateFinalPot({
            type: GameType.cash,
            players: [
              { stackSize: 100, holeCards: null },
              { stackSize: 200, holeCards: null },
              { stackSize: 100, holeCards: null },
              { stackSize: 200, holeCards: null },
            ],
            heroIndex: 0,
            smallBlindSize: 0.5,
            antiSize: 0,
            communityCards: [
              { rank: Rank.ace, suit: Suit.club },
              { rank: Rank.deuce, suit: Suit.club },
              { rank: Rank.eight, suit: Suit.club },
            ],
            preflopActions: [
              { type: GameStreetActionType.bet, playerIndex: 2, betSize: 1 },
              { type: GameStreetActionType.call, playerIndex: 3, betSize: 1 },
              { type: GameStreetActionType.call, playerIndex: 0, betSize: 1 },
              { type: GameStreetActionType.call, playerIndex: 1, betSize: 1 },
            ],
            flopActions: [
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
            turnActions: [],
            riverActions: [],
          })
        ).toBe(24);
      });

      test("and players have different action number in the street", () => {
        expect(
          calculateFinalPot({
            type: GameType.cash,
            players: [
              { stackSize: 100, holeCards: null },
              { stackSize: 200, holeCards: null },
              { stackSize: 100, holeCards: null },
              { stackSize: 200, holeCards: null },
              { stackSize: 100, holeCards: null },
            ],
            heroIndex: 0,
            smallBlindSize: 0.5,
            antiSize: 0,
            communityCards: [
              { rank: Rank.ace, suit: Suit.club },
              { rank: Rank.deuce, suit: Suit.club },
              { rank: Rank.eight, suit: Suit.club },
            ],
            preflopActions: [
              { type: GameStreetActionType.bet, playerIndex: 2, betSize: 1 },
              { type: GameStreetActionType.call, playerIndex: 3, betSize: 1 },
              { type: GameStreetActionType.call, playerIndex: 4, betSize: 1 },
              { type: GameStreetActionType.call, playerIndex: 0, betSize: 1 },
              { type: GameStreetActionType.call, playerIndex: 1, betSize: 1 },
            ],
            flopActions: [
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
            turnActions: [],
            riverActions: [],
          })
        ).toBe(47);
      });
    });

    describe("when the game ended at turn", () => {
      test("and players have only one action in the street", () => {
        expect(
          calculateFinalPot({
            type: GameType.cash,
            players: [
              { stackSize: 100, holeCards: null },
              { stackSize: 200, holeCards: null },
              { stackSize: 100, holeCards: null },
              { stackSize: 200, holeCards: null },
            ],
            heroIndex: 0,
            smallBlindSize: 0.5,
            antiSize: 0,
            communityCards: [
              { rank: Rank.ace, suit: Suit.club },
              { rank: Rank.deuce, suit: Suit.club },
              { rank: Rank.eight, suit: Suit.club },
              { rank: Rank.four, suit: Suit.club },
            ],
            preflopActions: [
              { type: GameStreetActionType.bet, playerIndex: 2, betSize: 1 },
              { type: GameStreetActionType.call, playerIndex: 3, betSize: 1 },
              { type: GameStreetActionType.call, playerIndex: 0, betSize: 1 },
              { type: GameStreetActionType.call, playerIndex: 1, betSize: 1 },
            ],
            flopActions: [
              { type: GameStreetActionType.check, playerIndex: 0, betSize: 0 },
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
            turnActions: [
              { type: GameStreetActionType.bet, playerIndex: 0, betSize: 1 },
              { type: GameStreetActionType.fold, playerIndex: 1, betSize: 0 },
              { type: GameStreetActionType.fold, playerIndex: 2, betSize: 0 },
              { type: GameStreetActionType.fold, playerIndex: 3, betSize: 0 },
            ],
            riverActions: [],
          })
        ).toBe(5);
      });

      test("and one player has one action and other have two in the street", () => {
        expect(
          calculateFinalPot({
            type: GameType.cash,
            players: [
              { stackSize: 100, holeCards: null },
              { stackSize: 200, holeCards: null },
              { stackSize: 100, holeCards: null },
              { stackSize: 200, holeCards: null },
            ],
            heroIndex: 0,
            smallBlindSize: 0.5,
            antiSize: 0,
            communityCards: [
              { rank: Rank.ace, suit: Suit.club },
              { rank: Rank.deuce, suit: Suit.club },
              { rank: Rank.eight, suit: Suit.club },
              { rank: Rank.four, suit: Suit.club },
            ],
            preflopActions: [
              { type: GameStreetActionType.bet, playerIndex: 2, betSize: 1 },
              { type: GameStreetActionType.call, playerIndex: 3, betSize: 1 },
              { type: GameStreetActionType.call, playerIndex: 0, betSize: 1 },
              { type: GameStreetActionType.call, playerIndex: 1, betSize: 1 },
            ],
            flopActions: [
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
            turnActions: [
              { type: GameStreetActionType.bet, playerIndex: 0, betSize: 1 },
              { type: GameStreetActionType.call, playerIndex: 1, betSize: 1 },
              { type: GameStreetActionType.call, playerIndex: 2, betSize: 1 },
              { type: GameStreetActionType.bet, playerIndex: 3, betSize: 3 },
              { type: GameStreetActionType.fold, playerIndex: 0, betSize: 1 },
              { type: GameStreetActionType.fold, playerIndex: 1, betSize: 1 },
              { type: GameStreetActionType.fold, playerIndex: 2, betSize: 1 },
            ],
            riverActions: [],
          })
        ).toBe(10);
      });

      test("and some players have second action and some other players have third action in the street", () => {
        expect(
          calculateFinalPot({
            type: GameType.cash,
            players: [
              { stackSize: 100, holeCards: null },
              { stackSize: 200, holeCards: null },
              { stackSize: 100, holeCards: null },
              { stackSize: 200, holeCards: null },
            ],
            heroIndex: 0,
            smallBlindSize: 0.5,
            antiSize: 0,
            communityCards: [
              { rank: Rank.ace, suit: Suit.club },
              { rank: Rank.deuce, suit: Suit.club },
              { rank: Rank.eight, suit: Suit.club },
              { rank: Rank.four, suit: Suit.club },
            ],
            preflopActions: [
              { type: GameStreetActionType.bet, playerIndex: 2, betSize: 1 },
              { type: GameStreetActionType.call, playerIndex: 3, betSize: 1 },
              { type: GameStreetActionType.call, playerIndex: 0, betSize: 1 },
              { type: GameStreetActionType.call, playerIndex: 1, betSize: 1 },
            ],
            flopActions: [
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
            turnActions: [
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
            riverActions: [],
          })
        ).toBe(19);
      });

      test("and players have different action number in the street", () => {
        expect(
          calculateFinalPot({
            type: GameType.cash,
            players: [
              { stackSize: 100, holeCards: null },
              { stackSize: 200, holeCards: null },
              { stackSize: 100, holeCards: null },
              { stackSize: 200, holeCards: null },
              { stackSize: 100, holeCards: null },
              { stackSize: 200, holeCards: null },
            ],
            heroIndex: 0,
            smallBlindSize: 0.5,
            antiSize: 0,
            communityCards: [
              { rank: Rank.ace, suit: Suit.club },
              { rank: Rank.deuce, suit: Suit.club },
              { rank: Rank.eight, suit: Suit.club },
              { rank: Rank.four, suit: Suit.club },
            ],
            preflopActions: [
              { type: GameStreetActionType.bet, playerIndex: 2, betSize: 1 },
              { type: GameStreetActionType.call, playerIndex: 3, betSize: 1 },
              { type: GameStreetActionType.call, playerIndex: 4, betSize: 1 },
              { type: GameStreetActionType.call, playerIndex: 5, betSize: 1 },
              { type: GameStreetActionType.call, playerIndex: 0, betSize: 1 },
              { type: GameStreetActionType.call, playerIndex: 1, betSize: 1 },
            ],
            flopActions: [
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
            turnActions: [
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
            riverActions: [],
          })
        ).toBe(88);
      });
    });

    describe("when the game ended at river", () => {
      test("and players have only one action in the street", () => {
        expect(
          calculateFinalPot({
            type: GameType.cash,
            players: [
              { stackSize: 100, holeCards: null },
              { stackSize: 200, holeCards: null },
              { stackSize: 100, holeCards: null },
            ],
            heroIndex: 0,
            smallBlindSize: 0.5,
            antiSize: 0,
            communityCards: [
              { rank: Rank.ace, suit: Suit.club },
              { rank: Rank.deuce, suit: Suit.club },
              { rank: Rank.eight, suit: Suit.club },
              { rank: Rank.four, suit: Suit.club },
              { rank: Rank.five, suit: Suit.club },
            ],
            preflopActions: [
              { type: GameStreetActionType.bet, playerIndex: 2, betSize: 1 },
              { type: GameStreetActionType.call, playerIndex: 0, betSize: 1 },
              { type: GameStreetActionType.call, playerIndex: 1, betSize: 1 },
            ],
            flopActions: [
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
            turnActions: [
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
            riverActions: [
              { type: GameStreetActionType.bet, playerIndex: 0, betSize: 20 },
              { type: GameStreetActionType.fold, playerIndex: 1, betSize: 0 },
              { type: GameStreetActionType.fold, playerIndex: 2, betSize: 0 },
            ],
          })
        ).toBe(23);
      });

      test("and one player has one action and other have two in the street", () => {
        expect(
          calculateFinalPot({
            type: GameType.cash,
            players: [
              { stackSize: 100, holeCards: null },
              { stackSize: 200, holeCards: null },
              { stackSize: 100, holeCards: null },
            ],
            heroIndex: 0,
            smallBlindSize: 0.5,
            antiSize: 0,
            communityCards: [
              { rank: Rank.ace, suit: Suit.club },
              { rank: Rank.deuce, suit: Suit.club },
              { rank: Rank.eight, suit: Suit.club },
              { rank: Rank.four, suit: Suit.club },
              { rank: Rank.five, suit: Suit.club },
            ],
            preflopActions: [
              { type: GameStreetActionType.bet, playerIndex: 2, betSize: 1 },
              { type: GameStreetActionType.call, playerIndex: 0, betSize: 1 },
              { type: GameStreetActionType.call, playerIndex: 1, betSize: 1 },
            ],
            flopActions: [
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
            turnActions: [
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
            riverActions: [
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
          })
        ).toBe(28);
      });

      test("and some players have second action and some other players have third action in the street", () => {
        expect(
          calculateFinalPot({
            type: GameType.cash,
            players: [
              { stackSize: 100, holeCards: null },
              { stackSize: 200, holeCards: null },
              { stackSize: 100, holeCards: null },
              { stackSize: 200, holeCards: null },
              { stackSize: 100, holeCards: null },
              { stackSize: 200, holeCards: null },
              { stackSize: 100, holeCards: null },
              { stackSize: 200, holeCards: null },
              { stackSize: 100, holeCards: null },
              { stackSize: 200, holeCards: null },
            ],
            heroIndex: 0,
            smallBlindSize: 0.5,
            antiSize: 0,
            communityCards: [
              { rank: Rank.ace, suit: Suit.club },
              { rank: Rank.deuce, suit: Suit.club },
              { rank: Rank.eight, suit: Suit.club },
              { rank: Rank.four, suit: Suit.club },
              { rank: Rank.five, suit: Suit.club },
            ],
            preflopActions: [
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
            flopActions: [
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
            turnActions: [
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
            riverActions: [
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
          })
        ).toBe(440);
      });

      test("and players have different action number in the street", () => {
        expect(
          calculateFinalPot({
            type: GameType.cash,
            players: [
              { stackSize: 100, holeCards: null },
              { stackSize: 200, holeCards: null },
              { stackSize: 100, holeCards: null },
              { stackSize: 200, holeCards: null },
              { stackSize: 100, holeCards: null },
            ],
            heroIndex: 0,
            smallBlindSize: 0.5,
            antiSize: 0,
            communityCards: [
              { rank: Rank.ace, suit: Suit.club },
              { rank: Rank.deuce, suit: Suit.club },
              { rank: Rank.eight, suit: Suit.club },
              { rank: Rank.four, suit: Suit.club },
              { rank: Rank.five, suit: Suit.club },
            ],
            preflopActions: [
              { type: GameStreetActionType.bet, playerIndex: 2, betSize: 1 },
              { type: GameStreetActionType.call, playerIndex: 3, betSize: 1 },
              { type: GameStreetActionType.call, playerIndex: 4, betSize: 1 },
              { type: GameStreetActionType.call, playerIndex: 0, betSize: 1 },
              { type: GameStreetActionType.call, playerIndex: 1, betSize: 1 },
            ],
            flopActions: [
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
            turnActions: [
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
            riverActions: [
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
          })
        ).toBe(63);
      });
    });

    describe("when the antiSize is set", () => {
      it("returns finalPot including antiSize * playerLength", () => {
        expect(
          calculateFinalPot({
            type: GameType.cash,
            players: [
              { stackSize: 100, holeCards: null },
              { stackSize: 120, holeCards: null },
            ],
            heroIndex: 0,
            smallBlindSize: 0.5,
            antiSize: 0.2,
            communityCards: [],
            preflopActions: [
              { type: GameStreetActionType.bet, playerIndex: 0, betSize: 1 },
              { type: GameStreetActionType.fold, playerIndex: 1, betSize: 0 },
            ],
            flopActions: [],
            turnActions: [],
            riverActions: [],
          })
        ).toBe(1.4);
        expect(
          calculateFinalPot({
            type: GameType.cash,
            players: [
              { stackSize: 100, holeCards: null },
              { stackSize: 120, holeCards: null },
              { stackSize: 100, holeCards: null },
            ],
            heroIndex: 0,
            smallBlindSize: 0.5,
            antiSize: 0.3,
            communityCards: [
              { rank: Rank.ace, suit: Suit.club },
              { rank: Rank.deuce, suit: Suit.club },
              { rank: Rank.eight, suit: Suit.club },
            ],
            preflopActions: [
              { type: GameStreetActionType.bet, playerIndex: 0, betSize: 1 },
              { type: GameStreetActionType.fold, playerIndex: 1, betSize: 0 },
              { type: GameStreetActionType.call, playerIndex: 2, betSize: 1 },
            ],
            flopActions: [
              { type: GameStreetActionType.bet, playerIndex: 0, betSize: 1 },
              { type: GameStreetActionType.fold, playerIndex: 2, betSize: 0 },
            ],
            turnActions: [],
            riverActions: [],
          })
        ).toBe(3.9);
      });
    });
  });
});
