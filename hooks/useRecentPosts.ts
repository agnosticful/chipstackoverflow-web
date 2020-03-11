import * as React from "react";
import useRepository from "./useRepository";
import Post from "../models/Post";

export default function useRecentPosts({
  limit = 10
}: { limit?: number } = {}): {
  recentPosts: Post[];
  areFirstRecentPostsLoaded: boolean;
} {
  const { subscribeRecentPosts } = useRepository();
  const [recentPosts, setRecentPosts] = React.useState<Post[]>([]);
  const [areFirstRecentPostsLoaded, setFirstRecentPostsLoaded] = React.useState(
    false
  );

  React.useEffect(() => {
    const subscription = subscribeRecentPosts({ limit }).subscribe(posts => {
      setRecentPosts(posts);
      setFirstRecentPostsLoaded(true);
    });

    return () => subscription.unsubscribe();
  }, []);

  return { recentPosts, areFirstRecentPostsLoaded };
}
