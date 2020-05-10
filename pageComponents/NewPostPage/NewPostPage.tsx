import * as React from "react";
import styled from "styled-components";
import FootBar from "../../components/FootBar";
import HeadBar from "../../components/HeadBar";
import { MOBILE_MEDIA } from "../../constants/mediaquery";
import useAuthentication from "../../hooks/useAuthentication";
import useRepository from "../../hooks/useRepository";

export default function NewPostPage() {
  const { user, isFirstChecking, signIn, signOut } = useAuthentication();
  const { logEvent } = useRepository();

  return (
    <Root>
      <HeadBar
        user={user ?? undefined}
        authenticationChecking={isFirstChecking}
        onSignInButtonClick={(_, objectId) => signIn(objectId)}
        onSignOutButtonClick={() => signOut()}
      />

      <Content>
        <Headline>Create a New Post</Headline>
      </Content>

      <FootBar
        onContactClick={(_, objectId) => logEvent("contact", { objectId })}
      />
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

const Headline = styled.h2`
  margin-bottom: 32px;
  font-size: 32px;

  ${MOBILE_MEDIA} {
    font-size: 24px;
  }
`;
