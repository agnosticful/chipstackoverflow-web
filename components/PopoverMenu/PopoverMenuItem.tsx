import * as React from "react";
import styled from "styled-components";
import PopoverMenuControlContext from "./PopoverMenuControlContext";

interface Props extends React.Attributes {
  /** The icon component that shows on the right */
  icon?: React.ReactNode;
  onClick?: React.MouseEventHandler<HTMLElement>;
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
}

export default function PopoverMenuItem({
  icon,
  onClick = () => undefined,
  children,
  ...props
}: Props) {
  const { close } = React.useContext(PopoverMenuControlContext);
  const _onClick = React.useCallback((e: React.MouseEvent<HTMLElement>) => {
    close();
    onClick(e);
  }, []);

  return (
    <Root hasIcon={false} onClick={_onClick} {...props}>
      {children}

      {icon ? <Icon>{icon}</Icon> : null}
    </Root>
  );
}

const Root = styled.div<{ hasIcon: boolean }>`
  display: grid;
  grid-template-columns: auto auto;
  grid-template-areas: "content icon";
  column-gap: 16px;
  align-items: center;
  height: 48px;
  padding: 0 16px;
  cursor: pointer;
  color: #0f151c;
  font-size: 16px;

  :hover {
    background-color: #f5f6f7;
  }
`;

const Icon = styled.div`
  grid-area: icon;
  justify-self: flex-end;
  width: 20px;
  height: 20px;

  & > * {
    width: 100%;
    height: 100%;
  }
`;
