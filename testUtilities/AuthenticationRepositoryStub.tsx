import * as React from "react";
import { of } from "rxjs";
import useRepository, { RepositoryProvider } from "../hooks/useRepository";
import User, { UserId } from "../models/User";

export default function AuthenticationRepositoryStub({
  user,
  signingIn = false,
  signIn = () => undefined,
  signOut = () => undefined,
  children
}: {
  user?: { id: string; name: string; profileImageURL: URL } | null;
  signingIn?: boolean;
  signIn?: () => void;
  signOut?: () => void;
  children?: React.ReactNode;
}) {
  const repositoryBase = useRepository();
  const repository = {
    ...repositoryBase,
    subscribeUserById: () => of(user as User),
    onAuthenticationStateChanged: signingIn
      ? of<UserId | null>()
      : of<UserId | null>(user ? (user.id as UserId) : null),
    signIn: () => {
      signIn();

      return Promise.resolve();
    },
    signOut: () => {
      signOut();

      return Promise.resolve();
    }
  };

  return (
    <RepositoryProvider repository={repository}>{children}</RepositoryProvider>
  );
}
