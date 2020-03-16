import * as React from "react";
import styled from "styled-components";

interface Props extends React.Attributes {
  onClick?: () => void | undefined;
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
}

export default function Card({ onClick, children, ...props }: Props) {
  const Root = styled.div`
    padding: 8px;
    border-radius: 4px;
    box-shadow: 0px 0px 12px #222f3e1f, 0px 12px 24px #222f3e0f;

    ${onClick
      ? `
        &:hover {
          cursor: pointer;
          box-shadow: 0px 0px 12px #222f3e3f, 0px 12px 24px #222f3e1f;
          transform: translate3d(0px, -2px, 0px);
        }
    `
      : ""}
  `;

  return (
    <Root onClick={onClick} {...props}>
      {children}
    </Root>
  );
}
