import * as React from "react";
import styled from "styled-components";

interface Props extends React.Attributes {
  src?: string;
  className?: string;
  style?: React.CSSProperties;
}

/**
 * Shows an image in a circle.
 */
export default function Avatar({ src, ...props }: Props) {
  return <Root src={src} {...props} />;
}

const Root = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
`;
