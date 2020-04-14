import * as React from "react";
import User from "../../models/User";
import Avatar from "../Avatar";
import { SignOutIcon } from "../Icon";
import PopoverMenu, { PopoverMenuItem } from "../PopoverMenu";

interface Props extends React.Attributes {
  user: User;
  onSignOutButtonClick?: (e: React.SyntheticEvent) => void;
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
      <Avatar src={user.profileImageURL.href} />
    </PopoverMenu>
  );
}
