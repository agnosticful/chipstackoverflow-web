import * as React from "react";
import styled from "styled-components";
import HeadBar from "../../components/HeadBar";
import { MOBILE_MEDIA } from "../../constants/mediaquery";

interface Props extends React.Attributes {
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
}

export default function IndexPage({ children, ...props }: Props) {
  return (
    <Root {...props}>
      <HeadBar />

      <Content>content comes here</Content>
    </Root>
  );
}

const Root = styled.div``;

const Content = styled.section`
  box-sizing: border-box;
  max-width: 1280px;
  min-width: 375px;
  margin: 0 auto;
  padding: 0 128px 128px;

  ${MOBILE_MEDIA} {
    margin: 0;
    padding: 0 16px 64px;
  }
`;
