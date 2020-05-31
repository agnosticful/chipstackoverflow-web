import * as React from "react";
import styled from "styled-components";
import HandPlayer from "@@/components/HandPlayer";
import HandPlayerContentLoader from "@@/components/HandPlayerContentLoader";
import Hand from "@@/models/Hand";

interface Props extends React.Attributes {
  hand?: Hand;
  heroIndex?: number;
  defaultSnapshotIndex?: number;
  loading?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

export default function HandPlayerSection({
  hand,
  heroIndex,
  defaultSnapshotIndex,
  loading = false,
  ...props
}: Props) {
  let player = <HandPlayerContentLoader />;

  if (!loading) {
    if (
      !hand ||
      heroIndex === undefined ||
      defaultSnapshotIndex === undefined
    ) {
      throw new Error();
    }

    player = (
      <HandPlayer
        hand={hand}
        heroIndex={heroIndex}
        defaultSnapshotIndex={defaultSnapshotIndex}
      />
    );
  }

  return <Root {...props}>{player}</Root>;
}

const Root = styled.div`
  margin-left: calc((100vw - 100%) / -2);
  margin-right: calc((100vw - 100%) / -2);
  padding: 32px calc((100vw - 100%) / 2);
  background: #f8fafa;
`;
