import * as React from "react";
import { AnonymizeUserForLogging } from "../repositories/anonymizeUserForLogging";
import { CreateAnswerReaction } from "../repositories/createAnswerReaction";
import { CreatePost } from "../repositories/createPost";
import { DeleteAnswerReaction } from "../repositories/deleteAnswerReaction";
import { GetPostById } from "../repositories/getPostById";
import { GetRecentPosts } from "../repositories/getRecentPosts";
import { GetUserById } from "../repositories/getUserById";
import { IdentifyUserForLogging } from "../repositories/identifyUserForLogging";
import { LogEvent } from "../repositories/logEvent";
import { OnAuthenticationStateChanged } from "../repositories/onAuthenticationStateChanged";
import { SignIn } from "../repositories/signIn";
import { SignOut } from "../repositories/signOut";
import { SubscribeAnswersByPostId } from "../repositories/subscribeAnswersByPostId";
import { SubscribeRecentPosts } from "../repositories/subscribeRecentPosts";
import { SubscribeUserById } from "../repositories/subscribeUserById";

export interface Repository {
  anonymizeUserForLogging: AnonymizeUserForLogging;
  createAnswerReaction: CreateAnswerReaction;
  createPost: CreatePost;
  deleteAnswerReaction: DeleteAnswerReaction;
  getPostById: GetPostById;
  getRecentPosts: GetRecentPosts;
  getUserById: GetUserById;
  identifyUserForLogging: IdentifyUserForLogging;
  logEvent: LogEvent;
  onAuthenticationStateChanged: OnAuthenticationStateChanged;
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
