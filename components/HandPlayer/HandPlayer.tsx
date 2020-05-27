import * as React from "react";
import styled from "styled-components";
import Button, { ButtonVariant, ButtonSize } from "@@/components/Button";
import { PauseIcon, PlayIcon, RotateBackIcon } from "@@/components/Icon";
import PokerTable from "@@/components/PokerTable";
import SeekBar from "@@/components/SeekBar";
import Hand from "@@/models/Hand";

interface Props extends React.Attributes {
  hand: Hand;
  /**
   * see props.heroIndex of <PokerTable>
   */
  heroIndex: number;
  /**
   * the index where to start playing.
   */
  defaultSnapshotIndex?: number;
  /**
   * whether this plays in initial. the default value is true.
   */
  defaultPlaying?: boolean;
  onPlayStateChange?: (isPlaying: boolean) => void;
  onSnapshotIndexChange?: (snapshotIndex: number) => void;
  className?: string;
  style?: React.CSSProperties;
}

/**
 * Write a description here.
 */
export default function PokerTablePlayer({
  hand,
  heroIndex,
  defaultSnapshotIndex = 0,
  defaultPlaying = true,
  onPlayStateChange = () => {},
  onSnapshotIndexChange = () => {},
  ...props
}: Props) {
  const [snapshotIndex, setSnapshotIndex] = React.useState(
    defaultSnapshotIndex
  );
  const [isPlaying, setPlaying] = React.useState(defaultPlaying);
  const [hasFocus, setHaveFocus] = React.useState(false);
  const snapshot = hand.snapshots[snapshotIndex];

  React.useEffect(() => {
    onPlayStateChange(isPlaying);
  }, [isPlaying]);

  React.useEffect(() => {
    onSnapshotIndexChange(snapshotIndex);
  }, [onSnapshotIndexChange, snapshotIndex]);

  React.useEffect(() => {
    if (isPlaying) {
      if (snapshotIndex < hand.snapshots.length - 1) {
        const timeoutId = setTimeout(() => {
          setSnapshotIndex(snapshotIndex + 1);
        }, 1000);

        return () => clearTimeout(timeoutId);
      }

      setPlaying(false);

      return () => {};
    }

    return () => {};
  }, [hand, isPlaying, snapshotIndex]);

  React.useEffect(() => {
    if (hasFocus) {
      const onKeydown = (e: KeyboardEvent) => {
        if (e.keyCode === 37) {
          setPlaying(false);
          setSnapshotIndex((snapshotIndex) => Math.max(0, snapshotIndex - 1));
        }

        if (e.keyCode === 39) {
          setPlaying(false);
          setSnapshotIndex((snapshotIndex) =>
            Math.min(hand.snapshots.length - 1, snapshotIndex + 1)
          );
        }

        if (e.keyCode === 32 || e.keyCode === 13) {
          setPlaying((isPlaying) => !isPlaying);
        }
      };

      window.addEventListener("keydown", onKeydown);

      return () => window.removeEventListener("keydown", onKeydown);
    }

    return () => {};
  }, [hasFocus]);

  let buttonIcon = <PlayIcon />;
  let buttonLabel = "Play";
  let onButtonClick = () => setPlaying(true);

  if (isPlaying) {
    buttonIcon = <PauseIcon />;
    buttonLabel = "Pause";
    onButtonClick = () => setPlaying(false);
  }

  if (snapshotIndex === hand.snapshots.length - 1) {
    buttonIcon = <RotateBackIcon />;
    buttonLabel = "Replay";
    onButtonClick = () => {
      setSnapshotIndex(0);
      setPlaying(true);
    };
  }

  return (
    <Root
      tabIndex={0}
      onFocus={() => setHaveFocus(true)}
      onBlur={() => setHaveFocus(false)}
      {...props}
    >
      <PokerTable
        seatLength={hand.playerLength}
        playerCards={hand.playerCards}
        communityCards={hand.communityCards}
        street={snapshot.street}
        potSize={snapshot.potSize}
        activePlayerIndexes={new Set(snapshot.activePlayerIndexes)}
        playerStackSizes={new Map(snapshot.playerStackSizes)}
        playerActions={new Map(snapshot.playerLastActions)}
        actionPlayerIndex={snapshot.actionPlayerIndex}
        heroIndex={heroIndex}
        {...props}
      />

      <Control>
        <PlayButton
          variant={ButtonVariant.primary}
          size={ButtonSize.small}
          onClick={onButtonClick}
        >
          {buttonIcon} {buttonLabel}
        </PlayButton>

        <_SeekBar
          min={0}
          max={hand.snapshots.length - 1}
          value={snapshotIndex}
          onChange={(value) => {
            setPlaying(false);
            setSnapshotIndex(value);
          }}
        />
      </Control>
    </Root>
  );
}

const Root = styled.div`
  outline: none;
`;

const Control = styled.div`
  display: grid;
  grid-template-columns: auto 1fr;
  grid-template-areas: "play-button seek-bar";
  column-gap: 16px;
  align-items: center;
`;

const PlayButton = styled(Button)`
  grid-area: play-button;
`;

const _SeekBar = styled(SeekBar)`
  grid-area: seek-bar;
`;
