import Numeral from "numeral";
import * as React from "react";
import styled from "styled-components";
import LandscapePlayingCard from "@@/components/LandscapePlayingCard";
import { HandSnapshotActionType } from "@@/models/Hand";
import PlayingCard from "@@/models/PlayingCard";

interface Props extends React.Attributes {
  position: string;
  stackSize: number;
  cards?: [PlayingCard, PlayingCard];
  action?: { type: HandSnapshotActionType; betSize: number };
  highlighted?: boolean;
  showCards?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

export default function Player({
  position,
  stackSize,
  cards,
  action,
  highlighted = false,
  showCards = false,
  ...props
}: Props) {
  return (
    <Root highlighted={highlighted} {...props}>
      <Cards>
        {cards ? (
          <>
            <LandscapePlayingCard
              rank={showCards ? cards[0].rank : undefined}
              suit={showCards ? cards[0].suit : undefined}
            />

            <LandscapePlayingCard
              rank={showCards ? cards[1].rank : undefined}
              suit={showCards ? cards[1].suit : undefined}
            />
          </>
        ) : null}
      </Cards>

      <Position>{position}</Position>

      {action ? (
        <ActionAndBetSize>
          {action.type ? ACTION_LABEL[action.type] : null}
          {action.type === HandSnapshotActionType.fold
            ? null
            : ` ${Numeral(action.betSize).format("0.0a")} BB`}
        </ActionAndBetSize>
      ) : null}

      <StackSize>{Numeral(stackSize).format("0.0a")} BB</StackSize>
    </Root>
  );
}

const ACTION_LABEL: Record<HandSnapshotActionType, string> = {
  [HandSnapshotActionType.forcedBet]: "",
  [HandSnapshotActionType.fold]: "Fold",
  [HandSnapshotActionType.check]: "Check",
  [HandSnapshotActionType.call]: "Call to",
  [HandSnapshotActionType.bet]: "Bet",
  [HandSnapshotActionType.raise]: "Raise",
  [HandSnapshotActionType.acquirePot]: "Won",
};

const Root = styled.div<{ highlighted: boolean }>`
  --background-color: ${({ highlighted }) =>
    highlighted ? "#0f151c" : "white"};
  --foreground-color: ${({ highlighted }) =>
    highlighted ? "white" : "#0f151c"};
  --secondary-color: ${({ highlighted }) =>
    highlighted ? "#c8d6e5" : "#576574"};
  --foreground-font-weight: ${({ highlighted }) =>
    highlighted ? "bold" : "normal"};
  display: grid;
  grid-template-areas: "cards cards position" "action-and-bet-size action-and-bet-size stack-size";
  grid-template-columns:
    auto
    minmax(calc(80px * var(--table-scale)), auto)
    minmax(calc(80px * var(--table-scale)), auto);
  justify-items: center;
  row-gap: calc(8px * var(--table-scale));
  padding: calc(8px * var(--table-scale)) calc(16px * var(--table-scale));
  background: var(--background-color);
  border-radius: calc(8px * var(--table-scale));
  box-shadow: 0px 0px 12px #222f3e1f, 0px 12px 24px #222f3e0f;
  font-family: Rubik;
  font-size: calc(14px * var(--table-scale));
`;

const Cards = styled.div`
  grid-area: cards;
  display: flex;
  align-items: flex-end;
  width: calc(48px * var(--table-scale) * 2 + 4px * var(--table-scale));
  margin-top: calc(-24px * var(--table-scale));
  margin-left: calc(-8px * var(--table-scale));

  & > * {
    width: calc(48px * var(--table-scale));

    &:nth-of-type(n + 2) {
      margin-left: calc(4px * var(--table-scale));
    }
  }
`;

const Position = styled.div`
  grid-area: position;
  justify-self: flex-end;
  color: var(--secondary-color);
`;

const ActionAndBetSize = styled.div`
  grid-area: action-and-bet-size;
  width: calc(120px * var(--table-scale));
  color: var(--foreground-color);
  font-weight: var(--foreground-font-weight);
`;

const StackSize = styled.div`
  grid-area: stack-size;
  width: calc(76px * var(--table-scale));
  color: var(--secondary-color);
  text-align: end;
`;
