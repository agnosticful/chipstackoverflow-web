import { HandActionType } from "./Hand";

export interface HandInputTypeAction {
  type: HandActionType;
  playerIndex: number;
  tableMaxBetSize: number;
  previousBetSize: number;
  betSize: number;
}

// interface Snapshot {
//   tableMaxBetSize: number;
//   playerBetSizes: Map<number, number>;
// }
//
// const snapshots: Snapshot[] = [];
