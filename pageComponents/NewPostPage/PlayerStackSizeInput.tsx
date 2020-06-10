import * as React from "react";
import styled from "styled-components";
import BetSizeInput from "@@/components/BetSizeInput";
import getPositionByPlayerAndIndex from "@@/utilities/getPositionByPlayerAndIndex";

interface Props extends React.Attributes {
  playerStackSizes: number[];
  className?: string;
  style?: React.CSSProperties;
}

export default function PlayerStackSizeInput({
  playerStackSizes,
  ...props
}: Props) {
  return (
    <Root {...props}>
      {playerStackSizes.map((playerStackSize, index) => (
        <PlayerStackSize>
          <Position>
            {`${getPositionByPlayerAndIndex(playerStackSizes.length, index)}:`}
          </Position>
          <BetSizeInput defaultValue={playerStackSize} />
        </PlayerStackSize>
      ))}
    </Root>
  );
}

const Root = styled.div`
  & > div {
    margin-bottom: 16px;
  }

  & > div:last-child {
    margin-bottom: 0;
  }
`;

const PlayerStackSize = styled.div`
  display: flex;
  align-items: center;
`;

const Position = styled.div`
  width: 50px;
  margin-right: 8px;
  font-size: 20px;
  text-align: right;
`;
