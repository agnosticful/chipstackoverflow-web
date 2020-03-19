import * as React from "react";
import { CreatePost } from "../repositories/createPost";
import { GetRecentPosts } from "../repositories/getRecentPosts";
import { GetUserById } from "../repositories/getUserById";
import { LogEvent } from "../repositories/logEvent";
import { OnAuthenticationStateChanged } from "../repositories/onAuthenticationStateChanged";
import { SetUserIdForLogging } from "../repositories/setUserIdForLogging";
import { SignIn } from "../repositories/signIn";
import { SignOut } from "../repositories/signOut";
import { SubscribeRecentPosts } from "../repositories/subscribeRecentPosts";
import { SubscribeUserById } from "../repositories/subscribeUserById";

export interface Repository {
  createPost: CreatePost;
  getRecentPosts: GetRecentPosts;
  getUserById: GetUserById;
  logEvent: LogEvent;
  onAuthenticationStateChanged: OnAuthenticationStateChanged;
  setUserIdForLogging: SetUserIdForLogging;
  signIn: SignIn;
  signOut: SignOut;
  subscribeRecentPosts: SubscribeRecentPosts;
  subscribeUserById: SubscribeUserById;
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
