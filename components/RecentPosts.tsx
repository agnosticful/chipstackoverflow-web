import React from "react";
import PostCardList from "./PostCardList";
import { INITIAL_RECENT_POST_NUMBER } from "../constants/utils";
import useRepository from "../hooks/useRepository";
import Post from "../models/Post";

export default function RecentPosts() {
  const { getRecentPosts } = useRepository();

  const [recentPostList, setRecentPostList] = React.useState([] as Post[]);

  React.useEffect(() => {
    (async () => {
      setRecentPostList(
        await getRecentPosts({ limit: INITIAL_RECENT_POST_NUMBER })
      );
    })();
  }, []);
  const handleClick = (id: string) => {
    console.log(`id: ${id} is clicked`);
  };

  return <PostCardList posts={recentPostList} handleClick={handleClick} />;
}
