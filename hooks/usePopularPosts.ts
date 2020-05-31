import { useApolloClient } from "@apollo/react-hooks";
import * as React from "react";
import { atom, useRecoilState } from "recoil";
import { PostMinimum } from "@@/models/Post";
import getPopularPosts from "@@/repositories/getPopularPosts";

const popularPostsState = atom({
  key: "PopularPosts",
  default: {
    popularPosts: [] as PostMinimum[],
    isLoading: false,
    isInitialized: false,
  },
});

export default function usePopularPosts() {
  const apolloClient = useApolloClient();
  const [
    { popularPosts, isLoading, isInitialized },
    setPopularPostsState,
  ] = useRecoilState(popularPostsState);

  React.useEffect(() => {
    if (isInitialized) {
      return;
    }

    setPopularPostsState((previousState) => ({
      ...previousState,
      isLoading: true,
    }));

    getPopularPosts({ apolloClient }).then((posts) => {
      setPopularPostsState({
        popularPosts: posts,
        isLoading: false,
        isInitialized: true,
      });
    });
  }, []);

  return { popularPosts, isLoading: isLoading || !isInitialized };
}
