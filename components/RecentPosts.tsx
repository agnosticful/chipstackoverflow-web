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
      const teste = await getRecentPosts({ limit: INITIAL_RECENT_POST_NUMBER });
      console.log("test");
      console.log(teste);
      setRecentPostList(teste);
    })();
  }, []);
  const handleClick = (id: string) => {
    console.log(`id: ${id} is clicked`);
  };

  return <PostCardList posts={recentPostList} handleClick={handleClick} />;
}
