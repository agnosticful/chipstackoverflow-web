import Link from "next/link";
import * as React from "react";
import styled from "styled-components";
import Button, { ButtonVariant } from "../../components/Button";
import { MOBILE_MEDIA } from "../../constants/mediaquery";
import useAuthentication from "../../hooks/useAuthentication";
import useMyself from "../../hooks/useMyself";

interface Props extends React.Attributes {
  className?: string;
  style?: React.CSSProperties;
}

export default function Eyecatch(props: Props) {
  const { isLoading: isAuthenticationLoading, signIn } = useAuthentication();
  const { myself, isLoading: isMyselfLoading } = useMyself();

  return (
    <Root {...props}>
      <EyecatchImage
        src="/eyecatch@1x.png"
        srcSet="/eyecatch@1x.png 1x, /eyecatch@2x.png 2x, /eyecatch@3x.png 3x"
      />

      <EyecatchHeadline>
        {myself ? SIGNED_IN_HEADLINE : SIGNED_OUT_HEADLINE}
      </EyecatchHeadline>

      <EyecatchDescription>
        {myself ? SIGNED_IN_DESCRIPTION : SIGNED_OUT_DESCRIPTION}
      </EyecatchDescription>

      <EyecatchSignUpButton>
        {myself ? (
          <Link href="/posts/new" as="/posts/new" passHref>
            <Button variant={ButtonVariant.primary}>New Post</Button>
          </Link>
        ) : (
          <Button
            variant={ButtonVariant.primary}
            onClick={() => signIn("eyecatch_sign_up_button")}
            disabled={isAuthenticationLoading || isMyselfLoading}
          >
            {isAuthenticationLoading || isMyselfLoading
              ? "Loading..."
              : "Become a shark"}
          </Button>
        )}
      </EyecatchSignUpButton>
    </Root>
  );
}

const SIGNED_IN_HEADLINE = "Welcome back!";
const SIGNED_OUT_HEADLINE = "A Place Spanws Sharks";
const SIGNED_IN_DESCRIPTION =
  "Why don't you post hands you've played? A cycle of playing and reviewing with great poker players is the fastest way to be a shark!";
const SIGNED_OUT_DESCRIPTION =
  "Join the community to catch up the latest practices on the real tables. A cycle of playing and reviewing with great poker players is the fastest way to be a shark!";

const Root = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-areas: ". image" "headline image" "description image" "sign-up-button image" ". image";
  column-gap: 64px;
  row-gap: 32px;
  align-content: center;
  height: 75vh;
  min-height: 640px;

  ${MOBILE_MEDIA} {
    grid-template-columns: 100%;
    grid-template-areas: "image" "headline" "description" "sign-up-button";
    column-gap: 0;
    row-gap: 16px;
    justify-items: center;
    height: auto;
    min-height: auto;
    padding-top: 32px;
  }
`;

const EyecatchImage = styled.img`
  grid-area: image;
  width: 100%;
  user-select: none;

  ${MOBILE_MEDIA} {
    width: 80%;
  }
`;

const EyecatchHeadline = styled.h1`
  grid-area: headline;
  line-height: 1.25;
  margin: 0;
  font-size: 48px;

  ${MOBILE_MEDIA} {
    font-size: 32px;
  }
`;

const EyecatchDescription = styled.p`
  grid-area: description;
  line-height: 1.5;
  margin: 0;
`;

const EyecatchSignUpButton = styled.div`
  grid-area: sign-up-button;
  justify-self: flex-end;
`;
