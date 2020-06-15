import * as React from "react";
import Avatar from "@@/components/Avatar";
import { SignOutIcon } from "@@/components/Icon";
import PopoverMenu, { PopoverMenuItem } from "@@/components/PopoverMenu";
import User from "@@/models/UserProfile";

interface Props extends React.Attributes {
  user: User;
  onSignOutButtonClick?: React.MouseEventHandler;
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
}

export default function SignedInRight({
  user,
  onSignOutButtonClick,
  children,
  ...props
}: Props) {
  return (
    <PopoverMenu
      content={
        <PopoverMenuItem icon={<SignOutIcon />} onClick={onSignOutButtonClick}>
          Sign out
        </PopoverMenuItem>
      }
      {...props}
    >
      <Avatar src={user.imageURL.href} />
    </PopoverMenu>
  );
}
