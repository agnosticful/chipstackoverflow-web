import * as React from "react";
import { AnswerCardContent } from "@@/components/AnswerCard";
import Comment from "@@/models/Comment";
import { PostId } from "@@/models/Post";
import { AnswerId } from "@@/models/Answer";
import useAnalytics from "@@/hooks/useAnalytics";
import useCommentReaction from "@@/hooks/useCommentReaction";

interface Props extends React.Attributes {
  postId: PostId;
  answerId: AnswerId;
  comment: Comment;
  className?: string;
  style?: React.CSSProperties;
}

export default function CommentListItem({
  postId,
  answerId,
  comment,
  ...props
}: Props) {
  const { trackEvent } = useAnalytics();
  const { like, dislike, unlike } = useCommentReaction({
    postId,
    answerId,
    commentId: comment.id,
  });

  return (
    <AnswerCardContent
      user={comment.author}
      body={comment.body}
      createDate={comment.createdAt}
      likes={comment.likes}
      dislikes={comment.dislikes}
      liked={comment.liked}
      disliked={comment.disliked}
      onLikeClick={() => {
        if (comment.liked) {
          trackEvent("comment_like_click", { to: "unlike" });

          unlike();
        } else {
          trackEvent("comment_like_click", { to: "like" });

          like();
        }
      }}
      onDislikeClick={() => {
        if (comment.disliked) {
          trackEvent("comment_dislike_click", { to: "unlike" });

          unlike();
        } else {
          trackEvent("comment_dislike_click", { to: "dislike" });

          dislike();
        }
      }}
      {...props}
    />
  );
}
