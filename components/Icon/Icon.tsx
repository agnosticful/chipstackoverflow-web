import * as React from "react";
import styled from "styled-components";

interface Props extends React.Attributes {
  className?: string;
  style?: React.CSSProperties;
}

export function ChevronDownIcon(props: Props) {
  return (
    <Root xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {...props}>
      <polyline points="6 9 12 15 18 9" />
    </Root>
  );
}

export function LoadingIcon(props: Props) {
  return (
    <LoadingIconRoot
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      {...props}
    >
      <line x1="12" y1="2" x2="12" y2="6"></line>
      <line x1="12" y1="18" x2="12" y2="22"></line>
      <line x1="4.93" y1="4.93" x2="7.76" y2="7.76"></line>
      <line x1="16.24" y1="16.24" x2="19.07" y2="19.07"></line>
      <line x1="2" y1="12" x2="6" y2="12"></line>
      <line x1="18" y1="12" x2="22" y2="12"></line>
      <line x1="4.93" y1="19.07" x2="7.76" y2="16.24"></line>
      <line x1="16.24" y1="7.76" x2="19.07" y2="4.93"></line>
    </LoadingIconRoot>
  );
}

export function PlusIcon(props: Props) {
  return (
    <Root xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {...props}>
      <line x1="12" y1="5" x2="12" y2="19"></line>
      <line x1="5" y1="12" x2="19" y2="12"></line>
    </Root>
  );
}

export function SendIcon(props: Props) {
  return (
    <Root xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {...props}>
      <line x1="22" y1="2" x2="11" y2="13" />
      <polygon points="22 2 15 22 11 13 2 9 22 2" />
    </Root>
  );
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

export function ThumbsDownIcon(props: Props) {
  return (
    <Root xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {...props}>
      <path d="M10 15v4a3 3 0 0 0 3 3l4-9V2H5.72a2 2 0 0 0-2 1.7l-1.38 9a2 2 0 0 0 2 2.3zm7-13h2.67A2.31 2.31 0 0 1 22 4v7a2.31 2.31 0 0 1-2.33 2H17"></path>
    </Root>
  );
}

export function ThumbsUpIcon(props: Props) {
  return (
    <Root xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {...props}>
      <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"></path>
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

const LoadingIconRoot = styled(Root)`
  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(359deg);
    }
  }

  animation: spin 1000ms linear infinite;
`;
