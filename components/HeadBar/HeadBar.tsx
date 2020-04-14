import Link from "next/link";
import * as React from "react";
import styled from "styled-components";
import { MOBILE_MEDIA } from "../../constants/mediaquery";
import User from "../../models/User";
import Button, { ButtonSize, ButtonVariant } from "../Button";
import SignedInRight from "./SignedInRight";

interface Props extends React.Attributes {
  user?: User;
  noLogo?: boolean;
  authenticationChecking?: boolean;
  onSignInButtonClick?: (e: React.SyntheticEvent, objectId: string) => void;
  onSignOutButtonClick?: (e: React.SyntheticEvent, objectId: string) => void;
  className?: string;
  style?: React.CSSProperties;
}

export default function HeadBar({
  user,
  noLogo,
  authenticationChecking = false,
  onSignInButtonClick = () => {},
  onSignOutButtonClick = () => {},
  ...props
}: Props) {
  const logo = noLogo ? null : (
    <Link href="/" passHref>
      <LogoAnchor>
        <Logo
          src="/logo@1x.png"
          srcSet="/logo@1x.png 1x, /logo@2x.png 2x, /logo@3x.png 3x"
        />
      </LogoAnchor>
    </Link>
  );

  const right = authenticationChecking ? null : user ? (
    <_SignedInRight
      user={user}
      onSignOutButtonClick={(e) =>
        onSignOutButtonClick(e, "head_bar_sign_out_button")
      }
    />
  ) : (
    <>
      <SignUpButton
        variant={ButtonVariant.primary}
        size={ButtonSize.small}
        onClick={(e) => onSignInButtonClick(e, "head_bar_sign_up_button")}
      >
        Sign up with Google
      </SignUpButton>

      <ShortSignUpButton
        variant={ButtonVariant.primary}
        size={ButtonSize.small}
        onClick={(e) => onSignInButtonClick(e, "head_bar_sign_up_button")}
      >
        Sign up
      </ShortSignUpButton>
    </>
  );

  return (
    <Root {...props}>
      {logo}

      {right}
    </Root>
  );
}

const Root = styled.header`
  height: 64px;
  padding: 8px 24px;
  display: grid;
  grid-template-columns: auto 1fr auto;
  grid-template-areas: "logo . right";
  align-items: center;

  ${MOBILE_MEDIA} {
    padding: 8px 16px;
  }
`;

const LogoAnchor = styled.a`
  grid-area: logo;
  padding: 4px;
`;

const Logo = styled.img`
  height: 32px;
  user-select: none;

  ${MOBILE_MEDIA} {
    height: 24px;
  }
`;

const _SignedInRight = styled(SignedInRight)`
  grid-area: right;
  width: 40px;
  height: 40px;
  cursor: pointer;
`;

const SignUpButton = styled(Button)`
  grid-area: right;
  justify-self: end;

  ${MOBILE_MEDIA} {
    display: none;
  }
`;

const ShortSignUpButton = styled(Button)`
  grid-area: right;
  justify-self: end;
  display: none;

  ${MOBILE_MEDIA} {
    display: block;
  }
`;
