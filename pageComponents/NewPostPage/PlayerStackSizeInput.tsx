import * as React from "react";
import styled from "styled-components";
import BetSizeInput from "@@/components/BetSizeInput";
import getPositionByPlayerAndIndex from "@@/utilities/getPositionByPlayerAndIndex";

interface Props extends React.Attributes {
  playerStackSizes: number[];
  onChange?: (playerIndex: number, stackSize: number) => void;
  className?: string;
  style?: React.CSSProperties;
}

export default function PlayerStackSizeInput({
  playerStackSizes,
  onChange = () => {},
  ...props
}: Props) {
  return (
    <Root {...props}>
      {playerStackSizes.map((playerStackSize, playerIndex) => (
        <PlayerStackSize>
          <Position>
            {`${getPositionByPlayerAndIndex(
              playerStackSizes.length,
              playerIndex
            )}:`}
          </Position>
          <BetSizeInput
            defaultValue={playerStackSize}
            onChange={(_, stackSize) => onChange(playerIndex, stackSize)}
          />
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
  font-size: 16px;
  text-align: right;
`;
