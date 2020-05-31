import * as React from "react";
import ContentLoader from "react-content-loader";
import styled from "styled-components";

interface Props extends React.Attributes {
  value?: string;
  loading?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

export default function PostTitle({ value, loading = false, ...props }: Props) {
  if (loading) {
    return (
      <Loader {...props}>
        <rect />
      </Loader>
    );
  }

  if (!value) {
    // not found を出すべき
    throw new Error();
  }

  return <Root {...props}>{value}</Root>;
}

const Root = styled.h1`
  margin: 0;
  color: #0f151c;
  font-size: 40px;
`;

const Loader = styled(ContentLoader)`
  width: 100%;
  height: 40px;

  rect {
    width: 70%;
    height: 40px;
  }
`;
