import * as React from "react";
import { OnAuthenticationStateChanged } from "../repositories/onAuthenticationStateChanged";
import { SignIn } from "../repositories/signIn";
import { SignOut } from "../repositories/signOut";

export interface Repository {
  onAuthenticationStateChanged: OnAuthenticationStateChanged;
  signIn: SignIn;
  signOut: SignOut;
}

const RepositoryContext = React.createContext<Repository>(null as any);

export default function useRepository(): Repository {
  return React.useContext(RepositoryContext);
}

export function RepositoryProvider({
  repository,
  children
}: {
  repository: Repository;
  children: React.ReactNode;
}) {
  return (
    <RepositoryContext.Provider value={repository}>
      {children}
    </RepositoryContext.Provider>
  );
}
