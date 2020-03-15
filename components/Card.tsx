import * as React from 'react';
import styled from 'styled-components';

interface Props extends React.Attributes {
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
  onClick?: () => void;
  hoverable?: boolean;
}

export default function Card({ children, onClick, hoverable, ...props }: Props) {
  const CardDiv = styled.div`
    margin: 16px;
    padding: 8px;

    border: 1px solid #cccccc;
    border-radius: 4px;
    box-shadow: 0px 0px 4px 2px #969696;

    ${hoverable
      ? `
        &:hover {
          cursor: pointer;
          box-shadow: 0px 0px 8px 4px #969696;
        }
    `
      : ''}
  `;

  return (
    <CardDiv onClick={onClick} {...props}>
      {children}
    </CardDiv>
  );
}
