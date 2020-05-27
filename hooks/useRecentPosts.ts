import { useApolloClient } from "@apollo/react-hooks";
import * as React from "react";
import useAuthentication from "@@/hooks/useAuthentication";
import { PostMinimum } from "@@/models/Post";
import getRecentPosts from "@@/repositories/getRecentPosts";

export default function useRecentPosts() {
  const apolloClient = useApolloClient();
  const { authenticationToken } = useAuthentication();
  const [recentPosts, setRecentPosts] = React.useState<PostMinimum[]>([]);
  const [isLoading, setLoading] = React.useState(true);

  React.useEffect(() => {
    setLoading(true);

    getRecentPosts({ apolloClient, authenticationToken }).then((posts) => {
      setRecentPosts(posts);
      setLoading(false);
    });
  }, []);

  return { recentPosts, isLoading };
}
