import { useApolloClient } from "@apollo/react-hooks";
import * as React from "react";
import useAuthentication from "@@/hooks/useAuthentication";
import { PostMinimum } from "@@/models/Post";
import getPopularPosts from "@@/repositories/getPopularPosts";

export default function usePopularPosts() {
  const apolloClient = useApolloClient();
  const { authenticationToken } = useAuthentication();
  const [popularPosts, setPopularPosts] = React.useState<PostMinimum[]>([]);
  const [isLoading, setLoading] = React.useState(true);

  React.useEffect(() => {
    setLoading(true);

    getPopularPosts({ apolloClient, authenticationToken }).then((posts) => {
      setPopularPosts(posts);
      setLoading(false);
    });
  }, []);

  return { popularPosts, isLoading };
}
