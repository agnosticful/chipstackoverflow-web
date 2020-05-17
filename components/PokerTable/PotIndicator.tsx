import Numeral from "numeral";
import * as React from "react";
import styled from "styled-components";
import Street from "./Street";

interface Props extends React.Attributes {
  street: Street;
  potSize: number;
  className?: string;
  style?: React.CSSProperties;
}

export default function PotIndicator({ street, potSize, ...props }: Props) {
  return (
    <Root {...props}>
      <StreetLabel>{STREET_TEXT[street]}</StreetLabel>

      <PotSize>{Numeral(potSize).format("0.0a")} BB</PotSize>
    </Root>
  );
}

const STREET_TEXT = {
  [Street.preflop]: "Preflop",
  [Street.flop]: "Flop",
  [Street.turn]: "Turn",
  [Street.river]: "River",
  [Street.showdown]: "Showdown",
};

const Root = styled.div`
  box-sizing: border-box;
  display: grid;
  grid-template-areas: "street pot-size";
  background-color: white;
  border: 1px #0f151c solid;
  border-radius: 9999px;
  font-family: Rubik;
  font-size: calc(16px * var(--table-scale));
`;

const StreetLabel = styled.div`
  grid-area: street;
  padding: calc(6px * var(--table-scale)) calc(12px * var(--table-scale));
  background-color: #0f151c;
  border-radius: 9999px;
  color: white;
`;

const PotSize = styled.div`
  grid-area: pot-size;
  padding: calc(6px * var(--table-scale)) calc(12px * var(--table-scale));
  padding-left: calc(6px * var(--table-scale));
  color: #0f151c;
`;
