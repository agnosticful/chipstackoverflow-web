import * as React from "react";
import styled from "styled-components";

interface Props extends React.Attributes {
  src?: string;
  className?: string;
  style?: React.CSSProperties;
}

/**
 * Write the description for this component here.
 */
export default function Avatar({ src, ...props }: Props) {
  return <Root src={src} {...props} />;
}

const Root = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
`;
