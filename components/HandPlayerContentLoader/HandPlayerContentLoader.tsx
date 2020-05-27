import * as React from "react";
import styled from "styled-components";
import Button, { ButtonVariant, ButtonSize } from "@@/components/Button";
import { PlayIcon } from "@@/components/Icon";
import SeekBar from "@@/components/SeekBar";

interface Props extends React.Attributes {
  className?: string;
  style?: React.CSSProperties;
}

/**
 * A content loader UI of <HandPlayer>.
 */
export default function HandPlayerContentLoader({ ...props }: Props) {
  return (
    <div {...props}>
      <Padding />

      <Control>
        <PlayButton
          variant={ButtonVariant.primary}
          size={ButtonSize.small}
          disabled
        >
          <PlayIcon /> Play
        </PlayButton>

        <_SeekBar min={0} max={0} value={0} />
      </Control>
    </div>
  );
}

const Padding = styled.div`
  width: 100%;
  padding-top: 45.5%;
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
