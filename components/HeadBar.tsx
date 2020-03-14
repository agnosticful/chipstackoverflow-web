import { Avatar, Button, Dropdown, Menu } from "antd";
import Link from "next/link";
import * as React from "react";
import styled from "styled-components";
import { MOBILE_MEDIA } from "../constants/mediaquery";
import useAuthentication from "../hooks/useAuthentication";
import { SignOutIcon } from "./Icon";

interface Props extends React.Attributes {
  noLogo?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

export default function HeadBar({ noLogo, ...props }: Props) {
  const { isFirstChecking, signIn, signOut, user } = useAuthentication();

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

  const menu = (
    <UserMenu onClick={signOut}>
      <UserMenuItem>
        <UserMenuItemLabel>Sign out</UserMenuItemLabel>

        <UserMenuItemIcon as={SignOutIcon} />
      </UserMenuItem>
    </UserMenu>
  );

  const right = isFirstChecking ? null : user ? (
    <Dropdown overlay={menu}>
      <AvatarWrapper>
        <_Avatar src={user.profileImageURL.href} />
      </AvatarWrapper>
    </Dropdown>
  ) : (
    <>
      <SignUpButton type="primary" onClick={signIn}>
        Sign up with Google
      </SignUpButton>

      <ShortSignUpButton type="primary" onClick={signIn}>
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

const _Avatar = styled(Avatar)`
  width: 40px;
  height: 40px;
`;

const AvatarWrapper = styled.div`
  grid-area: right;
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

const UserMenu = styled(Menu)`
  width: 192px;
`;

const UserMenuItem = styled(Menu.Item)`
  display: grid;
  grid-template-columns: auto 16px;
  grid-template-areas: "label icon";
  column-gap: 8px;
  align-items: center;
  padding: 8px 24px;
`;

const UserMenuItemLabel = styled.div`
  grid-area: label;
`;

const UserMenuItemIcon = styled.svg`
  grid-area: icon;
  width: 16px;
  height: 16px;
  margin-right: 4px;
`;
