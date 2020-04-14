import * as React from "react";
import styled from "styled-components";
import HeadBar from "../../components/HeadBar";
import FootBar from "../../components/FootBar";
import { MOBILE_MEDIA } from "../../constants/mediaquery";
import useAuthentication from "../../hooks/useAuthentication";
import Eyecatch from "./Eyecatch";

interface Props extends React.Attributes {
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
}

export default function IndexPage({ children, ...props }: Props) {
  const { user, isFirstChecking, signIn, signOut } = useAuthentication();

  return (
    <Root {...props}>
      <HeadBar
        user={user ?? undefined}
        authenticationChecking={isFirstChecking}
        onSignInButtonClick={(_, objectId) => signIn(objectId)}
        onSignOutButtonClick={() => signOut()}
      />

      <Content>
        <Eyecatch />
      </Content>

      <FootBar />
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
