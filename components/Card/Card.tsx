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
  display: block;
  border-radius: 4px;
  box-shadow: 0px 0px 12px #222f3e1f, 0px 12px 24px #222f3e0f;
  cursor: pointer;
  transition: box-shadow 200ms ease, transform 200ms ease;

  ${({ onClick }) =>
    onClick
      ? `
      &:hover {
        box-shadow: 0px 0px 12px #222f3e3f, 0px 12px 24px #222f3e1f;
        transform: translate3d(0px, -2px, 0px);
      }`
      : ""}
`;
