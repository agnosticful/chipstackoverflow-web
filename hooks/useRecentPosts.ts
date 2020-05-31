import { useApolloClient } from "@apollo/react-hooks";
import * as React from "react";
import { atom, useRecoilState } from "recoil";
import { PostMinimum } from "@@/models/Post";
import getRecentPosts from "@@/repositories/getRecentPosts";

const recentPostsState = atom({
  key: "RecentPosts",
  default: {
    recentPosts: [] as PostMinimum[],
    isLoading: false,
    isInitialized: false,
  },
});

export default function useRecentPosts() {
  const apolloClient = useApolloClient();
  const [
    { recentPosts, isLoading, isInitialized },
    setRecentPostsState,
  ] = useRecoilState(recentPostsState);

  React.useEffect(() => {
    if (isInitialized) {
      return;
    }

    setRecentPostsState((previousState) => ({
      ...previousState,
      isLoading: true,
    }));

    getRecentPosts({ apolloClient }).then((posts) => {
      setRecentPostsState({
        recentPosts: posts,
        isLoading: false,
        isInitialized: true,
      });
    });
  }, []);

  return { recentPosts, isLoading: isLoading || !isInitialized };
}
