import * as React from "react";
import PostCardList, {
  PostCardListItemLoader,
} from "@@/components/PostCardList";

export default {
  title: "PostCardList/PostCardListLoader",
  component: PostCardListItemLoader,
};

export const example = () => {
  return (
    <PostCardList>
      <PostCardListItemLoader />
      <PostCardListItemLoader />
      <PostCardListItemLoader />
      <PostCardListItemLoader />
      <PostCardListItemLoader />
      <PostCardListItemLoader />
    </PostCardList>
  );
};
