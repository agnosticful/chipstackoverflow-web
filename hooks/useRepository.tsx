import * as React from "react";
import { CreateAnswerReaction } from "../repositories/createAnswerReaction";
import { CreatePost } from "../repositories/createPost";
import { DeleteAnswerReaction } from "../repositories/deleteAnswerReaction";
import { GetPostById } from "../repositories/getPostById";
import { GetRecentPosts } from "../repositories/getRecentPosts";
import { GetUserById } from "../repositories/getUserById";
import { LogEvent } from "../repositories/logEvent";
import { OnAuthenticationStateChanged } from "../repositories/onAuthenticationStateChanged";
import { SetUserIdForLogging } from "../repositories/setUserIdForLogging";
import { SignIn } from "../repositories/signIn";
import { SignOut } from "../repositories/signOut";
import { SubscribeAnswersByPostId } from "../repositories/subscribeAnswersByPostId";
import { SubscribeRecentPosts } from "../repositories/subscribeRecentPosts";
import { SubscribeUserById } from "../repositories/subscribeUserById";

export interface Repository {
  createAnswerReaction: CreateAnswerReaction;
  createPost: CreatePost;
  deleteAnswerReaction: DeleteAnswerReaction;
  getPostById: GetPostById;
  getRecentPosts: GetRecentPosts;
  getUserById: GetUserById;
  logEvent: LogEvent;
  onAuthenticationStateChanged: OnAuthenticationStateChanged;
  setUserIdForLogging: SetUserIdForLogging;
  signIn: SignIn;
  signOut: SignOut;
  subscribeAnswersByPostId: SubscribeAnswersByPostId;
  subscribeRecentPosts: SubscribeRecentPosts;
  subscribeUserById: SubscribeUserById;
}

const RepositoryContext = React.createContext<Repository>(null as any);

export default function useRepository(): Repository {
  return React.useContext(RepositoryContext);
}

export function RepositoryProvider({
  repository,
  children,
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
