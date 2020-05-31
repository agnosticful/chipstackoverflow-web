import * as React from "react";
import styled from "styled-components";
import HeadBar from "@@/components/HeadBar";
import FootBar from "@@/components/FootBar";
import { MOBILE_MEDIA } from "@@/constants/mediaquery";
import useAnalytics from "@@/hooks/useAnalytics";
import useAuthentication from "@@/hooks/useAuthentication";
import useMyself from "@@/hooks/useMyself";
import Eyecatch from "./Eyecatch";
import PopularPosts from "./PopularPosts";
import RecentPosts from "./RecentPosts";

interface Props extends React.Attributes {}

export default function IndexPage({ ...props }: Props) {
  const {
    isLoading: isAuthenticationLoading,
    signIn,
    signOut,
  } = useAuthentication();
  const { trackEvent } = useAnalytics();
  const { myself, isLoading: isMyselfLoading } = useMyself();

  return (
    <Root {...props}>
      <HeadBar
        user={myself ?? undefined}
        authenticationChecking={isAuthenticationLoading || isMyselfLoading}
        onSignInButtonClick={() => {
          signIn();

          trackEvent("sign_in_click", {
            object_id: "head_bar_sign_in_button",
          });
        }}
        onSignOutButtonClick={() => {
          signOut();

          trackEvent("sign_out_click", {
            object_id: "head_bar_sign_out_button",
          });
        }}
      />

      <Content>
        <Eyecatch />
      </Content>

      <Content>
        <RecentPosts />
      </Content>

      <Content>
        <PopularPosts />
      </Content>

      <FootBar
      // onContactClick={(_, objectId) => logEvent("contact", { objectId })}
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
