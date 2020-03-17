import * as React from "react";
import styled from "styled-components";

interface Props extends React.Attributes {
  onClick?: React.MouseEventHandler<HTMLElement>;
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
}

export default function Card({ children, ...props }: Props) {
  return <Root {...props}>{children}</Root>;
}

const Root = styled.div<{
  onClick?: React.MouseEventHandler<HTMLElement>;
}>`
  border-radius: 4px;
  box-shadow: 0px 0px 12px #222f3e1f, 0px 12px 24px #222f3e0f;
  display: inline-block;
  min-height: 80px;
  min-width: 80px;
  padding: 8px;
  transition: box-shadow 200ms ease, transform 200ms ease;

  ${onClick =>
    onClick
      ? `
    &:hover {
      cursor: pointer;
      box-shadow: 0px 0px 12px #222f3e3f, 0px 12px 24px #222f3e1f;
      transform: translate3d(0px, -2px, 0px);
    }
`
      : ""}
`;
