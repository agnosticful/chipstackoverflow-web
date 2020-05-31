import { useApolloClient } from "@apollo/react-hooks";
import * as React from "react";
import { atom, useRecoilState } from "recoil";
import useAuthentication from "@@/hooks/useAuthentication";
import getPostById from "@@/repositories/getPostById";
import Post, { PostId } from "@@/models/Post";

const postState = atom({
  key: "Post",
  default: {
    post: null as Post | null,
    isLoading: false,
    isInitialized: false,
  },
});

export default function usePost(id: PostId) {
  const apolloClient = useApolloClient();
  const { authenticationToken } = useAuthentication();

  const [{ post, isLoading, isInitialized }, setPostState] = useRecoilState(
    postState
  );

  React.useEffect(() => {
    setPostState((previousState) => ({ ...previousState, isLoading: true }));

    getPostById(id, { apolloClient, authenticationToken }).then((post) => {
      setPostState({ post, isLoading: false, isInitialized: true });
    });

    return () => {
      setPostState({ post: null, isLoading: false, isInitialized: false });
    };
  }, [id, apolloClient, authenticationToken]);

  return {
    post,
    isLoading: isLoading || !isInitialized,
  };
}
