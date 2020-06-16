import * as React from "react";
import { atomFamily, useRecoilState } from "recoil";
import Post, { PostId } from "@@/models/Post";
import getPostById from "@@/repositories/getPostById";
import { useApolloClient } from "@apollo/react-hooks";
import useAuthentication from "./useAuthentication";

const postAtom = atomFamily<
  { post: Post | null; loadingCount: number; isInitialized: boolean },
  PostId
>({
  key: "post",
  default: () => ({ post: null, loadingCount: 0, isInitialized: false }),
});

export default function usePost({ postId }: { postId: PostId }) {
  const apolloClient = useApolloClient();
  const { authenticationToken, isLoading } = useAuthentication();
  const [{ post, loadingCount, isInitialized }, setPostState] = useRecoilState(
    postAtom(postId)
  );

  React.useEffect(() => {
    if (post || isLoading) {
      return;
    }

    setPostState(({ loadingCount, ...rest }) => ({
      ...rest,
      loadingCount: loadingCount + 1,
    }));

    getPostById(postId, { apolloClient, authenticationToken }).then((post) => {
      setPostState(({ loadingCount, ...rest }) => ({
        ...rest,
        post,
        loadingCount: loadingCount - 1,
        isInitialized: true,
      }));
    });
  }, [postId, post, apolloClient, authenticationToken]);

  const updateLocally = React.useCallback(
    (updater: (post: Post | null) => Post | null) =>
      setPostState((state) => ({ ...state, post: updater(state.post) })),
    [postId]
  );

  return {
    post,
    isLoading: loadingCount > 0 || !isInitialized,
    updateLocally,
  };
}
