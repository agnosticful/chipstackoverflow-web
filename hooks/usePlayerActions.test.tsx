import { GameStreetActionType } from "../models/GameSituation";
import { PlayerActions, Street } from "./usePlayerActions";

describe("class PlayerActions", () => {
  describe("when new PlayerActions", () => {
    it("throws smallBlindSize error", () => {
      expect(() => {
        new PlayerActions({
          smallBlindSize: -1,
          playerLength: 2,
          playerStackSizes: [0, 0],
        });
      }).toThrowError(
        new Error(
          "smallBlindSize must be bigger than or equal to 0 and smaller than or equal to 1"
        )
      );

      expect(() => {
        new PlayerActions({
          smallBlindSize: 1.1,
          playerLength: 2,
          playerStackSizes: [0, 0],
        });
      }).toThrowError(
        new Error(
          "smallBlindSize must be bigger than or equal to 0 and smaller than or equal to 1"
        )
      );
    });

    it("throws playerLength error", () => {
      expect(() => {
        new PlayerActions({
          smallBlindSize: 0,
          playerLength: 1,
          playerStackSizes: [0],
        });
      }).toThrowError(
        new Error(
          "playerLength must be bigger than or equal to 2 and smaller than or equal to 10"
        )
      );

      expect(() => {
        new PlayerActions({
          smallBlindSize: 0,
          playerLength: 11,
          playerStackSizes: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        });
      }).toThrowError(
        new Error(
          "playerLength must be bigger than or equal to 2 and smaller than or equal to 10"
        )
      );
    });

    describe("when PlayerActions makes instance", () => {
      it("returns instance of PlayerActions that have action length properly", () => {
        const playerActions = new PlayerActions({
          smallBlindSize: 0,
          playerLength: 2,
          playerStackSizes: [0, 0],
        });

        expect(playerActions.preflop.length).toBe(2);
        expect(playerActions.flop.length).toBe(0);
        expect(playerActions.turn.length).toBe(0);
        expect(playerActions.river.length).toBe(0);
      });
    });
  });

  describe("getNextPlayerActionsBy()", () => {
    const playerActions = new PlayerActions({
      smallBlindSize: 0,
      playerLength: 3,
      playerStackSizes: [0, 0, 0],
    });

    const originalUpdateAction = playerActions["updateAction"];

    beforeEach(() => {
      playerActions["updateAction"] = jest.fn(() => {}) as any;
    });

    afterEach(() => {
      playerActions["updateAction"] = originalUpdateAction;
    });

    it("returns same type but different instance of its self", () => {
      playerActions["_preflop"] = [
        { type: GameStreetActionType.bet, betSize: 1, playerIndex: 0 },
        { type: GameStreetActionType.call, betSize: 1, playerIndex: 1 },
        { type: GameStreetActionType.call, betSize: 1, playerIndex: 2 },
      ];

      const newPlayerActions = playerActions.getNextPlayerActionsBy(
        Street.preflop,
        2,
        {
          type: GameStreetActionType.raise,
          betSize: 2,
          playerIndex: 2,
        }
      );

      expect(newPlayerActions).toBeInstanceOf(PlayerActions);
      expect(newPlayerActions.preflop).toEqual([
        { type: GameStreetActionType.bet, betSize: 1, playerIndex: 0 },
        { type: GameStreetActionType.call, betSize: 1, playerIndex: 1 },
        { type: GameStreetActionType.call, betSize: 1, playerIndex: 2 },
      ]);
    });
  });

  describe("addAction(street: Street, index: number, gameStreetAction: GameStreetAction)", () => {
    describe("when adds action to its preflop actions", () => {
      it("throws error when index is -1", () => {
        const playerActions = new PlayerActions({
          smallBlindSize: 0,
          playerLength: 2,
          playerStackSizes: [0, 0],
        });

        expect(() => {
          playerActions["addAction"](Street.preflop, -1, {
            type: GameStreetActionType.fold,
            betSize: 0,
            playerIndex: 0,
          });
        }).toThrowError(
          new Error(
            "index must be more than or equal to 0 and less than the street length"
          )
        );
      });

      it("throws error when index is more than playerLength", () => {
        const playerActions = new PlayerActions({
          smallBlindSize: 0,
          playerLength: 2,
          playerStackSizes: [0, 0],
        });

        expect(() => {
          playerActions["addAction"](Street.preflop, 3, {
            type: GameStreetActionType.fold,
            betSize: 0,
            playerIndex: 0,
          });
        }).toThrowError(
          new Error(
            "index must be more than or equal to 0 and less than the street length"
          )
        );
      });

      it("adds action middle of actions", () => {
        const playerActions = new PlayerActions({
          smallBlindSize: 0,
          playerLength: 3,
          playerStackSizes: [0, 0, 0],
        });

        playerActions["_preflop"] = [
          { type: GameStreetActionType.bet, betSize: 1, playerIndex: 0 },
          { type: GameStreetActionType.call, betSize: 1, playerIndex: 1 },
          { type: GameStreetActionType.raise, betSize: 2, playerIndex: 2 },
          { type: GameStreetActionType.raise, betSize: 4, playerIndex: 0 },
          { type: GameStreetActionType.call, betSize: 4, playerIndex: 2 },
        ];

        playerActions["addAction"](Street.preflop, 4, {
          type: GameStreetActionType.fold,
          betSize: 0,
          playerIndex: 1,
        });

        expect(playerActions.preflop).toEqual([
          { type: GameStreetActionType.bet, betSize: 1, playerIndex: 0 },
          { type: GameStreetActionType.call, betSize: 1, playerIndex: 1 },
          { type: GameStreetActionType.raise, betSize: 2, playerIndex: 2 },
          { type: GameStreetActionType.raise, betSize: 4, playerIndex: 0 },
          { type: GameStreetActionType.fold, betSize: 0, playerIndex: 1 },
          { type: GameStreetActionType.call, betSize: 4, playerIndex: 2 },
        ]);
      });

      it("adds action end of actions", () => {
        const playerActions = new PlayerActions({
          smallBlindSize: 0,
          playerLength: 3,
          playerStackSizes: [0, 0, 0],
        });

        playerActions["_preflop"] = [
          { type: GameStreetActionType.bet, betSize: 1, playerIndex: 0 },
          { type: GameStreetActionType.fold, betSize: 1, playerIndex: 1 },
          { type: GameStreetActionType.raise, betSize: 2, playerIndex: 2 },
        ];

        playerActions["addAction"](Street.preflop, 3, {
          type: GameStreetActionType.fold,
          betSize: 0,
          playerIndex: 0,
        });

        expect(playerActions.preflop).toEqual([
          { type: GameStreetActionType.bet, betSize: 1, playerIndex: 0 },
          { type: GameStreetActionType.fold, betSize: 1, playerIndex: 1 },
          { type: GameStreetActionType.raise, betSize: 2, playerIndex: 2 },
          { type: GameStreetActionType.fold, betSize: 0, playerIndex: 0 },
        ]);
      });
    });

    describe("when adds action to its flop actions", () => {
      it("throws error when index is -1", () => {
        const playerActions = new PlayerActions({
          smallBlindSize: 0,
          playerLength: 3,
          playerStackSizes: [0, 0, 0],
        });

        playerActions["_preflop"] = [
          { type: GameStreetActionType.bet, betSize: 1, playerIndex: 0 },
          { type: GameStreetActionType.call, betSize: 1, playerIndex: 1 },
          { type: GameStreetActionType.call, betSize: 1, playerIndex: 2 },
        ];

        playerActions["_flop"] = [
          { type: GameStreetActionType.bet, betSize: 1, playerIndex: 0 },
          { type: GameStreetActionType.call, betSize: 1, playerIndex: 1 },
          { type: GameStreetActionType.call, betSize: 1, playerIndex: 2 },
        ];

        expect(() => {
          playerActions["addAction"](Street.flop, -1, {
            type: GameStreetActionType.fold,
            betSize: 0,
            playerIndex: 0,
          });
        }).toThrowError(
          new Error(
            "index must be more than or equal to 0 and less than the street length"
          )
        );
      });

      it("throws error when index is more than playerLength", () => {
        const playerActions = new PlayerActions({
          smallBlindSize: 0,
          playerLength: 3,
          playerStackSizes: [0, 0, 0],
        });

        playerActions["_preflop"] = [
          { type: GameStreetActionType.bet, betSize: 1, playerIndex: 0 },
          { type: GameStreetActionType.call, betSize: 1, playerIndex: 1 },
          { type: GameStreetActionType.call, betSize: 1, playerIndex: 2 },
        ];

        playerActions["_flop"] = [
          { type: GameStreetActionType.bet, betSize: 1, playerIndex: 0 },
          { type: GameStreetActionType.call, betSize: 1, playerIndex: 1 },
          { type: GameStreetActionType.call, betSize: 1, playerIndex: 2 },
        ];

        expect(() => {
          playerActions["addAction"](Street.flop, 4, {
            type: GameStreetActionType.fold,
            betSize: 0,
            playerIndex: 0,
          });
        }).toThrowError(
          new Error(
            "index must be more than or equal to 0 and less than the street length"
          )
        );
      });

      it("adds action middle of actions", () => {
        const playerActions = new PlayerActions({
          smallBlindSize: 0,
          playerLength: 3,
          playerStackSizes: [0, 0, 0],
        });

        playerActions["_preflop"] = [
          { type: GameStreetActionType.bet, betSize: 1, playerIndex: 0 },
          { type: GameStreetActionType.call, betSize: 1, playerIndex: 1 },
          { type: GameStreetActionType.call, betSize: 1, playerIndex: 2 },
        ];

        playerActions["_flop"] = [
          { type: GameStreetActionType.bet, betSize: 1, playerIndex: 0 },
          { type: GameStreetActionType.call, betSize: 1, playerIndex: 2 },
        ];

        playerActions["addAction"](Street.flop, 1, {
          type: GameStreetActionType.fold,
          betSize: 0,
          playerIndex: 1,
        });

        expect(playerActions.preflop).toEqual([
          { type: GameStreetActionType.bet, betSize: 1, playerIndex: 0 },
          { type: GameStreetActionType.call, betSize: 1, playerIndex: 1 },
          { type: GameStreetActionType.call, betSize: 1, playerIndex: 2 },
        ]);

        expect(playerActions.flop).toEqual([
          { type: GameStreetActionType.bet, betSize: 1, playerIndex: 0 },
          { type: GameStreetActionType.fold, betSize: 0, playerIndex: 1 },
          { type: GameStreetActionType.call, betSize: 1, playerIndex: 2 },
        ]);
      });

      it("adds action end of actions", () => {
        const playerActions = new PlayerActions({
          smallBlindSize: 0,
          playerLength: 3,
          playerStackSizes: [0, 0, 0],
        });

        playerActions["_preflop"] = [
          { type: GameStreetActionType.bet, betSize: 1, playerIndex: 0 },
          { type: GameStreetActionType.call, betSize: 1, playerIndex: 1 },
          { type: GameStreetActionType.call, betSize: 1, playerIndex: 2 },
        ];

        playerActions["_flop"] = [
          { type: GameStreetActionType.bet, betSize: 1, playerIndex: 0 },
          { type: GameStreetActionType.call, betSize: 1, playerIndex: 1 },
          { type: GameStreetActionType.raise, betSize: 3, playerIndex: 2 },
        ];

        playerActions["addAction"](Street.flop, 3, {
          type: GameStreetActionType.fold,
          betSize: 0,
          playerIndex: 0,
        });

        expect(playerActions.preflop).toEqual([
          { type: GameStreetActionType.bet, betSize: 1, playerIndex: 0 },
          { type: GameStreetActionType.call, betSize: 1, playerIndex: 1 },
          { type: GameStreetActionType.call, betSize: 1, playerIndex: 2 },
        ]);

        expect(playerActions.flop).toEqual([
          { type: GameStreetActionType.bet, betSize: 1, playerIndex: 0 },
          { type: GameStreetActionType.call, betSize: 1, playerIndex: 1 },
          { type: GameStreetActionType.raise, betSize: 3, playerIndex: 2 },
          { type: GameStreetActionType.fold, betSize: 0, playerIndex: 0 },
        ]);
      });
    });

    describe("when adds action to its turn actions", () => {
      it("throws error when index is -1", () => {
        const playerActions = new PlayerActions({
          smallBlindSize: 0,
          playerLength: 3,
          playerStackSizes: [0, 0, 0],
        });

        playerActions["_preflop"] = [
          { type: GameStreetActionType.bet, betSize: 1, playerIndex: 0 },
          { type: GameStreetActionType.call, betSize: 1, playerIndex: 1 },
          { type: GameStreetActionType.call, betSize: 1, playerIndex: 2 },
        ];

        playerActions["_flop"] = [
          { type: GameStreetActionType.bet, betSize: 1, playerIndex: 0 },
          { type: GameStreetActionType.call, betSize: 1, playerIndex: 1 },
          { type: GameStreetActionType.call, betSize: 1, playerIndex: 2 },
        ];

        playerActions["_turn"] = [
          { type: GameStreetActionType.bet, betSize: 1, playerIndex: 0 },
          { type: GameStreetActionType.fold, betSize: 0, playerIndex: 1 },
          { type: GameStreetActionType.fold, betSize: 0, playerIndex: 2 },
        ];

        expect(() => {
          playerActions["addAction"](Street.turn, -1, {
            type: GameStreetActionType.fold,
            betSize: 0,
            playerIndex: 0,
          });
        }).toThrowError(
          new Error(
            "index must be more than or equal to 0 and less than the street length"
          )
        );
      });

      it("throws error when index is more than playerLength", () => {
        const playerActions = new PlayerActions({
          smallBlindSize: 0,
          playerLength: 3,
          playerStackSizes: [0, 0, 0],
        });

        playerActions["_preflop"] = [
          { type: GameStreetActionType.bet, betSize: 1, playerIndex: 0 },
          { type: GameStreetActionType.call, betSize: 1, playerIndex: 1 },
          { type: GameStreetActionType.call, betSize: 1, playerIndex: 2 },
        ];

        playerActions["_flop"] = [
          { type: GameStreetActionType.bet, betSize: 1, playerIndex: 0 },
          { type: GameStreetActionType.call, betSize: 1, playerIndex: 1 },
          { type: GameStreetActionType.call, betSize: 1, playerIndex: 2 },
        ];

        playerActions["_turn"] = [
          { type: GameStreetActionType.bet, betSize: 1, playerIndex: 0 },
          { type: GameStreetActionType.fold, betSize: 0, playerIndex: 1 },
          { type: GameStreetActionType.fold, betSize: 0, playerIndex: 2 },
        ];

        expect(() => {
          playerActions["addAction"](Street.turn, 4, {
            type: GameStreetActionType.fold,
            betSize: 0,
            playerIndex: 0,
          });
        }).toThrowError(
          new Error(
            "index must be more than or equal to 0 and less than the street length"
          )
        );
      });

      it("adds action middle of actions", () => {
        const playerActions = new PlayerActions({
          smallBlindSize: 0,
          playerLength: 3,
          playerStackSizes: [0, 0, 0],
        });

        playerActions["_preflop"] = [
          { type: GameStreetActionType.bet, betSize: 1, playerIndex: 0 },
          { type: GameStreetActionType.call, betSize: 1, playerIndex: 1 },
          { type: GameStreetActionType.call, betSize: 1, playerIndex: 2 },
        ];

        playerActions["_flop"] = [
          { type: GameStreetActionType.check, betSize: 0, playerIndex: 0 },
          { type: GameStreetActionType.check, betSize: 0, playerIndex: 1 },
          { type: GameStreetActionType.check, betSize: 0, playerIndex: 2 },
        ];

        playerActions["_turn"] = [
          { type: GameStreetActionType.bet, betSize: 1, playerIndex: 0 },
          { type: GameStreetActionType.fold, betSize: 0, playerIndex: 2 },
        ];

        playerActions["addAction"](Street.turn, 1, {
          type: GameStreetActionType.fold,
          betSize: 0,
          playerIndex: 1,
        });

        expect(playerActions.preflop).toEqual([
          { type: GameStreetActionType.bet, betSize: 1, playerIndex: 0 },
          { type: GameStreetActionType.call, betSize: 1, playerIndex: 1 },
          { type: GameStreetActionType.call, betSize: 1, playerIndex: 2 },
        ]);

        expect(playerActions.flop).toEqual([
          { type: GameStreetActionType.check, betSize: 0, playerIndex: 0 },
          { type: GameStreetActionType.check, betSize: 0, playerIndex: 1 },
          { type: GameStreetActionType.check, betSize: 0, playerIndex: 2 },
        ]);

        expect(playerActions.turn).toEqual([
          { type: GameStreetActionType.bet, betSize: 1, playerIndex: 0 },
          { type: GameStreetActionType.fold, betSize: 0, playerIndex: 1 },
          { type: GameStreetActionType.fold, betSize: 0, playerIndex: 2 },
        ]);
      });

      it("adds action end of actions", () => {
        const playerActions = new PlayerActions({
          smallBlindSize: 0,
          playerLength: 3,
          playerStackSizes: [0, 0, 0],
        });

        playerActions["_preflop"] = [
          { type: GameStreetActionType.bet, betSize: 1, playerIndex: 0 },
          { type: GameStreetActionType.call, betSize: 1, playerIndex: 1 },
          { type: GameStreetActionType.call, betSize: 1, playerIndex: 2 },
        ];

        playerActions["_flop"] = [
          { type: GameStreetActionType.bet, betSize: 1, playerIndex: 0 },
          { type: GameStreetActionType.call, betSize: 1, playerIndex: 1 },
          { type: GameStreetActionType.call, betSize: 1, playerIndex: 2 },
        ];

        playerActions["_turn"] = [
          { type: GameStreetActionType.bet, betSize: 1, playerIndex: 0 },
          { type: GameStreetActionType.raise, betSize: 3, playerIndex: 1 },
          { type: GameStreetActionType.fold, betSize: 0, playerIndex: 2 },
        ];

        playerActions["addAction"](Street.turn, 3, {
          type: GameStreetActionType.fold,
          betSize: 0,
          playerIndex: 0,
        });

        expect(playerActions.preflop).toEqual([
          { type: GameStreetActionType.bet, betSize: 1, playerIndex: 0 },
          { type: GameStreetActionType.call, betSize: 1, playerIndex: 1 },
          { type: GameStreetActionType.call, betSize: 1, playerIndex: 2 },
        ]);

        expect(playerActions.flop).toEqual([
          { type: GameStreetActionType.bet, betSize: 1, playerIndex: 0 },
          { type: GameStreetActionType.call, betSize: 1, playerIndex: 1 },
          { type: GameStreetActionType.call, betSize: 1, playerIndex: 2 },
        ]);

        expect(playerActions.turn).toEqual([
          { type: GameStreetActionType.bet, betSize: 1, playerIndex: 0 },
          { type: GameStreetActionType.raise, betSize: 3, playerIndex: 1 },
          { type: GameStreetActionType.fold, betSize: 0, playerIndex: 2 },
          { type: GameStreetActionType.fold, betSize: 0, playerIndex: 0 },
        ]);
      });
    });

    describe("when adds action to its river actions", () => {
      it("throws error when index is -1", () => {
        const playerActions = new PlayerActions({
          smallBlindSize: 0,
          playerLength: 3,
          playerStackSizes: [0, 0, 0],
        });

        playerActions["_preflop"] = [
          { type: GameStreetActionType.bet, betSize: 1, playerIndex: 0 },
          { type: GameStreetActionType.call, betSize: 1, playerIndex: 1 },
          { type: GameStreetActionType.call, betSize: 1, playerIndex: 2 },
        ];

        playerActions["_flop"] = [
          { type: GameStreetActionType.bet, betSize: 1, playerIndex: 0 },
          { type: GameStreetActionType.call, betSize: 1, playerIndex: 1 },
          { type: GameStreetActionType.call, betSize: 1, playerIndex: 2 },
        ];

        playerActions["_turn"] = [
          { type: GameStreetActionType.check, betSize: 0, playerIndex: 0 },
          { type: GameStreetActionType.check, betSize: 0, playerIndex: 1 },
          { type: GameStreetActionType.check, betSize: 0, playerIndex: 2 },
        ];

        playerActions["_turn"] = [
          { type: GameStreetActionType.check, betSize: 0, playerIndex: 0 },
          { type: GameStreetActionType.check, betSize: 0, playerIndex: 1 },
          { type: GameStreetActionType.check, betSize: 0, playerIndex: 2 },
        ];

        playerActions["_river"] = [
          { type: GameStreetActionType.bet, betSize: 1, playerIndex: 0 },
          { type: GameStreetActionType.fold, betSize: 0, playerIndex: 1 },
          { type: GameStreetActionType.fold, betSize: 0, playerIndex: 2 },
        ];

        expect(() => {
          playerActions["addAction"](Street.river, -1, {
            type: GameStreetActionType.fold,
            betSize: 0,
            playerIndex: 0,
          });
        }).toThrowError(
          new Error(
            "index must be more than or equal to 0 and less than the street length"
          )
        );
      });

      it("throws error when index is more than playerLength", () => {
        const playerActions = new PlayerActions({
          smallBlindSize: 0,
          playerLength: 3,
          playerStackSizes: [0, 0, 0],
        });

        playerActions["_preflop"] = [
          { type: GameStreetActionType.bet, betSize: 1, playerIndex: 0 },
          { type: GameStreetActionType.call, betSize: 1, playerIndex: 1 },
          { type: GameStreetActionType.call, betSize: 1, playerIndex: 2 },
        ];

        playerActions["_flop"] = [
          { type: GameStreetActionType.bet, betSize: 1, playerIndex: 0 },
          { type: GameStreetActionType.call, betSize: 1, playerIndex: 1 },
          { type: GameStreetActionType.call, betSize: 1, playerIndex: 2 },
        ];

        playerActions["_turn"] = [
          { type: GameStreetActionType.bet, betSize: 1, playerIndex: 0 },
          { type: GameStreetActionType.call, betSize: 1, playerIndex: 1 },
          { type: GameStreetActionType.call, betSize: 1, playerIndex: 2 },
        ];

        playerActions["_river"] = [
          { type: GameStreetActionType.bet, betSize: 1, playerIndex: 0 },
          { type: GameStreetActionType.call, betSize: 1, playerIndex: 1 },
          { type: GameStreetActionType.call, betSize: 1, playerIndex: 2 },
        ];

        expect(() => {
          playerActions["addAction"](Street.turn, 4, {
            type: GameStreetActionType.fold,
            betSize: 0,
            playerIndex: 0,
          });
        }).toThrowError(
          new Error(
            "index must be more than or equal to 0 and less than the street length"
          )
        );
      });

      it("adds action middle of actions", () => {
        const playerActions = new PlayerActions({
          smallBlindSize: 0,
          playerLength: 3,
          playerStackSizes: [0, 0, 0],
        });

        playerActions["_preflop"] = [
          { type: GameStreetActionType.bet, betSize: 1, playerIndex: 0 },
          { type: GameStreetActionType.call, betSize: 1, playerIndex: 1 },
          { type: GameStreetActionType.call, betSize: 1, playerIndex: 2 },
        ];

        playerActions["_flop"] = [
          { type: GameStreetActionType.bet, betSize: 1, playerIndex: 0 },
          { type: GameStreetActionType.call, betSize: 1, playerIndex: 1 },
          { type: GameStreetActionType.call, betSize: 1, playerIndex: 2 },
        ];

        playerActions["_turn"] = [
          { type: GameStreetActionType.bet, betSize: 1, playerIndex: 0 },
          { type: GameStreetActionType.call, betSize: 1, playerIndex: 1 },
          { type: GameStreetActionType.call, betSize: 1, playerIndex: 2 },
        ];

        playerActions["_river"] = [
          { type: GameStreetActionType.bet, betSize: 1, playerIndex: 0 },
          { type: GameStreetActionType.call, betSize: 1, playerIndex: 1 },
          { type: GameStreetActionType.raise, betSize: 2, playerIndex: 2 },
          { type: GameStreetActionType.raise, betSize: 4, playerIndex: 0 },
          { type: GameStreetActionType.call, betSize: 4, playerIndex: 2 },
        ];

        playerActions["addAction"](Street.river, 4, {
          type: GameStreetActionType.fold,
          betSize: 0,
          playerIndex: 1,
        });

        expect(playerActions.preflop).toEqual([
          { type: GameStreetActionType.bet, betSize: 1, playerIndex: 0 },
          { type: GameStreetActionType.call, betSize: 1, playerIndex: 1 },
          { type: GameStreetActionType.call, betSize: 1, playerIndex: 2 },
        ]);

        expect(playerActions.flop).toEqual([
          { type: GameStreetActionType.bet, betSize: 1, playerIndex: 0 },
          { type: GameStreetActionType.call, betSize: 1, playerIndex: 1 },
          { type: GameStreetActionType.call, betSize: 1, playerIndex: 2 },
        ]);

        expect(playerActions.turn).toEqual([
          { type: GameStreetActionType.bet, betSize: 1, playerIndex: 0 },
          { type: GameStreetActionType.call, betSize: 1, playerIndex: 1 },
          { type: GameStreetActionType.call, betSize: 1, playerIndex: 2 },
        ]);

        expect(playerActions.river).toEqual([
          { type: GameStreetActionType.bet, betSize: 1, playerIndex: 0 },
          { type: GameStreetActionType.call, betSize: 1, playerIndex: 1 },
          { type: GameStreetActionType.raise, betSize: 2, playerIndex: 2 },
          { type: GameStreetActionType.raise, betSize: 4, playerIndex: 0 },
          { type: GameStreetActionType.fold, betSize: 0, playerIndex: 1 },
          { type: GameStreetActionType.call, betSize: 4, playerIndex: 2 },
        ]);
      });

      it("adds action end of actions", () => {
        const playerActions = new PlayerActions({
          smallBlindSize: 0,
          playerLength: 3,
          playerStackSizes: [0, 0, 0],
        });

        playerActions["_preflop"] = [
          { type: GameStreetActionType.bet, betSize: 1, playerIndex: 0 },
          { type: GameStreetActionType.call, betSize: 1, playerIndex: 1 },
          { type: GameStreetActionType.call, betSize: 1, playerIndex: 2 },
        ];

        playerActions["_flop"] = [
          { type: GameStreetActionType.bet, betSize: 1, playerIndex: 0 },
          { type: GameStreetActionType.call, betSize: 1, playerIndex: 1 },
          { type: GameStreetActionType.call, betSize: 1, playerIndex: 2 },
        ];

        playerActions["_turn"] = [
          { type: GameStreetActionType.bet, betSize: 1, playerIndex: 0 },
          { type: GameStreetActionType.call, betSize: 1, playerIndex: 1 },
          { type: GameStreetActionType.call, betSize: 1, playerIndex: 2 },
        ];

        playerActions["_river"] = [
          { type: GameStreetActionType.check, betSize: 0, playerIndex: 0 },
          { type: GameStreetActionType.check, betSize: 0, playerIndex: 1 },
          { type: GameStreetActionType.bet, betSize: 1, playerIndex: 2 },
        ];

        playerActions["addAction"](Street.river, 3, {
          type: GameStreetActionType.fold,
          betSize: 0,
          playerIndex: 0,
        });

        expect(playerActions.preflop).toEqual([
          { type: GameStreetActionType.bet, betSize: 1, playerIndex: 0 },
          { type: GameStreetActionType.call, betSize: 1, playerIndex: 1 },
          { type: GameStreetActionType.call, betSize: 1, playerIndex: 2 },
        ]);

        expect(playerActions.flop).toEqual([
          { type: GameStreetActionType.bet, betSize: 1, playerIndex: 0 },
          { type: GameStreetActionType.call, betSize: 1, playerIndex: 1 },
          { type: GameStreetActionType.call, betSize: 1, playerIndex: 2 },
        ]);

        expect(playerActions.turn).toEqual([
          { type: GameStreetActionType.bet, betSize: 1, playerIndex: 0 },
          { type: GameStreetActionType.call, betSize: 1, playerIndex: 1 },
          { type: GameStreetActionType.call, betSize: 1, playerIndex: 2 },
        ]);

        expect(playerActions.river).toEqual([
          { type: GameStreetActionType.check, betSize: 0, playerIndex: 0 },
          { type: GameStreetActionType.check, betSize: 0, playerIndex: 1 },
          { type: GameStreetActionType.bet, betSize: 1, playerIndex: 2 },
          { type: GameStreetActionType.fold, betSize: 0, playerIndex: 0 },
        ]);
      });
    });
  });

  describe("deleteAction(street: Street, index: number)", () => {
    describe("deletes action from its preflop actions", () => {
      it("throws error when index is -1", () => {
        const playerActions = new PlayerActions({
          smallBlindSize: 0,
          playerLength: 3,
          playerStackSizes: [0, 0, 0],
        });

        playerActions["_preflop"] = [
          { type: GameStreetActionType.bet, betSize: 1, playerIndex: 0 },
          { type: GameStreetActionType.fold, betSize: 0, playerIndex: 1 },
          { type: GameStreetActionType.raise, betSize: 3, playerIndex: 2 },
          { type: GameStreetActionType.call, betSize: 3, playerIndex: 0 },
          { type: GameStreetActionType.call, betSize: 1, playerIndex: 1 },
        ];

        expect(() => {
          playerActions["deleteAction"](Street.preflop, -1);
        }).toThrowError(
          new Error(
            "index must be more than or equal to 0 and less than or equal to the street length"
          )
        );
      });

      it("throws error when index is more than playerLength", () => {
        const playerActions = new PlayerActions({
          smallBlindSize: 0,
          playerLength: 3,
          playerStackSizes: [0, 0, 0],
        });

        playerActions["_preflop"] = [
          { type: GameStreetActionType.bet, betSize: 1, playerIndex: 0 },
          { type: GameStreetActionType.fold, betSize: 0, playerIndex: 1 },
          { type: GameStreetActionType.raise, betSize: 3, playerIndex: 2 },
          { type: GameStreetActionType.call, betSize: 3, playerIndex: 0 },
          { type: GameStreetActionType.call, betSize: 1, playerIndex: 1 },
        ];

        expect(() => {
          playerActions["deleteAction"](Street.preflop, 5);
        }).toThrowError(
          new Error(
            "index must be more than or equal to 0 and less than or equal to the street length"
          )
        );
      });

      it("deletes one of the actions", () => {
        const playerActions = new PlayerActions({
          smallBlindSize: 0,
          playerLength: 3,
          playerStackSizes: [0, 0, 0],
        });

        playerActions["_preflop"] = [
          { type: GameStreetActionType.bet, betSize: 1, playerIndex: 0 },
          { type: GameStreetActionType.fold, betSize: 0, playerIndex: 1 },
          { type: GameStreetActionType.raise, betSize: 3, playerIndex: 2 },
          { type: GameStreetActionType.call, betSize: 3, playerIndex: 0 },
          { type: GameStreetActionType.call, betSize: 1, playerIndex: 1 },
        ];

        playerActions["deleteAction"](Street.preflop, 4);

        expect(playerActions.preflop).toEqual([
          { type: GameStreetActionType.bet, betSize: 1, playerIndex: 0 },
          { type: GameStreetActionType.fold, betSize: 0, playerIndex: 1 },
          { type: GameStreetActionType.raise, betSize: 3, playerIndex: 2 },
          { type: GameStreetActionType.call, betSize: 3, playerIndex: 0 },
        ]);
      });
    });

    describe("deletes action from its flop actions", () => {
      it("throws error when index is -1", () => {
        const playerActions = new PlayerActions({
          smallBlindSize: 0,
          playerLength: 3,
          playerStackSizes: [0, 0, 0],
        });

        playerActions["_preflop"] = [
          { type: GameStreetActionType.bet, betSize: 1, playerIndex: 0 },
          { type: GameStreetActionType.call, betSize: 1, playerIndex: 1 },
          { type: GameStreetActionType.call, betSize: 1, playerIndex: 2 },
        ];

        playerActions["_flop"] = [
          { type: GameStreetActionType.bet, betSize: 1, playerIndex: 0 },
          { type: GameStreetActionType.fold, betSize: 0, playerIndex: 1 },
          { type: GameStreetActionType.raise, betSize: 3, playerIndex: 2 },
          { type: GameStreetActionType.call, betSize: 3, playerIndex: 0 },
          { type: GameStreetActionType.call, betSize: 1, playerIndex: 1 },
        ];

        expect(() => {
          playerActions["deleteAction"](Street.flop, -1);
        }).toThrowError(
          new Error(
            "index must be more than or equal to 0 and less than or equal to the street length"
          )
        );
      });

      it("throws error when index is more than playerLength", () => {
        const playerActions = new PlayerActions({
          smallBlindSize: 0,
          playerLength: 3,
          playerStackSizes: [0, 0, 0],
        });

        playerActions["_preflop"] = [
          { type: GameStreetActionType.bet, betSize: 1, playerIndex: 0 },
          { type: GameStreetActionType.call, betSize: 1, playerIndex: 1 },
          { type: GameStreetActionType.call, betSize: 1, playerIndex: 2 },
        ];

        playerActions["_flop"] = [
          { type: GameStreetActionType.bet, betSize: 1, playerIndex: 0 },
          { type: GameStreetActionType.fold, betSize: 0, playerIndex: 1 },
          { type: GameStreetActionType.raise, betSize: 3, playerIndex: 2 },
          { type: GameStreetActionType.call, betSize: 3, playerIndex: 0 },
          { type: GameStreetActionType.call, betSize: 1, playerIndex: 1 },
        ];

        expect(() => {
          playerActions["deleteAction"](Street.flop, 5);
        }).toThrowError(
          new Error(
            "index must be more than or equal to 0 and less than or equal to the street length"
          )
        );
      });

      it("deletes one of the actions", () => {
        const playerActions = new PlayerActions({
          smallBlindSize: 0,
          playerLength: 3,
          playerStackSizes: [0, 0, 0],
        });

        playerActions["_preflop"] = [
          { type: GameStreetActionType.bet, betSize: 1, playerIndex: 0 },
          { type: GameStreetActionType.call, betSize: 1, playerIndex: 1 },
          { type: GameStreetActionType.call, betSize: 1, playerIndex: 2 },
        ];

        playerActions["_flop"] = [
          { type: GameStreetActionType.bet, betSize: 1, playerIndex: 0 },
          { type: GameStreetActionType.fold, betSize: 0, playerIndex: 1 },
          { type: GameStreetActionType.raise, betSize: 3, playerIndex: 2 },
          { type: GameStreetActionType.call, betSize: 3, playerIndex: 0 },
          { type: GameStreetActionType.call, betSize: 1, playerIndex: 1 },
        ];

        playerActions["deleteAction"](Street.flop, 4);

        expect(playerActions.preflop).toEqual([
          { type: GameStreetActionType.bet, betSize: 1, playerIndex: 0 },
          { type: GameStreetActionType.call, betSize: 1, playerIndex: 1 },
          { type: GameStreetActionType.call, betSize: 1, playerIndex: 2 },
        ]);

        expect(playerActions.flop).toEqual([
          { type: GameStreetActionType.bet, betSize: 1, playerIndex: 0 },
          { type: GameStreetActionType.fold, betSize: 0, playerIndex: 1 },
          { type: GameStreetActionType.raise, betSize: 3, playerIndex: 2 },
          { type: GameStreetActionType.call, betSize: 3, playerIndex: 0 },
        ]);
      });
    });

    describe("deletes action from its turn actions", () => {
      it("throws error when index is -1", () => {
        const playerActions = new PlayerActions({
          smallBlindSize: 0,
          playerLength: 3,
          playerStackSizes: [0, 0, 0],
        });

        playerActions["_preflop"] = [
          { type: GameStreetActionType.bet, betSize: 1, playerIndex: 0 },
          { type: GameStreetActionType.call, betSize: 1, playerIndex: 1 },
          { type: GameStreetActionType.call, betSize: 1, playerIndex: 2 },
        ];

        playerActions["_flop"] = [
          { type: GameStreetActionType.check, betSize: 0, playerIndex: 0 },
          { type: GameStreetActionType.check, betSize: 0, playerIndex: 1 },
          { type: GameStreetActionType.check, betSize: 0, playerIndex: 2 },
        ];

        playerActions["_turn"] = [
          { type: GameStreetActionType.check, betSize: 0, playerIndex: 0 },
          { type: GameStreetActionType.check, betSize: 0, playerIndex: 1 },
          { type: GameStreetActionType.check, betSize: 0, playerIndex: 2 },
        ];

        expect(() => {
          playerActions["deleteAction"](Street.turn, -1);
        }).toThrowError(
          new Error(
            "index must be more than or equal to 0 and less than or equal to the street length"
          )
        );
      });

      it("throws error when index is more than playerLength", () => {
        const playerActions = new PlayerActions({
          smallBlindSize: 0,
          playerLength: 3,
          playerStackSizes: [0, 0, 0],
        });

        playerActions["_preflop"] = [
          { type: GameStreetActionType.bet, betSize: 1, playerIndex: 0 },
          { type: GameStreetActionType.call, betSize: 1, playerIndex: 1 },
          { type: GameStreetActionType.call, betSize: 1, playerIndex: 2 },
        ];

        playerActions["_flop"] = [
          { type: GameStreetActionType.check, betSize: 0, playerIndex: 0 },
          { type: GameStreetActionType.check, betSize: 0, playerIndex: 1 },
          { type: GameStreetActionType.fold, betSize: 0, playerIndex: 2 },
        ];

        playerActions["_turn"] = [
          { type: GameStreetActionType.bet, betSize: 1, playerIndex: 0 },
          { type: GameStreetActionType.fold, betSize: 0, playerIndex: 1 },
          { type: GameStreetActionType.call, betSize: 1, playerIndex: 2 },
        ];

        expect(() => {
          playerActions["deleteAction"](Street.turn, 3);
        }).toThrowError(
          new Error(
            "index must be more than or equal to 0 and less than or equal to the street length"
          )
        );
      });

      it("deletes one of the actions", () => {
        const playerActions = new PlayerActions({
          smallBlindSize: 0,
          playerLength: 3,
          playerStackSizes: [0, 0, 0],
        });

        playerActions["_preflop"] = [
          { type: GameStreetActionType.bet, betSize: 1, playerIndex: 0 },
          { type: GameStreetActionType.call, betSize: 1, playerIndex: 1 },
          { type: GameStreetActionType.call, betSize: 1, playerIndex: 2 },
        ];

        playerActions["_flop"] = [
          { type: GameStreetActionType.check, betSize: 0, playerIndex: 0 },
          { type: GameStreetActionType.check, betSize: 0, playerIndex: 1 },
          { type: GameStreetActionType.fold, betSize: 0, playerIndex: 2 },
        ];

        playerActions["_turn"] = [
          { type: GameStreetActionType.bet, betSize: 1, playerIndex: 0 },
          { type: GameStreetActionType.fold, betSize: 0, playerIndex: 1 },
          { type: GameStreetActionType.call, betSize: 1, playerIndex: 2 },
        ];

        playerActions["deleteAction"](Street.turn, 2);

        expect(playerActions.preflop).toEqual([
          { type: GameStreetActionType.bet, betSize: 1, playerIndex: 0 },
          { type: GameStreetActionType.call, betSize: 1, playerIndex: 1 },
          { type: GameStreetActionType.call, betSize: 1, playerIndex: 2 },
        ]);

        expect(playerActions.flop).toEqual([
          { type: GameStreetActionType.check, betSize: 0, playerIndex: 0 },
          { type: GameStreetActionType.check, betSize: 0, playerIndex: 1 },
          { type: GameStreetActionType.fold, betSize: 0, playerIndex: 2 },
        ]);

        expect(playerActions.turn).toEqual([
          { type: GameStreetActionType.bet, betSize: 1, playerIndex: 0 },
          { type: GameStreetActionType.fold, betSize: 0, playerIndex: 1 },
        ]);
      });
    });

    describe("deletes action from its river actions", () => {
      it("throws error when index is -1", () => {
        const playerActions = new PlayerActions({
          smallBlindSize: 0,
          playerLength: 3,
          playerStackSizes: [0, 0, 0],
        });

        playerActions["_preflop"] = [
          { type: GameStreetActionType.bet, betSize: 1, playerIndex: 0 },
          { type: GameStreetActionType.call, betSize: 1, playerIndex: 1 },
          { type: GameStreetActionType.call, betSize: 1, playerIndex: 2 },
        ];

        playerActions["_flop"] = [
          { type: GameStreetActionType.check, betSize: 0, playerIndex: 0 },
          { type: GameStreetActionType.check, betSize: 0, playerIndex: 1 },
          { type: GameStreetActionType.check, betSize: 0, playerIndex: 2 },
        ];

        playerActions["_turn"] = [
          { type: GameStreetActionType.check, betSize: 0, playerIndex: 0 },
          { type: GameStreetActionType.check, betSize: 0, playerIndex: 1 },
          { type: GameStreetActionType.check, betSize: 0, playerIndex: 2 },
        ];

        playerActions["_river"] = [
          { type: GameStreetActionType.check, betSize: 0, playerIndex: 0 },
          { type: GameStreetActionType.check, betSize: 0, playerIndex: 1 },
          { type: GameStreetActionType.check, betSize: 0, playerIndex: 2 },
        ];

        expect(() => {
          playerActions["deleteAction"](Street.river, -1);
        }).toThrowError(
          new Error(
            "index must be more than or equal to 0 and less than or equal to the street length"
          )
        );
      });

      it("throws error when index is more than playerLength", () => {
        const playerActions = new PlayerActions({
          smallBlindSize: 0,
          playerLength: 3,
          playerStackSizes: [0, 0, 0],
        });

        playerActions["_preflop"] = [
          { type: GameStreetActionType.bet, betSize: 1, playerIndex: 0 },
          { type: GameStreetActionType.call, betSize: 1, playerIndex: 1 },
          { type: GameStreetActionType.call, betSize: 1, playerIndex: 2 },
        ];

        playerActions["_flop"] = [
          { type: GameStreetActionType.check, betSize: 0, playerIndex: 0 },
          { type: GameStreetActionType.check, betSize: 0, playerIndex: 1 },
          { type: GameStreetActionType.fold, betSize: 0, playerIndex: 2 },
        ];

        playerActions["_turn"] = [
          { type: GameStreetActionType.check, betSize: 0, playerIndex: 0 },
          { type: GameStreetActionType.check, betSize: 0, playerIndex: 1 },
          { type: GameStreetActionType.check, betSize: 0, playerIndex: 2 },
        ];

        playerActions["_river"] = [
          { type: GameStreetActionType.check, betSize: 0, playerIndex: 0 },
          { type: GameStreetActionType.check, betSize: 0, playerIndex: 1 },
          { type: GameStreetActionType.check, betSize: 0, playerIndex: 2 },
        ];

        expect(() => {
          playerActions["deleteAction"](Street.river, 3);
        }).toThrowError(
          new Error(
            "index must be more than or equal to 0 and less than or equal to the street length"
          )
        );
      });

      it("deletes one of the actions", () => {
        const playerActions = new PlayerActions({
          smallBlindSize: 0,
          playerLength: 3,
          playerStackSizes: [0, 0, 0],
        });

        playerActions["_preflop"] = [
          { type: GameStreetActionType.bet, betSize: 1, playerIndex: 0 },
          { type: GameStreetActionType.call, betSize: 1, playerIndex: 1 },
          { type: GameStreetActionType.call, betSize: 1, playerIndex: 2 },
        ];

        playerActions["_flop"] = [
          { type: GameStreetActionType.check, betSize: 0, playerIndex: 0 },
          { type: GameStreetActionType.check, betSize: 0, playerIndex: 1 },
          { type: GameStreetActionType.fold, betSize: 0, playerIndex: 2 },
        ];

        playerActions["_turn"] = [
          { type: GameStreetActionType.check, betSize: 0, playerIndex: 0 },
          { type: GameStreetActionType.check, betSize: 0, playerIndex: 1 },
          { type: GameStreetActionType.fold, betSize: 0, playerIndex: 2 },
        ];

        playerActions["_river"] = [
          { type: GameStreetActionType.check, betSize: 0, playerIndex: 0 },
          { type: GameStreetActionType.check, betSize: 0, playerIndex: 1 },
          { type: GameStreetActionType.check, betSize: 0, playerIndex: 2 },
        ];

        playerActions["deleteAction"](Street.river, 2);

        expect(playerActions.preflop).toEqual([
          { type: GameStreetActionType.bet, betSize: 1, playerIndex: 0 },
          { type: GameStreetActionType.call, betSize: 1, playerIndex: 1 },
          { type: GameStreetActionType.call, betSize: 1, playerIndex: 2 },
        ]);

        expect(playerActions.flop).toEqual([
          { type: GameStreetActionType.check, betSize: 0, playerIndex: 0 },
          { type: GameStreetActionType.check, betSize: 0, playerIndex: 1 },
          { type: GameStreetActionType.fold, betSize: 0, playerIndex: 2 },
        ]);

        expect(playerActions.turn).toEqual([
          { type: GameStreetActionType.check, betSize: 0, playerIndex: 0 },
          { type: GameStreetActionType.check, betSize: 0, playerIndex: 1 },
          { type: GameStreetActionType.fold, betSize: 0, playerIndex: 2 },
        ]);

        expect(playerActions.river).toEqual([
          { type: GameStreetActionType.check, betSize: 0, playerIndex: 0 },
          { type: GameStreetActionType.check, betSize: 0, playerIndex: 1 },
        ]);
      });
    });
  });

  describe("updateAction(street: Street, index: number, gameStreetAction: GameStreetAction)", () => {
    it("throws index error when index is -1", () => {
      const playerActions = new PlayerActions({
        smallBlindSize: 0,
        playerLength: 3,
        playerStackSizes: [0, 0, 0],
      });

      expect(() => {
        playerActions["updateAction"](Street.preflop, -1, {
          type: GameStreetActionType.fold,
          playerIndex: 0,
          betSize: 0,
        });
      }).toThrowError(
        new Error(
          "index must be more than or equal to 0 and less than or equal to the street length"
        )
      );
    });

    it("throws index error when index is more than this[street].length", () => {
      const playerActions = new PlayerActions({
        smallBlindSize: 0,
        playerLength: 3,
        playerStackSizes: [0, 0, 0],
      });

      expect(() => {
        playerActions["updateAction"](Street.preflop, 4, {
          type: GameStreetActionType.fold,
          playerIndex: 0,
          betSize: 0,
        });
      }).toThrowError(
        new Error(
          "index must be more than or equal to 0 and less than or equal to the street length"
        )
      );
    });

    it("updates gameStreetAction properly", () => {
      const playerActions = new PlayerActions({
        smallBlindSize: 0,
        playerLength: 3,
        playerStackSizes: [0, 0, 0],
      });

      playerActions["updateAction"](Street.preflop, 0, {
        type: GameStreetActionType.check,
        playerIndex: 0,
        betSize: 0,
      });

      expect(playerActions.preflop).toEqual([
        { type: GameStreetActionType.check, playerIndex: 0, betSize: 0 },
        { type: GameStreetActionType.fold, playerIndex: 1, betSize: 1 },
        { type: GameStreetActionType.fold, playerIndex: 2, betSize: 0 },
      ]);
    });

    describe("when the action going to be updated is fold", () => {
      describe("when the action chaged to check", () => {
        it("calls private methods property when isBetOrRaiseExistOnSubsequentActions returns true", () => {
          const playerActions = new PlayerActions({
            smallBlindSize: 0,
            playerLength: 3,
            playerStackSizes: [0, 0, 0],
          });

          const mockIsBetOrRaiseExistOnSubsequentActions = jest.fn(() => true);
          const mockGetExpectedNextActionIndex = jest.fn();
          const mockAddAction = jest.fn();

          playerActions[
            "isBetOrRaiseExistOnSubsequentActions"
          ] = mockIsBetOrRaiseExistOnSubsequentActions;
          playerActions[
            "getExpectedNextActionIndex"
          ] = mockGetExpectedNextActionIndex;
          playerActions["addAction"] = mockAddAction;

          playerActions["updateAction"](Street.preflop, 0, {
            type: GameStreetActionType.check,
            playerIndex: 0,
            betSize: 0,
          });

          expect(
            mockIsBetOrRaiseExistOnSubsequentActions.mock.calls.length
          ).toBe(1);
          expect(mockGetExpectedNextActionIndex.mock.calls.length).toBe(1);
          expect(mockAddAction.mock.calls.length).toBe(1);
        });

        it("calls private methods property when isBetOrRaiseExistOnSubsequentActions returns false", () => {
          const playerActions = new PlayerActions({
            smallBlindSize: 0,
            playerLength: 3,
            playerStackSizes: [0, 0, 0],
          });

          const mockIsBetOrRaiseExistOnSubsequentActions = jest.fn(() => false);
          const mockGetNextStreet = jest.fn();
          const mockGetFirstActionIndexOfThePlayerBy = jest.fn();
          const mockAddAction = jest.fn();

          playerActions[
            "isBetOrRaiseExistOnSubsequentActions"
          ] = mockIsBetOrRaiseExistOnSubsequentActions;
          playerActions["getNextStreet"] = mockGetNextStreet;
          playerActions[
            "getFirstActionIndexOfThePlayerBy"
          ] = mockGetFirstActionIndexOfThePlayerBy;
          playerActions["addAction"] = mockAddAction;

          playerActions["updateAction"](Street.preflop, 0, {
            type: GameStreetActionType.check,
            playerIndex: 0,
            betSize: 0,
          });

          expect(
            mockIsBetOrRaiseExistOnSubsequentActions.mock.calls.length
          ).toBe(1);
          expect(mockGetNextStreet.mock.calls.length).toBe(1);
          expect(mockGetFirstActionIndexOfThePlayerBy.mock.calls.length).toBe(
            1
          );
          expect(mockAddAction.mock.calls.length).toBe(1);
        });
      });

      describe("when the action chaged to call", () => {
        it("calls private methods property when isBetOrRaiseExistOnSubsequentActions returns true and isBetOrRaiseExistOnSubsequentActions returns true", () => {
          const playerActions = new PlayerActions({
            smallBlindSize: 0,
            playerLength: 3,
            playerStackSizes: [0, 0, 0],
          });

          const mockIsAffordable = jest.fn(() => true);
          const mockIsBetOrRaiseExistOnSubsequentActions = jest.fn(() => true);
          const mockGetExpectedNextActionIndex = jest.fn();
          const mockAddAction = jest.fn();

          playerActions["isAffordable"] = mockIsAffordable;
          playerActions[
            "isBetOrRaiseExistOnSubsequentActions"
          ] = mockIsBetOrRaiseExistOnSubsequentActions;
          playerActions[
            "getExpectedNextActionIndex"
          ] = mockGetExpectedNextActionIndex;
          playerActions["addAction"] = mockAddAction;

          playerActions["updateAction"](Street.preflop, 0, {
            type: GameStreetActionType.call,
            playerIndex: 0,
            betSize: 0,
          });

          expect(mockIsAffordable.mock.calls.length).toBe(1);
          expect(
            mockIsBetOrRaiseExistOnSubsequentActions.mock.calls.length
          ).toBe(1);
          expect(mockGetExpectedNextActionIndex.mock.calls.length).toBe(1);
          expect(mockAddAction.mock.calls.length).toBe(1);
        });

        it("calls private methods property when isBetOrRaiseExistOnSubsequentActions returns true and isBetOrRaiseExistOnSubsequentActions returns false", () => {
          const playerActions = new PlayerActions({
            smallBlindSize: 0,
            playerLength: 3,
            playerStackSizes: [0, 0, 0],
          });

          const mockIsAffordable = jest.fn(() => true);
          const mockIsBetOrRaiseExistOnSubsequentActions = jest.fn(() => false);
          const mockGetNextStreet = jest.fn(() => Street.flop);
          const mockGetFirstActionIndexOfThePlayerBy = jest.fn();
          const mockAddAction = jest.fn();

          playerActions["isAffordable"] = mockIsAffordable;
          playerActions[
            "isBetOrRaiseExistOnSubsequentActions"
          ] = mockIsBetOrRaiseExistOnSubsequentActions;
          playerActions["getNextStreet"] = mockGetNextStreet;
          playerActions[
            "getFirstActionIndexOfThePlayerBy"
          ] = mockGetFirstActionIndexOfThePlayerBy;
          playerActions["addAction"] = mockAddAction;

          playerActions["updateAction"](Street.preflop, 0, {
            type: GameStreetActionType.call,
            playerIndex: 0,
            betSize: 0,
          });

          expect(mockIsAffordable.mock.calls.length).toBe(1);
          expect(
            mockIsBetOrRaiseExistOnSubsequentActions.mock.calls.length
          ).toBe(1);
          expect(mockGetNextStreet.mock.calls.length).toBe(1);
          expect(mockGetFirstActionIndexOfThePlayerBy.mock.calls.length).toBe(
            1
          );
          expect(mockAddAction.mock.calls.length).toBe(1);
        });

        it("calls private methods property when isBetOrRaiseExistOnSubsequentActions returns false", () => {
          const playerActions = new PlayerActions({
            smallBlindSize: 0,
            playerLength: 3,
            playerStackSizes: [0, 0, 0],
          });

          const mockIsAffordable = jest.fn(() => false);
          const mockDeleteSubsequentActions = jest.fn();

          playerActions["isAffordable"] = mockIsAffordable;
          playerActions[
            "deleteSubsequentActions"
          ] = mockDeleteSubsequentActions;

          playerActions["updateAction"](Street.preflop, 0, {
            type: GameStreetActionType.call,
            playerIndex: 0,
            betSize: 0,
          });

          expect(mockIsAffordable.mock.calls.length).toBe(1);
          expect(mockDeleteSubsequentActions.mock.calls.length).toBe(1);
        });
      });

      describe("when the action chaged to bet", () => {
        it("calls private methods property when isBetOrRaiseExistOnSubsequentActions returns true and isBetOrRaiseExistOnSubsequentActions returns true", () => {
          const playerActions = new PlayerActions({
            smallBlindSize: 0,
            playerLength: 3,
            playerStackSizes: [0, 0, 0],
          });

          playerActions["_preflop"] = [
            { type: GameStreetActionType.fold, playerIndex: 0, betSize: 0 },
            { type: GameStreetActionType.check, playerIndex: 1, betSize: 1 },
            { type: GameStreetActionType.check, playerIndex: 2, betSize: 1 },
          ];

          const mockIsAffordable = jest.fn(() => true);
          const mockIsBetOrRaiseExistOnSubsequentActions = jest.fn(() => true);
          const mockGetExpectedNextActionIndex = jest.fn();
          const mockAddAction = jest.fn();

          playerActions["isAffordable"] = mockIsAffordable;
          playerActions[
            "isBetOrRaiseExistOnSubsequentActions"
          ] = mockIsBetOrRaiseExistOnSubsequentActions;
          playerActions[
            "getExpectedNextActionIndex"
          ] = mockGetExpectedNextActionIndex;
          playerActions["addAction"] = mockAddAction;

          playerActions["updateAction"](Street.preflop, 0, {
            type: GameStreetActionType.bet,
            playerIndex: 0,
            betSize: 1,
          });

          expect(mockIsAffordable.mock.calls.length).toBe(1);
          expect(
            mockIsBetOrRaiseExistOnSubsequentActions.mock.calls.length
          ).toBe(1);
          expect(mockGetExpectedNextActionIndex.mock.calls.length).toBe(1);
          expect(mockAddAction.mock.calls.length).toBe(1);
        });

        it("calls private methods property when isBetOrRaiseExistOnSubsequentActions returns true and isBetOrRaiseExistOnSubsequentActions returns false", () => {
          const playerActions = new PlayerActions({
            smallBlindSize: 0,
            playerLength: 3,
            playerStackSizes: [0, 0, 0],
          });

          playerActions["_preflop"] = [
            { type: GameStreetActionType.fold, playerIndex: 0, betSize: 0 },
            { type: GameStreetActionType.check, playerIndex: 1, betSize: 1 },
            { type: GameStreetActionType.check, playerIndex: 2, betSize: 1 },
          ];

          const mockIsAffordable = jest.fn(() => true);
          const mockIsBetOrRaiseExistOnSubsequentActions = jest.fn(() => false);
          const mockGetActivePlayerIndexesAt = jest.fn(() => [1, 2]);
          const mockAddAction = jest.fn();
          const mockGetNextStreet = jest.fn(() => Street.flop);
          const mockGetFirstActionIndexOfThePlayerBy = jest.fn();

          playerActions["isAffordable"] = mockIsAffordable;
          playerActions[
            "isBetOrRaiseExistOnSubsequentActions"
          ] = mockIsBetOrRaiseExistOnSubsequentActions;
          playerActions[
            "getActivePlayerIndexesAt"
          ] = mockGetActivePlayerIndexesAt;
          playerActions["addAction"] = mockAddAction;
          playerActions["getNextStreet"] = mockGetNextStreet;
          playerActions[
            "getFirstActionIndexOfThePlayerBy"
          ] = mockGetFirstActionIndexOfThePlayerBy;

          playerActions["updateAction"](Street.preflop, 0, {
            type: GameStreetActionType.bet,
            playerIndex: 0,
            betSize: 1,
          });

          expect(mockIsAffordable.mock.calls.length).toBe(1);
          expect(
            mockIsBetOrRaiseExistOnSubsequentActions.mock.calls.length
          ).toBe(1);
          expect(mockGetActivePlayerIndexesAt.mock.calls.length).toBe(1);
          expect(mockAddAction.mock.calls.length).toBe(1);
          expect(mockGetNextStreet.mock.calls.length).toBe(1);
          expect(mockGetNextStreet.mock.calls.length).toBe(1);
          expect(mockGetFirstActionIndexOfThePlayerBy.mock.calls.length).toBe(
            1
          );
        });

        it("calls private methods property when isBetOrRaiseExistOnSubsequentActions returns false", () => {
          const playerActions = new PlayerActions({
            smallBlindSize: 0,
            playerLength: 3,
            playerStackSizes: [0, 0, 0],
          });

          playerActions["_preflop"] = [
            { type: GameStreetActionType.fold, playerIndex: 0, betSize: 0 },
            { type: GameStreetActionType.check, playerIndex: 1, betSize: 1 },
            { type: GameStreetActionType.check, playerIndex: 2, betSize: 1 },
          ];

          const mockIsAffordable = jest.fn(() => false);
          const mockDeleteSubsequentActions = jest.fn();

          playerActions["isAffordable"] = mockIsAffordable;
          playerActions[
            "deleteSubsequentActions"
          ] = mockDeleteSubsequentActions;

          playerActions["updateAction"](Street.preflop, 0, {
            type: GameStreetActionType.bet,
            playerIndex: 0,
            betSize: 1,
          });

          expect(mockIsAffordable.mock.calls.length).toBe(1);
          expect(mockDeleteSubsequentActions.mock.calls.length).toBe(1);
        });
      });

      describe("when the action chaged to raise", () => {
        it("calls private methods property when isBetOrRaiseExistOnSubsequentActions returns true and isBetOrRaiseExistOnSubsequentActions returns true", () => {
          const playerActions = new PlayerActions({
            smallBlindSize: 0,
            playerLength: 3,
            playerStackSizes: [0, 0, 0],
          });

          playerActions["_preflop"] = [
            { type: GameStreetActionType.bet, playerIndex: 0, betSize: 0 },
            { type: GameStreetActionType.fold, playerIndex: 1, betSize: 1 },
            { type: GameStreetActionType.check, playerIndex: 2, betSize: 1 },
          ];

          const mockIsAffordable = jest.fn(() => true);
          const mockIsBetOrRaiseExistOnSubsequentActions = jest.fn(() => true);
          const mockGetExpectedNextActionIndex = jest.fn();
          const mockAddAction = jest.fn();

          playerActions["isAffordable"] = mockIsAffordable;
          playerActions[
            "isBetOrRaiseExistOnSubsequentActions"
          ] = mockIsBetOrRaiseExistOnSubsequentActions;
          playerActions[
            "getExpectedNextActionIndex"
          ] = mockGetExpectedNextActionIndex;
          playerActions["addAction"] = mockAddAction;

          playerActions["updateAction"](Street.preflop, 1, {
            type: GameStreetActionType.raise,
            playerIndex: 1,
            betSize: 2,
          });

          expect(mockIsAffordable.mock.calls.length).toBe(1);
          expect(
            mockIsBetOrRaiseExistOnSubsequentActions.mock.calls.length
          ).toBe(1);
          expect(mockGetExpectedNextActionIndex.mock.calls.length).toBe(1);
          expect(mockAddAction.mock.calls.length).toBe(1);
        });

        it("calls private methods property when isBetOrRaiseExistOnSubsequentActions returns true and isBetOrRaiseExistOnSubsequentActions returns false", () => {
          const playerActions = new PlayerActions({
            smallBlindSize: 0,
            playerLength: 3,
            playerStackSizes: [0, 0, 0],
          });

          playerActions["_preflop"] = [
            { type: GameStreetActionType.bet, playerIndex: 0, betSize: 0 },
            { type: GameStreetActionType.fold, playerIndex: 1, betSize: 1 },
            { type: GameStreetActionType.check, playerIndex: 2, betSize: 1 },
          ];

          const mockIsAffordable = jest.fn(() => true);
          const mockIsBetOrRaiseExistOnSubsequentActions = jest.fn(() => false);
          const mockGetActivePlayerIndexesAt = jest.fn(() => [2]);
          const mockAddAction = jest.fn();
          const mockGetNextStreet = jest.fn(() => Street.flop);
          const mockGetFirstActionIndexOfThePlayerBy = jest.fn();

          playerActions["isAffordable"] = mockIsAffordable;
          playerActions[
            "isBetOrRaiseExistOnSubsequentActions"
          ] = mockIsBetOrRaiseExistOnSubsequentActions;
          playerActions[
            "getActivePlayerIndexesAt"
          ] = mockGetActivePlayerIndexesAt;
          playerActions["addAction"] = mockAddAction;
          playerActions["getNextStreet"] = mockGetNextStreet;
          playerActions[
            "getFirstActionIndexOfThePlayerBy"
          ] = mockGetFirstActionIndexOfThePlayerBy;

          playerActions["updateAction"](Street.preflop, 1, {
            type: GameStreetActionType.raise,
            playerIndex: 0,
            betSize: 2,
          });

          expect(mockIsAffordable.mock.calls.length).toBe(1);
          expect(
            mockIsBetOrRaiseExistOnSubsequentActions.mock.calls.length
          ).toBe(1);
          expect(mockGetActivePlayerIndexesAt.mock.calls.length).toBe(1);
          expect(mockAddAction.mock.calls.length).toBe(1);
          expect(mockGetNextStreet.mock.calls.length).toBe(1);
          expect(mockGetNextStreet.mock.calls.length).toBe(1);
          expect(mockGetFirstActionIndexOfThePlayerBy.mock.calls.length).toBe(
            1
          );
        });

        it("calls private methods property when isBetOrRaiseExistOnSubsequentActions returns false", () => {
          const playerActions = new PlayerActions({
            smallBlindSize: 0,
            playerLength: 3,
            playerStackSizes: [0, 0, 0],
          });

          playerActions["_preflop"] = [
            { type: GameStreetActionType.bet, playerIndex: 0, betSize: 0 },
            { type: GameStreetActionType.fold, playerIndex: 1, betSize: 1 },
            { type: GameStreetActionType.check, playerIndex: 2, betSize: 1 },
          ];

          const mockIsAffordable = jest.fn(() => false);
          const mockDeleteSubsequentActions = jest.fn();

          playerActions["isAffordable"] = mockIsAffordable;
          playerActions[
            "deleteSubsequentActions"
          ] = mockDeleteSubsequentActions;

          playerActions["updateAction"](Street.preflop, 1, {
            type: GameStreetActionType.raise,
            playerIndex: 0,
            betSize: 2,
          });

          expect(mockIsAffordable.mock.calls.length).toBe(1);
          expect(mockDeleteSubsequentActions.mock.calls.length).toBe(1);
        });
      });
    });

    describe("when the action going to be updated is check", () => {
      describe("when the action chaged to fold", () => {
        it("calls deleteSubsequentActions once", () => {
          const playerActions = new PlayerActions({
            smallBlindSize: 0,
            playerLength: 3,
            playerStackSizes: [0, 0, 0],
          });

          playerActions["_preflop"] = [
            { type: GameStreetActionType.check, playerIndex: 0, betSize: 0 },
            { type: GameStreetActionType.check, playerIndex: 1, betSize: 0 },
            { type: GameStreetActionType.check, playerIndex: 2, betSize: 0 },
          ];

          const mockDeleteSubsequentActions = jest.fn();

          playerActions[
            "deleteSubsequentActions"
          ] = mockDeleteSubsequentActions;

          playerActions["updateAction"](Street.preflop, 1, {
            type: GameStreetActionType.fold,
            playerIndex: 1,
            betSize: 0,
          });

          expect(mockDeleteSubsequentActions.mock.calls.length).toBe(1);
        });
      });

      describe("when the action chaged to bet", () => {
        it("calls private methods property when isBetOrRaiseExistOnSubsequentActions returns true and isBetOrRaiseExistOnSubsequentActions returns true", () => {
          const playerActions = new PlayerActions({
            smallBlindSize: 0,
            playerLength: 3,
            playerStackSizes: [0, 0, 0],
          });

          playerActions["_preflop"] = [
            { type: GameStreetActionType.check, playerIndex: 0, betSize: 0 },
            { type: GameStreetActionType.check, playerIndex: 1, betSize: 0 },
            { type: GameStreetActionType.check, playerIndex: 2, betSize: 0 },
          ];

          const mockIsAffordable = jest.fn(() => true);
          const mockIsBetOrRaiseExistOnSubsequentActions = jest.fn(() => true);
          const mockGetActivePlayerIndexesAt = jest.fn();
          const mockAddAction = jest.fn();

          playerActions["isAffordable"] = mockIsAffordable;
          playerActions[
            "isBetOrRaiseExistOnSubsequentActions"
          ] = mockIsBetOrRaiseExistOnSubsequentActions;
          playerActions[
            "getActivePlayerIndexesAt"
          ] = mockGetActivePlayerIndexesAt;
          playerActions["addAction"] = mockAddAction;

          playerActions["updateAction"](Street.preflop, 1, {
            type: GameStreetActionType.bet,
            playerIndex: 1,
            betSize: 1,
          });

          expect(mockIsAffordable.mock.calls.length).toBe(1);
          expect(
            mockIsBetOrRaiseExistOnSubsequentActions.mock.calls.length
          ).toBe(1);
          expect(mockGetActivePlayerIndexesAt.mock.calls.length).toBe(0);
          expect(mockAddAction.mock.calls.length).toBe(0);
        });

        it("calls private methods property when isBetOrRaiseExistOnSubsequentActions returns true and isBetOrRaiseExistOnSubsequentActions returns false", () => {
          const playerActions = new PlayerActions({
            smallBlindSize: 0,
            playerLength: 3,
            playerStackSizes: [0, 0, 0],
          });

          playerActions["_preflop"] = [
            { type: GameStreetActionType.check, playerIndex: 0, betSize: 0 },
            { type: GameStreetActionType.check, playerIndex: 1, betSize: 0 },
            { type: GameStreetActionType.check, playerIndex: 2, betSize: 0 },
          ];

          const mockIsAffordable = jest.fn(() => true);
          const mockIsBetOrRaiseExistOnSubsequentActions = jest.fn(() => false);
          const mockGetActivePlayerIndexesAt = jest.fn(() => [2, 0]);
          const mockAddAction = jest.fn();

          playerActions["isAffordable"] = mockIsAffordable;
          playerActions[
            "isBetOrRaiseExistOnSubsequentActions"
          ] = mockIsBetOrRaiseExistOnSubsequentActions;
          playerActions[
            "getActivePlayerIndexesAt"
          ] = mockGetActivePlayerIndexesAt;
          playerActions["addAction"] = mockAddAction;

          playerActions["updateAction"](Street.preflop, 1, {
            type: GameStreetActionType.bet,
            playerIndex: 1,
            betSize: 1,
          });

          expect(mockIsAffordable.mock.calls.length).toBe(1);
          expect(
            mockIsBetOrRaiseExistOnSubsequentActions.mock.calls.length
          ).toBe(1);
          expect(mockGetActivePlayerIndexesAt.mock.calls.length).toBe(1);
          expect(mockAddAction.mock.calls.length).toBe(1);
        });

        it("calls deleteSubsequentActions once property when isBetOrRaiseExistOnSubsequentActions returns false", () => {
          const playerActions = new PlayerActions({
            smallBlindSize: 0,
            playerLength: 3,
            playerStackSizes: [0, 0, 0],
          });

          playerActions["_preflop"] = [
            { type: GameStreetActionType.check, playerIndex: 0, betSize: 0 },
            { type: GameStreetActionType.check, playerIndex: 1, betSize: 0 },
            { type: GameStreetActionType.check, playerIndex: 2, betSize: 0 },
          ];

          const mockIsAffordable = jest.fn(() => false);
          const mockDeleteSubsequentActions = jest.fn();

          playerActions["isAffordable"] = mockIsAffordable;
          playerActions[
            "deleteSubsequentActions"
          ] = mockDeleteSubsequentActions;

          playerActions["updateAction"](Street.preflop, 1, {
            type: GameStreetActionType.bet,
            playerIndex: 1,
            betSize: 1,
          });

          expect(mockIsAffordable.mock.calls.length).toBe(1);
          expect(mockDeleteSubsequentActions.mock.calls.length).toBe(1);
        });
      });
    });

    describe("when the action going to be updated is call", () => {
      describe("when the action chaged to fold", () => {
        it("calls deleteSubsequentActions once", () => {
          const playerActions = new PlayerActions({
            smallBlindSize: 0,
            playerLength: 3,
            playerStackSizes: [0, 0, 0],
          });

          playerActions["_preflop"] = [
            { type: GameStreetActionType.bet, playerIndex: 0, betSize: 2 },
            { type: GameStreetActionType.call, playerIndex: 1, betSize: 2 },
            { type: GameStreetActionType.call, playerIndex: 2, betSize: 2 },
          ];

          const mockDeleteSubsequentActions = jest.fn();

          playerActions[
            "deleteSubsequentActions"
          ] = mockDeleteSubsequentActions;

          playerActions["updateAction"](Street.preflop, 1, {
            type: GameStreetActionType.fold,
            playerIndex: 1,
            betSize: 0,
          });

          expect(mockDeleteSubsequentActions.mock.calls.length).toBe(1);
        });
      });

      describe("when the action chaged to raise", () => {
        it("calls private methods property when isAffordable returns true", () => {
          const playerActions = new PlayerActions({
            smallBlindSize: 0,
            playerLength: 3,
            playerStackSizes: [0, 0, 0],
          });

          playerActions["_preflop"] = [
            { type: GameStreetActionType.bet, playerIndex: 0, betSize: 1 },
            { type: GameStreetActionType.call, playerIndex: 1, betSize: 1 },
            { type: GameStreetActionType.call, playerIndex: 2, betSize: 1 },
          ];

          const mockIsAffordable = jest.fn(() => false);
          const mockDeleteSubsequentActions = jest.fn();

          playerActions["isAffordable"] = mockIsAffordable;
          playerActions[
            "deleteSubsequentActions"
          ] = mockDeleteSubsequentActions;

          playerActions["updateAction"](Street.preflop, 1, {
            type: GameStreetActionType.raise,
            playerIndex: 1,
            betSize: 2,
          });

          expect(mockIsAffordable.mock.calls.length).toBe(1);
          expect(mockDeleteSubsequentActions.mock.calls.length).toBe(1);
        });

        it("calls private methods property when isAffordable returns false", () => {
          const playerActions = new PlayerActions({
            smallBlindSize: 0,
            playerLength: 3,
            playerStackSizes: [0, 0, 0],
          });

          playerActions["_preflop"] = [
            { type: GameStreetActionType.bet, playerIndex: 0, betSize: 1 },
            { type: GameStreetActionType.call, playerIndex: 1, betSize: 1 },
            { type: GameStreetActionType.call, playerIndex: 2, betSize: 1 },
          ];

          const mockIsAffordable = jest.fn(() => true);
          const mockGetActivePlayerIndexesAt = jest.fn(() => [2, 0]);
          const mockAddAction = jest.fn();

          playerActions["isAffordable"] = mockIsAffordable;
          playerActions[
            "getActivePlayerIndexesAt"
          ] = mockGetActivePlayerIndexesAt;
          playerActions["addAction"] = mockAddAction;

          playerActions["updateAction"](Street.preflop, 1, {
            type: GameStreetActionType.raise,
            playerIndex: 1,
            betSize: 2,
          });

          expect(mockIsAffordable.mock.calls.length).toBe(1);
          expect(mockGetActivePlayerIndexesAt.mock.calls.length).toBe(1);
          expect(mockAddAction.mock.calls.length).toBe(1);
        });
      });
    });

    describe("when the action going to be updated is bet", () => {
      describe("when the action chaged to fold", () => {
        it("calls deleteSubsequentActions once", () => {
          const playerActions = new PlayerActions({
            smallBlindSize: 0,
            playerLength: 3,
            playerStackSizes: [0, 0, 0],
          });

          playerActions["_preflop"] = [
            { type: GameStreetActionType.bet, playerIndex: 0, betSize: 2 },
            { type: GameStreetActionType.call, playerIndex: 1, betSize: 2 },
            { type: GameStreetActionType.call, playerIndex: 2, betSize: 2 },
          ];

          const mockDeleteSubsequentActions = jest.fn();

          playerActions[
            "deleteSubsequentActions"
          ] = mockDeleteSubsequentActions;

          playerActions["updateAction"](Street.preflop, 0, {
            type: GameStreetActionType.fold,
            playerIndex: 1,
            betSize: 0,
          });

          expect(mockDeleteSubsequentActions.mock.calls.length).toBe(1);
        });
      });

      describe("when the action chaged to check", () => {
        it("calls private methods property when isBetOrRaiseExistOnSubsequentActions returns true", () => {
          const playerActions = new PlayerActions({
            smallBlindSize: 0,
            playerLength: 3,
            playerStackSizes: [0, 0, 0],
          });

          playerActions["_preflop"] = [
            { type: GameStreetActionType.bet, playerIndex: 0, betSize: 2 },
            { type: GameStreetActionType.call, playerIndex: 1, betSize: 2 },
            { type: GameStreetActionType.call, playerIndex: 2, betSize: 2 },
          ];

          const mockIsBetOrRaiseExistOnSubsequentActions = jest.fn(() => true);

          playerActions[
            "isBetOrRaiseExistOnSubsequentActions"
          ] = mockIsBetOrRaiseExistOnSubsequentActions;

          playerActions["updateAction"](Street.preflop, 0, {
            type: GameStreetActionType.check,
            playerIndex: 0,
            betSize: 0,
          });

          expect(
            mockIsBetOrRaiseExistOnSubsequentActions.mock.calls.length
          ).toBe(1);
        });

        it("calls private methods property when isBetOrRaiseExistOnSubsequentActions returns false", () => {
          const playerActions = new PlayerActions({
            smallBlindSize: 0,
            playerLength: 3,
            playerStackSizes: [0, 0, 0],
          });

          playerActions["_preflop"] = [
            { type: GameStreetActionType.check, playerIndex: 0, betSize: 0 },
            { type: GameStreetActionType.bet, playerIndex: 1, betSize: 2 },
            { type: GameStreetActionType.call, playerIndex: 2, betSize: 2 },
          ];

          const mockIsBetOrRaiseExistOnSubsequentActions = jest.fn(() => false);
          const mockGetActivePlayerIndexesAt = jest.fn(() => [1, 2]);
          const mockDeleteAction = jest.fn();

          playerActions[
            "isBetOrRaiseExistOnSubsequentActions"
          ] = mockIsBetOrRaiseExistOnSubsequentActions;
          playerActions[
            "getActivePlayerIndexesAt"
          ] = mockGetActivePlayerIndexesAt;
          playerActions["deleteAction"] = mockDeleteAction;

          playerActions["updateAction"](Street.preflop, 1, {
            type: GameStreetActionType.check,
            playerIndex: 1,
            betSize: 0,
          });

          expect(
            mockIsBetOrRaiseExistOnSubsequentActions.mock.calls.length
          ).toBe(1);
          expect(mockGetActivePlayerIndexesAt.mock.calls.length).toBe(1);
          expect(mockDeleteAction.mock.calls.length).toBe(0);
        });
      });
    });

    describe("when the action going to be updated is raise", () => {
      describe("when the action chaged to fold", () => {
        it("calls deleteSubsequentActions once", () => {
          const playerActions = new PlayerActions({
            smallBlindSize: 0,
            playerLength: 3,
            playerStackSizes: [0, 0, 0],
          });

          playerActions["_preflop"] = [
            { type: GameStreetActionType.bet, playerIndex: 0, betSize: 2 },
            { type: GameStreetActionType.raise, playerIndex: 1, betSize: 4 },
            { type: GameStreetActionType.call, playerIndex: 2, betSize: 4 },
            { type: GameStreetActionType.call, playerIndex: 0, betSize: 4 },
          ];

          const mockDeleteSubsequentActions = jest.fn();

          playerActions[
            "deleteSubsequentActions"
          ] = mockDeleteSubsequentActions;

          playerActions["updateAction"](Street.preflop, 1, {
            type: GameStreetActionType.fold,
            playerIndex: 1,
            betSize: 0,
          });

          expect(mockDeleteSubsequentActions.mock.calls.length).toBe(1);
        });
      });

      describe("when the action chaged to call", () => {
        it("calls private methods property when isAffordable returns true", () => {
          const playerActions = new PlayerActions({
            smallBlindSize: 0,
            playerLength: 3,
            playerStackSizes: [0, 0, 0],
          });

          playerActions["_preflop"] = [
            { type: GameStreetActionType.bet, playerIndex: 0, betSize: 2 },
            { type: GameStreetActionType.raise, playerIndex: 1, betSize: 4 },
            { type: GameStreetActionType.call, playerIndex: 2, betSize: 4 },
          ];

          const mockIsBetOrRaiseExistOnSubsequentActions = jest.fn(() => true);

          playerActions[
            "isBetOrRaiseExistOnSubsequentActions"
          ] = mockIsBetOrRaiseExistOnSubsequentActions;

          playerActions["updateAction"](Street.preflop, 1, {
            type: GameStreetActionType.call,
            playerIndex: 1,
            betSize: 2,
          });

          expect(
            mockIsBetOrRaiseExistOnSubsequentActions.mock.calls.length
          ).toBe(1);
        });

        it("calls private methods property when isAffordable returns false", () => {
          const playerActions = new PlayerActions({
            smallBlindSize: 0,
            playerLength: 3,
            playerStackSizes: [0, 0, 0],
          });

          playerActions["_preflop"] = [
            { type: GameStreetActionType.bet, playerIndex: 0, betSize: 2 },
            { type: GameStreetActionType.raise, playerIndex: 1, betSize: 4 },
            { type: GameStreetActionType.call, playerIndex: 2, betSize: 4 },
            { type: GameStreetActionType.call, playerIndex: 0, betSize: 4 },
          ];

          const mockIsBetOrRaiseExistOnSubsequentActions = jest.fn(() => false);
          const mockGetActivePlayerIndexesAt = jest.fn(() => [2, 0]);
          const mockDeleteAction = jest.fn();

          playerActions[
            "isBetOrRaiseExistOnSubsequentActions"
          ] = mockIsBetOrRaiseExistOnSubsequentActions;
          playerActions[
            "getActivePlayerIndexesAt"
          ] = mockGetActivePlayerIndexesAt;
          playerActions["deleteAction"] = mockDeleteAction;

          playerActions["updateAction"](Street.preflop, 1, {
            type: GameStreetActionType.call,
            playerIndex: 1,
            betSize: 2,
          });

          expect(
            mockIsBetOrRaiseExistOnSubsequentActions.mock.calls.length
          ).toBe(1);
          expect(mockGetActivePlayerIndexesAt.mock.calls.length).toBe(1);
          expect(mockDeleteAction.mock.calls.length).toBe(1);
          expect(mockDeleteAction.mock.calls[0][0]).toBe(Street.preflop);
          expect(mockDeleteAction.mock.calls[0][1]).toBe(3);
        });
      });
    });
  });

  describe("getPreflopActions()", () => {
    it("returns preflop actions properly when smallBlindSize is 0.5", () => {
      const playerActions = new PlayerActions({
        smallBlindSize: 0.5,
        playerLength: 2,
        playerStackSizes: [0, 0],
      });
      playerActions["getPreflopActions"]();

      expect(playerActions.preflop).toEqual([
        { type: GameStreetActionType.fold, playerIndex: 0, betSize: 0.5 },
        { type: GameStreetActionType.fold, playerIndex: 1, betSize: 1 },
      ]);
    });

    it("returns preflop actions properly when playerLength is 2", () => {
      const playerActions = new PlayerActions({
        smallBlindSize: 0,
        playerLength: 2,
        playerStackSizes: [0, 0],
      });
      playerActions["getPreflopActions"]();

      expect(playerActions.preflop).toEqual([
        { type: GameStreetActionType.fold, playerIndex: 0, betSize: 0 },
        { type: GameStreetActionType.fold, playerIndex: 1, betSize: 1 },
      ]);
    });

    it("returns preflop actions properly when playerLength is 10 and smallBlindSize is 0.2", () => {
      const playerActions = new PlayerActions({
        smallBlindSize: 0.2,
        playerLength: 10,
        playerStackSizes: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      });
      playerActions["getPreflopActions"]();

      expect(playerActions.preflop).toEqual([
        { type: GameStreetActionType.fold, playerIndex: 0, betSize: 0.2 },
        { type: GameStreetActionType.fold, playerIndex: 1, betSize: 1 },
        { type: GameStreetActionType.fold, playerIndex: 2, betSize: 0 },
        { type: GameStreetActionType.fold, playerIndex: 3, betSize: 0 },
        { type: GameStreetActionType.fold, playerIndex: 4, betSize: 0 },
        { type: GameStreetActionType.fold, playerIndex: 5, betSize: 0 },
        { type: GameStreetActionType.fold, playerIndex: 6, betSize: 0 },
        { type: GameStreetActionType.fold, playerIndex: 7, betSize: 0 },
        { type: GameStreetActionType.fold, playerIndex: 8, betSize: 0 },
        { type: GameStreetActionType.fold, playerIndex: 9, betSize: 0 },
      ]);
    });
  });

  describe("isBetOrRaiseExistOnSubsequentActions(street: Street, currentIndex: number)", () => {
    it("returns true", () => {
      const playerActions = new PlayerActions({
        smallBlindSize: 0.2,
        playerLength: 4,
        playerStackSizes: [0, 0, 0, 0],
      });

      playerActions["_preflop"] = [
        { type: GameStreetActionType.bet, playerIndex: 0, betSize: 1 },
        { type: GameStreetActionType.call, playerIndex: 1, betSize: 1 },
        { type: GameStreetActionType.call, playerIndex: 2, betSize: 1 },
        { type: GameStreetActionType.raise, playerIndex: 3, betSize: 3 },
        { type: GameStreetActionType.call, playerIndex: 0, betSize: 3 },
        { type: GameStreetActionType.raise, playerIndex: 1, betSize: 6 },
      ];

      expect(
        playerActions["isBetOrRaiseExistOnSubsequentActions"](Street.preflop, 3)
      ).toBe(true);
    });

    it("returns false", () => {
      const playerActions = new PlayerActions({
        smallBlindSize: 0.2,
        playerLength: 4,
        playerStackSizes: [0, 0, 0, 0],
      });

      playerActions["_preflop"] = [
        { type: GameStreetActionType.bet, playerIndex: 0, betSize: 1 },
        { type: GameStreetActionType.call, playerIndex: 1, betSize: 1 },
        { type: GameStreetActionType.call, playerIndex: 2, betSize: 1 },
        { type: GameStreetActionType.raise, playerIndex: 3, betSize: 3 },
        { type: GameStreetActionType.fold, playerIndex: 0, betSize: 0 },
        { type: GameStreetActionType.fold, playerIndex: 1, betSize: 0 },
        { type: GameStreetActionType.fold, playerIndex: 2, betSize: 0 },
      ];

      expect(
        playerActions["isBetOrRaiseExistOnSubsequentActions"](Street.preflop, 3)
      ).toBe(false);
    });
  });

  describe("isAffordable(betSize: number, playerIndex: number)", () => {
    it("returns true when betSize is affordable", () => {
      const playerActions = new PlayerActions({
        smallBlindSize: 0.2,
        playerLength: 2,
        playerStackSizes: [0, 0],
      });

      playerActions["playerStackSizes"] = [100, 0];

      expect(playerActions["isAffordable"](20, 0)).toBe(true);
    });

    it("returns true when betSize is same size of the player's stack size", () => {
      const playerActions = new PlayerActions({
        smallBlindSize: 0.2,
        playerLength: 2,
        playerStackSizes: [0, 0],
      });

      playerActions["playerStackSizes"] = [20, 0];

      expect(playerActions["isAffordable"](20, 0)).toBe(true);
    });

    it("returns false when betSize isn't affordable", () => {
      const playerActions = new PlayerActions({
        smallBlindSize: 0.2,
        playerLength: 2,
        playerStackSizes: [0, 0],
      });

      playerActions["playerStackSizes"] = [10, 0];

      expect(playerActions["isAffordable"](20, 0)).toBe(false);
    });
  });

  describe("getExpectedNextActionIndex(street: Street, currentIndex: number)", () => {
    it("returns ExpectedNextActionIndex of the player", () => {
      const playerActions = new PlayerActions({
        smallBlindSize: 0.2,
        playerLength: 5,
        playerStackSizes: [0, 0, 0, 0, 0],
      });

      const originalGetActivePlayerIndexesAt =
        playerActions["getActivePlayerIndexesAt"];

      playerActions["getActivePlayerIndexesAt"] = jest.fn(() => [3, 4, 0, 1]);

      playerActions["_preflop"] = [
        { type: GameStreetActionType.bet, playerIndex: 0, betSize: 2 },
        { type: GameStreetActionType.raise, playerIndex: 1, betSize: 3 },
        { type: GameStreetActionType.call, playerIndex: 2, betSize: 3 },
        { type: GameStreetActionType.call, playerIndex: 3, betSize: 3 },
        { type: GameStreetActionType.raise, playerIndex: 4, betSize: 6 },
        { type: GameStreetActionType.call, playerIndex: 0, betSize: 6 },
        { type: GameStreetActionType.call, playerIndex: 1, betSize: 6 },
        { type: GameStreetActionType.call, playerIndex: 3, betSize: 6 },
      ];

      expect(
        playerActions["getExpectedNextActionIndex"](Street.preflop, 2)
      ).toBe(7);

      playerActions[
        "getActivePlayerIndexesAt"
      ] = originalGetActivePlayerIndexesAt;
    });

    it("returns -1", () => {
      const playerActions = new PlayerActions({
        smallBlindSize: 0.2,
        playerLength: 5,
        playerStackSizes: [0, 0, 0, 0, 0],
      });

      const originalGetActivePlayerIndexesAt =
        playerActions["getActivePlayerIndexesAt"];

      playerActions["getActivePlayerIndexesAt"] = jest.fn(() => [1, 2, 3, 4]);

      playerActions["_preflop"] = [
        { type: GameStreetActionType.bet, playerIndex: 0, betSize: 2 },
        { type: GameStreetActionType.raise, playerIndex: 1, betSize: 3 },
        { type: GameStreetActionType.call, playerIndex: 2, betSize: 3 },
        { type: GameStreetActionType.call, playerIndex: 3, betSize: 3 },
        { type: GameStreetActionType.raise, playerIndex: 4, betSize: 6 },
        { type: GameStreetActionType.call, playerIndex: 0, betSize: 6 },
        { type: GameStreetActionType.call, playerIndex: 1, betSize: 6 },
        { type: GameStreetActionType.call, playerIndex: 2, betSize: 6 },
        { type: GameStreetActionType.call, playerIndex: 3, betSize: 6 },
      ];

      expect(
        playerActions["getExpectedNextActionIndex"](Street.preflop, 5)
      ).toBe(-1);

      playerActions[
        "getActivePlayerIndexesAt"
      ] = originalGetActivePlayerIndexesAt;
    });
  });

  describe("getActivePlayerIndexesAt(street: Street, currentIndex: number)", () => {
    it("returns array of one playerIndex when game is done at preflop", () => {
      const playerActions = new PlayerActions({
        smallBlindSize: 0,
        playerLength: 4,
        playerStackSizes: [0, 0, 0, 0],
      });

      const originalGetInitialActivePlayerIndexesAt =
        playerActions["getInitialActivePlayerIndexesAt"];
      playerActions["getInitialActivePlayerIndexesAt"] = jest.fn(() => [
        0,
        1,
        2,
        3,
      ]);

      playerActions["_preflop"] = [
        { type: GameStreetActionType.bet, playerIndex: 0, betSize: 2 },
        { type: GameStreetActionType.fold, playerIndex: 1, betSize: 1 },
        { type: GameStreetActionType.fold, playerIndex: 2, betSize: 0 },
        { type: GameStreetActionType.fold, playerIndex: 3, betSize: 0 },
      ];

      expect(
        playerActions["getActivePlayerIndexesAt"](Street.preflop, 3)
      ).toEqual([0]);

      playerActions[
        "getInitialActivePlayerIndexesAt"
      ] = originalGetInitialActivePlayerIndexesAt;
    });

    it("returns array of playerIndexes who is still active at the street", () => {
      const playerActions = new PlayerActions({
        smallBlindSize: 0,
        playerLength: 4,
        playerStackSizes: [0, 0, 0, 0],
      });

      const originalGetInitialActivePlayerIndexesAt =
        playerActions["getInitialActivePlayerIndexesAt"];
      playerActions["getInitialActivePlayerIndexesAt"] = jest.fn(() => [
        0,
        1,
        2,
        3,
      ]);

      playerActions["_preflop"] = [
        { type: GameStreetActionType.bet, playerIndex: 0, betSize: 2 },
        { type: GameStreetActionType.call, playerIndex: 1, betSize: 2 },
        { type: GameStreetActionType.call, playerIndex: 2, betSize: 2 },
        { type: GameStreetActionType.fold, playerIndex: 3, betSize: 0 },
      ];

      expect(
        playerActions["getActivePlayerIndexesAt"](Street.preflop, 3)
      ).toEqual([0, 1, 2]);

      playerActions[
        "getInitialActivePlayerIndexesAt"
      ] = originalGetInitialActivePlayerIndexesAt;
    });

    it("returns array of playerIndexes who is still active at the street when one player fold before the street", () => {
      const playerActions = new PlayerActions({
        smallBlindSize: 0,
        playerLength: 5,
        playerStackSizes: [0, 0, 0, 0, 0],
      });

      const originalGetInitialActivePlayerIndexesAt =
        playerActions["getInitialActivePlayerIndexesAt"];
      playerActions["getInitialActivePlayerIndexesAt"] = jest.fn(() => [
        0,
        2,
        3,
        4,
      ]);

      playerActions["_turn"] = [
        { type: GameStreetActionType.bet, playerIndex: 0, betSize: 1 },
        { type: GameStreetActionType.call, playerIndex: 2, betSize: 1 },
        { type: GameStreetActionType.call, playerIndex: 3, betSize: 1 },
        { type: GameStreetActionType.raise, playerIndex: 4, betSize: 2 },
        { type: GameStreetActionType.call, playerIndex: 0, betSize: 2 },
        { type: GameStreetActionType.fold, playerIndex: 2, betSize: 1 },
        { type: GameStreetActionType.raise, playerIndex: 3, betSize: 3 },
        { type: GameStreetActionType.fold, playerIndex: 4, betSize: 2 },
        { type: GameStreetActionType.fold, playerIndex: 0, betSize: 2 },
      ];

      expect(
        playerActions["getActivePlayerIndexesAt"](Street.turn, 6)
      ).toEqual([4, 0]);

      playerActions[
        "getInitialActivePlayerIndexesAt"
      ] = originalGetInitialActivePlayerIndexesAt;
    });

    it("returns array of playerIndexes who is still active at the street when some players fold before the street", () => {
      const playerActions = new PlayerActions({
        smallBlindSize: 0,
        playerLength: 8,
        playerStackSizes: [0, 0, 0, 0, 0, 0, 0, 0],
      });

      const originalGetInitialActivePlayerIndexesAt =
        playerActions["getInitialActivePlayerIndexesAt"];
      playerActions["getInitialActivePlayerIndexesAt"] = jest.fn(() => [
        0,
        2,
        3,
        4,
      ]);

      playerActions["_river"] = [
        { type: GameStreetActionType.bet, playerIndex: 0, betSize: 1 },
        { type: GameStreetActionType.call, playerIndex: 2, betSize: 1 },
        { type: GameStreetActionType.call, playerIndex: 3, betSize: 1 },
        { type: GameStreetActionType.raise, playerIndex: 4, betSize: 2 },
        { type: GameStreetActionType.call, playerIndex: 0, betSize: 2 },
        { type: GameStreetActionType.fold, playerIndex: 2, betSize: 1 },
        { type: GameStreetActionType.raise, playerIndex: 3, betSize: 3 },
        { type: GameStreetActionType.fold, playerIndex: 4, betSize: 2 },
        { type: GameStreetActionType.fold, playerIndex: 0, betSize: 2 },
      ];

      expect(
        playerActions["getActivePlayerIndexesAt"](Street.river, 6)
      ).toEqual([4, 0]);

      playerActions[
        "getInitialActivePlayerIndexesAt"
      ] = originalGetInitialActivePlayerIndexesAt;
    });
  });

  describe("getInitialActivePlayerIndexesAt(street: Street)", () => {
    describe("when street is preflop", () => {
      it("returns [0, 1] when playerLength is 2", () => {
        const playerActions = new PlayerActions({
          smallBlindSize: 0.2,
          playerLength: 2,
          playerStackSizes: [0, 0],
        });

        expect(
          playerActions["getInitialActivePlayerIndexesAt"](Street.preflop)
        ).toEqual([0, 1]);
      });

      it("returns [0, 1... 9] when playerLength is 10", () => {
        const playerActions = new PlayerActions({
          smallBlindSize: 0.2,
          playerLength: 10,
          playerStackSizes: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        });

        expect(
          playerActions["getInitialActivePlayerIndexesAt"](Street.preflop)
        ).toEqual([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
      });
    });

    describe("when street is flop", () => {
      it("returns array of one playerIndex when game is done at preflop", () => {
        const playerActions = new PlayerActions({
          smallBlindSize: 0.2,
          playerLength: 4,
          playerStackSizes: [0, 0, 0, 0],
        });

        playerActions["_preflop"] = [
          { type: GameStreetActionType.bet, playerIndex: 0, betSize: 2 },
          { type: GameStreetActionType.fold, playerIndex: 1, betSize: 1 },
          { type: GameStreetActionType.fold, playerIndex: 2, betSize: 0 },
          { type: GameStreetActionType.fold, playerIndex: 3, betSize: 0 },
        ];

        expect(
          playerActions["getInitialActivePlayerIndexesAt"](Street.flop)
        ).toEqual([0]);
      });

      it("returns array of playerIndexes who is still active at the last street", () => {
        const playerActions = new PlayerActions({
          smallBlindSize: 0.2,
          playerLength: 4,
          playerStackSizes: [0, 0, 0, 0],
        });

        playerActions["_preflop"] = [
          { type: GameStreetActionType.bet, playerIndex: 0, betSize: 2 },
          { type: GameStreetActionType.fold, playerIndex: 1, betSize: 1 },
          { type: GameStreetActionType.call, playerIndex: 2, betSize: 2 },
          { type: GameStreetActionType.fold, playerIndex: 3, betSize: 0 },
        ];

        expect(
          playerActions["getInitialActivePlayerIndexesAt"](Street.flop)
        ).toEqual([0, 2]);
      });
    });

    describe("when street is turn", () => {
      it("returns array of one playerIndex when game is done at flop", () => {
        const playerActions = new PlayerActions({
          smallBlindSize: 0.2,
          playerLength: 6,
          playerStackSizes: [0, 0, 0, 0, 0, 0],
        });

        playerActions["_preflop"] = [
          { type: GameStreetActionType.bet, playerIndex: 0, betSize: 2 },
          { type: GameStreetActionType.call, playerIndex: 1, betSize: 2 },
          { type: GameStreetActionType.call, playerIndex: 2, betSize: 2 },
          { type: GameStreetActionType.call, playerIndex: 3, betSize: 2 },
          { type: GameStreetActionType.call, playerIndex: 4, betSize: 2 },
          { type: GameStreetActionType.call, playerIndex: 5, betSize: 2 },
        ];

        playerActions["_flop"] = [
          { type: GameStreetActionType.check, playerIndex: 0, betSize: 0 },
          { type: GameStreetActionType.check, playerIndex: 1, betSize: 0 },
          { type: GameStreetActionType.bet, playerIndex: 2, betSize: 2 },
          { type: GameStreetActionType.fold, playerIndex: 3, betSize: 0 },
          { type: GameStreetActionType.fold, playerIndex: 4, betSize: 0 },
          { type: GameStreetActionType.fold, playerIndex: 5, betSize: 0 },
          { type: GameStreetActionType.fold, playerIndex: 0, betSize: 0 },
          { type: GameStreetActionType.fold, playerIndex: 1, betSize: 0 },
        ];

        expect(
          playerActions["getInitialActivePlayerIndexesAt"](Street.turn)
        ).toEqual([2]);
      });

      it("returns array of playerIndexes who is still active at the last street", () => {
        const playerActions = new PlayerActions({
          smallBlindSize: 0.2,
          playerLength: 6,
          playerStackSizes: [0, 0, 0, 0, 0, 0],
        });

        playerActions["_preflop"] = [
          { type: GameStreetActionType.bet, playerIndex: 0, betSize: 2 },
          { type: GameStreetActionType.call, playerIndex: 1, betSize: 2 },
          { type: GameStreetActionType.call, playerIndex: 2, betSize: 2 },
          { type: GameStreetActionType.call, playerIndex: 3, betSize: 2 },
          { type: GameStreetActionType.call, playerIndex: 4, betSize: 2 },
          { type: GameStreetActionType.call, playerIndex: 5, betSize: 2 },
        ];

        playerActions["_flop"] = [
          { type: GameStreetActionType.check, playerIndex: 0, betSize: 0 },
          { type: GameStreetActionType.check, playerIndex: 1, betSize: 0 },
          { type: GameStreetActionType.bet, playerIndex: 2, betSize: 2 },
          { type: GameStreetActionType.fold, playerIndex: 3, betSize: 0 },
          { type: GameStreetActionType.call, playerIndex: 4, betSize: 2 },
          { type: GameStreetActionType.call, playerIndex: 5, betSize: 2 },
          { type: GameStreetActionType.call, playerIndex: 0, betSize: 2 },
          { type: GameStreetActionType.fold, playerIndex: 1, betSize: 0 },
        ];

        expect(
          playerActions["getInitialActivePlayerIndexesAt"](Street.turn)
        ).toEqual([0, 2, 4, 5]);
      });
    });

    describe("when street is river", () => {
      it("returns array of one playerIndex when game is done at turn", () => {
        const playerActions = new PlayerActions({
          smallBlindSize: 0.2,
          playerLength: 10,
          playerStackSizes: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        });

        playerActions["_preflop"] = [
          { type: GameStreetActionType.bet, playerIndex: 0, betSize: 2 },
          { type: GameStreetActionType.call, playerIndex: 1, betSize: 2 },
          { type: GameStreetActionType.call, playerIndex: 2, betSize: 2 },
          { type: GameStreetActionType.call, playerIndex: 3, betSize: 2 },
          { type: GameStreetActionType.call, playerIndex: 4, betSize: 2 },
          { type: GameStreetActionType.call, playerIndex: 5, betSize: 2 },
          { type: GameStreetActionType.call, playerIndex: 6, betSize: 2 },
          { type: GameStreetActionType.call, playerIndex: 7, betSize: 2 },
          { type: GameStreetActionType.call, playerIndex: 8, betSize: 2 },
          { type: GameStreetActionType.call, playerIndex: 9, betSize: 2 },
        ];

        playerActions["_flop"] = [
          { type: GameStreetActionType.check, playerIndex: 0, betSize: 0 },
          { type: GameStreetActionType.check, playerIndex: 1, betSize: 0 },
          { type: GameStreetActionType.check, playerIndex: 2, betSize: 0 },
          { type: GameStreetActionType.check, playerIndex: 3, betSize: 0 },
          { type: GameStreetActionType.check, playerIndex: 4, betSize: 0 },
          { type: GameStreetActionType.check, playerIndex: 5, betSize: 0 },
          { type: GameStreetActionType.check, playerIndex: 6, betSize: 0 },
          { type: GameStreetActionType.check, playerIndex: 7, betSize: 0 },
          { type: GameStreetActionType.check, playerIndex: 8, betSize: 0 },
          { type: GameStreetActionType.check, playerIndex: 9, betSize: 0 },
        ];

        playerActions["_turn"] = [
          { type: GameStreetActionType.fold, playerIndex: 0, betSize: 0 },
          { type: GameStreetActionType.fold, playerIndex: 1, betSize: 0 },
          { type: GameStreetActionType.fold, playerIndex: 2, betSize: 0 },
          { type: GameStreetActionType.fold, playerIndex: 3, betSize: 0 },
          { type: GameStreetActionType.fold, playerIndex: 4, betSize: 0 },
          { type: GameStreetActionType.fold, playerIndex: 5, betSize: 0 },
          { type: GameStreetActionType.fold, playerIndex: 6, betSize: 0 },
          { type: GameStreetActionType.fold, playerIndex: 7, betSize: 0 },
          { type: GameStreetActionType.fold, playerIndex: 8, betSize: 0 },
          { type: GameStreetActionType.bet, playerIndex: 9, betSize: 1 },
        ];

        expect(
          playerActions["getInitialActivePlayerIndexesAt"](Street.river)
        ).toEqual([9]);
      });

      it("returns array of playerIndexes who is still active at the last street", () => {
        const playerActions = new PlayerActions({
          smallBlindSize: 0.2,
          playerLength: 10,
          playerStackSizes: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        });

        playerActions["_preflop"] = [
          { type: GameStreetActionType.bet, playerIndex: 0, betSize: 2 },
          { type: GameStreetActionType.call, playerIndex: 1, betSize: 2 },
          { type: GameStreetActionType.call, playerIndex: 2, betSize: 2 },
          { type: GameStreetActionType.call, playerIndex: 3, betSize: 2 },
          { type: GameStreetActionType.call, playerIndex: 4, betSize: 2 },
          { type: GameStreetActionType.call, playerIndex: 5, betSize: 2 },
          { type: GameStreetActionType.call, playerIndex: 6, betSize: 2 },
          { type: GameStreetActionType.call, playerIndex: 7, betSize: 2 },
          { type: GameStreetActionType.call, playerIndex: 8, betSize: 2 },
          { type: GameStreetActionType.call, playerIndex: 9, betSize: 2 },
        ];

        playerActions["_flop"] = [
          { type: GameStreetActionType.check, playerIndex: 0, betSize: 0 },
          { type: GameStreetActionType.check, playerIndex: 1, betSize: 0 },
          { type: GameStreetActionType.check, playerIndex: 2, betSize: 0 },
          { type: GameStreetActionType.check, playerIndex: 3, betSize: 0 },
          { type: GameStreetActionType.check, playerIndex: 4, betSize: 0 },
          { type: GameStreetActionType.check, playerIndex: 5, betSize: 0 },
          { type: GameStreetActionType.check, playerIndex: 6, betSize: 0 },
          { type: GameStreetActionType.check, playerIndex: 7, betSize: 0 },
          { type: GameStreetActionType.check, playerIndex: 8, betSize: 0 },
          { type: GameStreetActionType.check, playerIndex: 9, betSize: 0 },
        ];

        playerActions["_turn"] = [
          { type: GameStreetActionType.fold, playerIndex: 0, betSize: 0 },
          { type: GameStreetActionType.fold, playerIndex: 1, betSize: 0 },
          { type: GameStreetActionType.bet, playerIndex: 2, betSize: 1 },
          { type: GameStreetActionType.raise, playerIndex: 3, betSize: 3 },
          { type: GameStreetActionType.fold, playerIndex: 4, betSize: 0 },
          { type: GameStreetActionType.call, playerIndex: 5, betSize: 3 },
          { type: GameStreetActionType.call, playerIndex: 6, betSize: 3 },
          { type: GameStreetActionType.raise, playerIndex: 7, betSize: 6 },
          { type: GameStreetActionType.fold, playerIndex: 8, betSize: 0 },
          { type: GameStreetActionType.call, playerIndex: 9, betSize: 6 },

          { type: GameStreetActionType.fold, playerIndex: 2, betSize: 1 },
          { type: GameStreetActionType.raise, playerIndex: 3, betSize: 12 },
          { type: GameStreetActionType.fold, playerIndex: 5, betSize: 3 },
          { type: GameStreetActionType.call, playerIndex: 6, betSize: 12 },
          { type: GameStreetActionType.call, playerIndex: 7, betSize: 12 },
          { type: GameStreetActionType.call, playerIndex: 9, betSize: 12 },
        ];

        expect(
          playerActions["getInitialActivePlayerIndexesAt"](Street.river)
        ).toEqual([3, 6, 7, 9]);
      });
    });
  });

  describe("getFirstActionIndexOfThePlayerBy(street: Street, playerIndex: number)", () => {
    it("returns firstActionInedex of the player", () => {
      const playerActions = new PlayerActions({
        smallBlindSize: 0.2,
        playerLength: 3,
        playerStackSizes: [0, 0, 0, 0, 0],
      });

      playerActions["_preflop"] = [
        { type: GameStreetActionType.call, playerIndex: 1, betSize: 2 },
        { type: GameStreetActionType.call, playerIndex: 0, betSize: 2 },
        { type: GameStreetActionType.bet, playerIndex: 2, betSize: 2 },
      ];

      playerActions["_flop"] = [
        { type: GameStreetActionType.call, playerIndex: 1, betSize: 2 },
        { type: GameStreetActionType.call, playerIndex: 0, betSize: 2 },
        { type: GameStreetActionType.bet, playerIndex: 2, betSize: 2 },
      ];

      expect(
        playerActions["getFirstActionIndexOfThePlayerBy"](Street.flop, 2)
      ).toBe(2);
    });

    it("returns -1", () => {
      const playerActions = new PlayerActions({
        smallBlindSize: 0.2,
        playerLength: 4,
        playerStackSizes: [0, 0, 0, 0, 0],
      });

      playerActions["_preflop"] = [
        { type: GameStreetActionType.call, playerIndex: 1, betSize: 2 },
        { type: GameStreetActionType.call, playerIndex: 0, betSize: 2 },
        { type: GameStreetActionType.bet, playerIndex: 2, betSize: 2 },
        { type: GameStreetActionType.fold, playerIndex: 3, betSize: 0 },
      ];

      playerActions["_flop"] = [
        { type: GameStreetActionType.call, playerIndex: 1, betSize: 2 },
        { type: GameStreetActionType.call, playerIndex: 0, betSize: 2 },
        { type: GameStreetActionType.bet, playerIndex: 2, betSize: 2 },
      ];

      expect(
        playerActions["getFirstActionIndexOfThePlayerBy"](Street.flop, 3)
      ).toBe(-1);
    });
  });

  describe("getNextStreet(currentStreet: Street)", () => {
    const playerActions = new PlayerActions({
      smallBlindSize: 0.2,
      playerLength: 4,
      playerStackSizes: [0, 0, 0, 0],
    });

    it("returns Street.flop", () => {
      expect(playerActions["getNextStreet"](Street.preflop)).toBe(Street.flop);
    });

    it("returns Street.turn", () => {
      expect(playerActions["getNextStreet"](Street.flop)).toBe(Street.turn);
    });

    it("returns Street.river", () => {
      expect(playerActions["getNextStreet"](Street.turn)).toBe(Street.river);
    });

    it("returns null", () => {
      expect(playerActions["getNextStreet"](Street.river)).toBeNull();
    });
  });

  describe("getLastStreet(currentStreet: Street)", () => {
    const playerActions = new PlayerActions({
      smallBlindSize: 0.2,
      playerLength: 4,
      playerStackSizes: [0, 0, 0, 0],
    });

    it("returns null", () => {
      expect(playerActions["getLastStreet"](Street.preflop)).toBeNull();
    });

    it("returns Street.preflop", () => {
      expect(playerActions["getLastStreet"](Street.flop)).toBe(Street.preflop);
    });

    it("returns Street.flop", () => {
      expect(playerActions["getLastStreet"](Street.turn)).toBe(Street.flop);
    });

    it("returns turn", () => {
      expect(playerActions["getLastStreet"](Street.river)).toBe(Street.turn);
    });
  });
});
