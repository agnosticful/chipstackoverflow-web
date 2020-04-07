import Router from "next/router";
import * as React from "react";
import styled from "styled-components";
import PostList, {
  PostCardListItem,
  PostCardListItemLoader,
} from "../../components/PostCardList";
import { MOBILE_MEDIA } from "../../constants/mediaquery";
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
    <Root>
      <Headline>Recent Posts</Headline>
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
    </Root>
  );
}

const Root = styled.div`
  width: 80%;
  margin: 0 auto 80px;

  & > div {
    max-width: 900px;
  }

  ${MOBILE_MEDIA} {
    width: 90%;
  }
`;

const Headline = styled.h2`
  margin: 0 auto 32px;
  font-size: 32px;

  ${MOBILE_MEDIA} {
    font-size: 24px;
  }
`;
