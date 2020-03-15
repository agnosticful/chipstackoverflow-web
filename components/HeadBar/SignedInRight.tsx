import * as React from "react";
import useAuthentication from "../../hooks/useAuthentication";
import User from "../../models/User";
import Avatar from "../Avatar";
import { SignOutIcon } from "../Icon";
import PopoverMenu, { PopoverMenuItem } from "../PopoverMenu";

interface Props extends React.Attributes {
  user: User;
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
}

export default function SignedInRight({ user, children, ...props }: Props) {
  const { signOut } = useAuthentication();

  return (
    <PopoverMenu
      content={
        <PopoverMenuItem icon={<SignOutIcon />} onClick={signOut}>
          Sign out
        </PopoverMenuItem>
      }
      {...props}
    >
      <Avatar src={user.profileImageURL.href} />
    </PopoverMenu>
  );
}
