import { useApolloClient } from "@apollo/react-hooks";
import * as React from "react";
import useAuthentication from "@@/hooks/useAuthentication";
import getPostById from "@@/repositories/getPostById";
import Post, { PostId } from "@@/models/Post";

export default function usePost(id: PostId) {
  const apolloClient = useApolloClient();
  const { authenticationToken } = useAuthentication();
  const [post, setPost] = React.useState<Post | null>(null);
  const [isLoading, setLoading] = React.useState(true);

  React.useEffect(() => {
    setLoading(true);

    getPostById(id, { apolloClient, authenticationToken }).then((post) => {
      setPost(post);
      setLoading(false);
    });

    return () => {
      setLoading(true);
      setPost(null);
    };
  }, [id, apolloClient, authenticationToken]);

  return { post, isLoading };
}
