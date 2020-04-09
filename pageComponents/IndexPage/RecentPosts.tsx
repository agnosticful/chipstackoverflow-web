import Router from "next/router";
import * as React from "react";
import PostList, {
  PostCardListItem,
  PostCardListItemLoader,
} from "../../components/PostCardList";
import { NUMBER_OF_POST_CARD_DISPLAY } from "../../constants/number";
import useRepository from "../../hooks/useRepository";
import Post from "../../models/Post";

export default function RecentPosts() {
  const { getRecentPosts } = useRepository();
  const [post, setPost] = React.useState<Post[]>([]);

  React.useEffect(() => {
    (async () => {
      setPost(await getRecentPosts({ limit: NUMBER_OF_POST_CARD_DISPLAY }));
    })();
  }, [setPost, getRecentPosts]);

  return (
    <PostList>
      {post.length === 0 ? (
        <>
          {Array.from(new Array(NUMBER_OF_POST_CARD_DISPLAY)).map((_, i) => (
            <PostCardListItemLoader key={i} />
          ))}
        </>
      ) : (
        post.map((postItem) => (
          <PostCardListItem
            key={postItem.id}
            post={postItem}
            onClick={() => {
              Router.push(`/posts/${postItem.id}`);
            }}
          />
        ))
      )}
    </PostList>
  );
}
