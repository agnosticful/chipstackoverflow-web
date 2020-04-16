import * as React from "react";
import { GameStreetActionType } from "../models/GameSituation";

export default function useCreatePost() {
  const [preflop, setPreflop] = React.useState([
    {
      position: "UTG",
      type: GameStreetActionType.fold,
      playerIndex: 2,
      betSize: 0,
      tableMaxBetSize: 0,
      previousBetSize: 0,
    },
    {
      position: "SB",
      type: GameStreetActionType.fold,
      playerIndex: 0,
      betSize: 0,
      tableMaxBetSize: 0,
      previousBetSize: 0,
    },
    {
      position: "BB",
      type: GameStreetActionType.fold,
      playerIndex: 1,
      betSize: 0,
      tableMaxBetSize: 0,
      previousBetSize: 0,
    },
  ]);
  const [flop, setFlop] = React.useState([
    {
      position: "UTG",
      type: GameStreetActionType.fold,
      playerIndex: 0,
      betSize: 0,
      tableMaxBetSize: 0,
      previousBetSize: 0,
    },
    {
      position: "SB",
      type: GameStreetActionType.fold,
      playerIndex: 1,
      betSize: 0,
      tableMaxBetSize: 0,
      previousBetSize: 0,
    },
    {
      position: "BB",
      type: GameStreetActionType.fold,
      playerIndex: 2,
      betSize: 0,
      tableMaxBetSize: 0,
      previousBetSize: 0,
    },
  ]);
  const [turn, setTurn] = React.useState([
    {
      position: "UTG",
      type: GameStreetActionType.fold,
      playerIndex: 0,
      betSize: 0,
      tableMaxBetSize: 0,
      previousBetSize: 0,
    },
    {
      position: "SB",
      type: GameStreetActionType.fold,
      playerIndex: 1,
      betSize: 0,
      tableMaxBetSize: 0,
      previousBetSize: 0,
    },
    {
      position: "BB",
      type: GameStreetActionType.fold,
      playerIndex: 2,
      betSize: 0,
      tableMaxBetSize: 0,
      previousBetSize: 0,
    },
  ]);
  const [river, setRiver] = React.useState([
    {
      position: "UTG",
      type: GameStreetActionType.fold,
      playerIndex: 0,
      betSize: 0,
      tableMaxBetSize: 0,
      previousBetSize: 0,
    },
    {
      position: "SB",
      type: GameStreetActionType.fold,
      playerIndex: 1,
      betSize: 0,
      tableMaxBetSize: 0,
      previousBetSize: 0,
    },
    {
      position: "BB",
      type: GameStreetActionType.fold,
      playerIndex: 2,
      betSize: 0,
      tableMaxBetSize: 0,
      previousBetSize: 0,
    },
  ]);
  const [comunityCards, setComunityCards] = React.useState({
    flop: {
      left: undefined,
      center: undefined,
      right: undefined,
    },
    turn: undefined,
    river: undefined,
  });
  const [showdown, setShowdown] = React.useState([
    { position: "UTG", left: undefined, right: undefined },
    { position: "SB", left: undefined, right: undefined },
    { position: "BB", left: undefined, right: undefined },
  ]);

  const totalPotSize = React.useMemo(() => {
    return 12;
  }, []);

  return {
    preflop,
    setPreflop,
    flop,
    setFlop,
    turn,
    setTurn,
    river,
    setRiver,
    comunityCards,
    setComunityCards,
    totalPotSize,
    showdown,
    setShowdown,
  };
}
