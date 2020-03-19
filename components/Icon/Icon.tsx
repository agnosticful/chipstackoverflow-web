import * as React from "react";
import styled from "styled-components";

interface Props extends React.Attributes {
  className?: string;
  style?: React.CSSProperties;
}

export function SignOutIcon(props: Props) {
  return (
    <Root xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {...props}>
      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
      <polyline points="16 17 21 12 16 7"></polyline>
      <line x1="21" y1="12" x2="9" y2="12"></line>
    </Root>
  );
}

const Root = styled.svg`
  width: 24px;
  height: 24px;
  fill: none;
  stroke: currentColor;
  stroke-width: 1.5px;
  stroke-linecap: round;
  stroke-linejoin: round;
  transition: width 200ms ease, height 200ms ease;
`;
