import * as React from "react";
import PostCardList from "./PostCardList";
import PostCardListItemLoader from "./PostCardListItemLoader";

export default {
  title: "PostCardList/PostCardListItemLoader",
  component: PostCardListItemLoader
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
