import {
  GameStreetAction,
  GameStreetActionType,
} from "../models/GameSituation";
export class PlayerActions {
  constructor({
    smallBlindSize,
    playerLength,
    playerStackSizes,
  }: {
    smallBlindSize: number;
    playerLength: number;
    playerStackSizes: number[];
  }) {
    if (smallBlindSize < 0 || 1 < smallBlindSize)
      throw new Error(
        "smallBlindSize must be bigger than or equal to 0 and smaller than or equal to 1"
      );
    if (playerLength < 2 || 10 < playerLength)
      throw new Error(
        "playerLength must be bigger than or equal to 2 and smaller than or equal to 10"
      );

    this.smallBlindSize = smallBlindSize;
    this.playerLength = playerLength;
    this.playerStackSizes = playerStackSizes;
    this._preflop = this.getPreflopActions();
    this._flop = [];
    this._turn = [];
    this._river = [];
  }

  private smallBlindSize: number;
  private playerLength: number;
  private playerStackSizes: number[];
  private _preflop: GameStreetAction[];
  private _flop: GameStreetAction[];
  private _turn: GameStreetAction[];
  private _river: GameStreetAction[];

  get preflop() {
    return this._preflop;
  }

  get flop() {
    return this._flop;
  }

  get turn() {
    return this._turn;
  }

  get river() {
    return this._river;
  }

  public getNextPlayerActionsBy(
    street: Street,
    index: number,
    gameStreetAction: GameStreetAction
  ): this {
    this.updateAction(street, index, gameStreetAction);

    return Object.create(this);
  }

  private addAction(
    street: Street,
    index: number,
    gameStreetAction: GameStreetAction
  ) {
    if (index < 0 || this[street].length < index) {
      throw new Error(
        "index must be more than or equal to 0 and less than the street length"
      );
    }

    if (index === this[street].length) {
      this[street].push(gameStreetAction);
    } else if (index < this[street].length) {
      this[street].splice(index, 0, gameStreetAction);
    }
  }

  private deleteAction(street: Street, index: number) {
    if (index < 0 || this[street].length <= index) {
      throw new Error(
        "index must be more than or equal to 0 and less than or equal to the street length"
      );
    }

    const { playerIndex, betSize } = this[street][index];
    this.playerStackSizes[playerIndex] =
      this.playerStackSizes[playerIndex] + betSize;

    this[street].splice(index, 1);
  }

  private updateAction(
    street: Street,
    index: number,
    gameStreetAction: GameStreetAction
  ) {
    if (index < 0 || this[street].length <= index) {
      throw new Error(
        "index must be more than or equal to 0 and less than or equal to the street length"
      );
    }

    const { type, playerIndex, betSize } = this[street][index];
    this[street][index] = gameStreetAction;
    this.playerStackSizes[playerIndex] =
      this.playerStackSizes[playerIndex] + betSize - gameStreetAction.betSize;

    if (type === GameStreetActionType.fold) {
      if (gameStreetAction.type === GameStreetActionType.check) {
        if (this.isBetOrRaiseExist(street, index)) {
          this.addAction(street, this.getExpectNextActionIndex(street, index), {
            type: GameStreetActionType.fold,
            playerIndex,
            betSize: 0,
          });
        } else {
          const nextStreet = this.getNextStreet(street);

          if (!nextStreet) {
            this.addAction(
              nextStreet!,
              this.getFirstActionIndexByStreetAndPlayerIndex(
                nextStreet!,
                playerIndex
              ),
              {
                type: GameStreetActionType.fold,
                playerIndex,
                betSize: 0,
              }
            );
          }
        }
      }

      if (
        gameStreetAction.type === GameStreetActionType.call ||
        gameStreetAction.type === GameStreetActionType.bet ||
        gameStreetAction.type === GameStreetActionType.raise
      ) {
        if (this.isAffordable(gameStreetAction.betSize, playerIndex)) {
          if (this.isBetOrRaiseExist(street, index)) {
            this.addAction(
              street,
              this.getExpectNextActionIndex(street, index),
              {
                type: GameStreetActionType.fold,
                playerIndex,
                betSize: 0,
              }
            );
          } else {
            if (
              gameStreetAction.type === GameStreetActionType.bet ||
              gameStreetAction.type === GameStreetActionType.raise
            ) {
              const activePlayerIndexes = this.getActivePlayerIndexesAt(
                street,
                index
              );

              for (let i = 0; i < activePlayerIndexes.length; i++) {
                if (this[street][index + 1 + i] === undefined) {
                  this.addAction(street, index + 1 + i, {
                    type: GameStreetActionType.fold,
                    playerIndex: activePlayerIndexes[i],
                    betSize: 0,
                  });
                }
              }
            }

            const nextStreet = this.getNextStreet(street);

            if (nextStreet) {
              this.addAction(
                street,
                this.getFirstActionIndexByStreetAndPlayerIndex(
                  nextStreet!,
                  playerIndex
                ),
                {
                  type: GameStreetActionType.fold,
                  playerIndex,
                  betSize: 0,
                }
              );
            }
          }
        } else {
          this.deleteActionAndSubsequentActions(street, index, true);
        }
      }
    }

    if (type === GameStreetActionType.check) {
      if (gameStreetAction.type === GameStreetActionType.fold) {
        this.deleteActionAndSubsequentActions(street, index, true);
      }

      if (gameStreetAction.type === GameStreetActionType.bet) {
        if (this.isAffordable(gameStreetAction.betSize, playerIndex)) {
          if (!this.isBetOrRaiseExist(street, index)) {
            const activePlayerIndexes = this.getActivePlayerIndexesAt(
              street,
              index
            );

            for (let i = 0; i < activePlayerIndexes.length; i++) {
              if (this[street][index + 1 + i] === undefined) {
                this.addAction(street, index + 1 + i, {
                  type: GameStreetActionType.fold,
                  playerIndex: activePlayerIndexes[i],
                  betSize: 0,
                });
              }
            }
          }
        } else {
          this.deleteActionAndSubsequentActions(street, index, true);
        }
      }
    }

    if (type === GameStreetActionType.call) {
      if (gameStreetAction.type === GameStreetActionType.fold) {
        this.deleteActionAndSubsequentActions(street, index, true);
      }

      if (gameStreetAction.type === GameStreetActionType.raise) {
        if (this.isAffordable(gameStreetAction.betSize, playerIndex)) {
          const activePlayerIndexes = this.getActivePlayerIndexesAt(
            street,
            index
          );

          for (let i = 0; i < activePlayerIndexes.length; i++) {
            if (this[street][index + 1 + i] === undefined) {
              this.addAction(street, index + 1 + i, {
                type: GameStreetActionType.fold,
                playerIndex: activePlayerIndexes[i],
                betSize: 0,
              });
            }
          }
        } else {
          this.deleteActionAndSubsequentActions(street, index, true);
        }
      }
    }

    if (
      type === GameStreetActionType.bet ||
      type === GameStreetActionType.raise
    ) {
      if (gameStreetAction.type === GameStreetActionType.fold) {
        this.deleteActionAndSubsequentActions(street, index, true);
      }

      if (
        gameStreetAction.type === GameStreetActionType.check ||
        gameStreetAction.type === GameStreetActionType.call
      ) {
        if (!this.isBetOrRaiseExist(street, index)) {
          let lastBetOrRaiseOrFirstActionIndex = 0;

          for (let i = index; 0 <= i; i--) {
            if (
              this[street][i].type === GameStreetActionType.bet ||
              this[street][i].type === GameStreetActionType.raise
            ) {
              lastBetOrRaiseOrFirstActionIndex = i;
            }
          }

          const activePlayerIndexes = this.getActivePlayerIndexesAt(
            street,
            lastBetOrRaiseOrFirstActionIndex
          );

          for (
            let i =
              lastBetOrRaiseOrFirstActionIndex + activePlayerIndexes.length + 1;
            i < this[street].length;
            i++
          ) {
            this.deleteAction(street, i);
          }
        }
      }
    }
  }

  private getPreflopActions() {
    return Array.from({ length: this.playerLength }, (_, playerIndex) => {
      let betSize: number;

      switch (playerIndex) {
        case 0:
          betSize = this.smallBlindSize;

          break;

        case 1:
          betSize = 1;

          break;

        default:
          betSize = 0;

          break;
      }

      return {
        type: GameStreetActionType.fold,
        playerIndex,
        betSize,
      };
    });
  }

  private isBetOrRaiseExist(street: Street, currentIndex: number) {
    for (let i = currentIndex + 1; i < this[street].length; i++) {
      if (
        this[street][i].type === GameStreetActionType.bet ||
        this[street][i].type === GameStreetActionType.raise
      )
        return true;
    }

    return false;
  }

  private isAffordable(betSize: number, playerIndex: number) {
    return !!(betSize <= this.playerStackSizes[playerIndex]);
  }

  private getExpectNextActionIndex(street: Street, currentIndex: number) {
    const activePlayerIndexes = this.getActivePlayerIndexesAt(
      street,
      currentIndex
    );
    const expectNextActionIndex = currentIndex + activePlayerIndexes.length + 1;

    return expectNextActionIndex <= this[street].length
      ? expectNextActionIndex
      : -1;
  }

  private getActivePlayerIndexesAt(street: Street, currentIndex: number) {
    const activePlayerIndexes = this.getInitialActivePlayerIndexesAt(street);

    for (let i = 0; i < currentIndex; i++) {
      if (this[street][i].type === GameStreetActionType.fold) {
        const foldPlayerIndex = activePlayerIndexes.indexOf(
          this[street][i].playerIndex
        );

        activePlayerIndexes.splice(foldPlayerIndex, 1);
      }
    }

    const index = activePlayerIndexes.indexOf(
      this[street][currentIndex].playerIndex
    );

    if (index === 0) {
      return activePlayerIndexes.slice(1);
    }

    if (index === activePlayerIndexes.length - 1) {
      return activePlayerIndexes.slice(0, index);
    }

    return [
      ...activePlayerIndexes.slice(index + 1),
      ...activePlayerIndexes.slice(0, index),
    ];
  }

  private getInitialActivePlayerIndexesAt(street: Street) {
    if (street === Street.preflop)
      return Array.from({ length: this.playerLength }, (_, i) => i);

    const lastStreetActions = this[this.getLastStreet(street)!];
    const initialActivePlayerIndexes: number[] = [];

    for (let i = 0; i < lastStreetActions.length; i++) {
      if (lastStreetActions[i].type === GameStreetActionType.fold) {
        const index = initialActivePlayerIndexes.indexOf(
          lastStreetActions[i].playerIndex
        );

        if (0 <= index) {
          initialActivePlayerIndexes.splice(index, 1);
        }
      } else {
        if (
          !initialActivePlayerIndexes.includes(lastStreetActions[i].playerIndex)
        ) {
          initialActivePlayerIndexes.push(lastStreetActions[i].playerIndex);
        }
      }
    }

    return initialActivePlayerIndexes;
  }

  private getFirstActionIndexByStreetAndPlayerIndex(
    street: Street,
    playerIndex: number
  ) {
    return this[street].findIndex(
      (action) => action.playerIndex === playerIndex
    );
  }

  private deleteActionAndSubsequentActions(
    street: Street,
    currentIndex: number,
    throughGame: boolean
  ) {
    if (this[street].length === 0) return;

    const playerIndex = this[street][currentIndex].playerIndex;

    for (let i = currentIndex + 1; i < this[street].length; i++) {
      if (this[street][i].playerIndex === playerIndex) {
        this.deleteAction(street, i);
        i--;
      }
    }

    if (throughGame) {
      const nextStreet = this.getNextStreet(street);
      if (nextStreet !== null) {
        this.deleteActionAndSubsequentActions(nextStreet, 0, throughGame);
      }
    }
  }

  private getNextStreet(currentStreet: Street): Street | null {
    switch (currentStreet) {
      case Street.preflop:
        return Street.flop;
      case Street.flop:
        return Street.turn;
      case Street.turn:
        return Street.river;
      case Street.river:
        return null;
    }
  }

  private getLastStreet(currentStreet: Street): Street | null {
    switch (currentStreet) {
      case Street.preflop:
        return null;
      case Street.flop:
        return Street.preflop;
      case Street.turn:
        return Street.flop;
      case Street.river:
        return Street.turn;
    }
  }
}

export enum Street {
  preflop = "preflop",
  flop = "flop",
  turn = "turn",
  river = "river",
}
