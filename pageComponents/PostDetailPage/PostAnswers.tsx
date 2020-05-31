import * as React from "react";
import styled from "styled-components";
import AnswerCard, {
  AnswerCardContent,
  AnswerCardCommentForm,
  AnswerCardContentLoader,
} from "@@/components/AnswerCard";
import useAnalytics from "@@/hooks/useAnalytics";
import useAuthentication from "@@/hooks/useAuthentication";
import useMyself from "@@/hooks/useMyself";
import usePost from "@@/hooks/usePost";
import { PostId } from "@@/models/Post";

interface Props extends React.Attributes {
  postId: PostId;
  className?: string;
  style?: React.CSSProperties;
}

export default function PostAnswers({ postId, ...props }: Props) {
  // TODO:
  // get just isAuthenticated bool value instead of authenticationToken
  // because this code might be confusing if it was used as token, yet checking signed in or not
  const { authenticationToken } = useAuthentication();
  const { trackEvent } = useAnalytics();
  const { myself } = useMyself();
  const {
    post,
    isLoading: isPostLoading,
    likeComment,
    dislikeComment,
    unlikeComment,
  } = usePost(postId);

  let answerElements = Array.from({ length: 3 }, (_, i) => (
    <_AnswerCard
      answer={<AnswerCardContentLoader />}
      comments={<AnswerCardContentLoader />}
      key={i}
    />
  ));

  if (!isPostLoading) {
    if (!post) {
      // while isPostLoading=false, post should not be null.
      throw new Error("You shouldn't reach here.");
    }

    answerElements = post.answers.map((answer) => (
      <_AnswerCard
        answer={
          <AnswerCardContent
            user={answer.author}
            body={answer.body}
            createDate={answer.createdAt}
            likes={answer.likes}
            dislikes={answer.dislikes}
            liked={answer.liked}
            disliked={answer.disliked}
          />
        }
        comments={answer.comments.map((comment) => (
          <AnswerCardContent
            user={comment.author}
            body={comment.body}
            createDate={comment.createdAt}
            likes={comment.likes}
            dislikes={comment.dislikes}
            liked={comment.liked}
            disliked={comment.disliked}
            onLikeClick={() => {
              if (!authenticationToken) {
                // TODO:
                // replace this with a custom modal dialog component
                alert("You need to sign in first to like this comment.");

                return;
              }

              if (comment.liked) {
                trackEvent("comment_like_click", { to: "unlike" });

                unlikeComment(comment.id);
              } else {
                trackEvent("comment_like_click", { to: "like" });

                likeComment(comment.id);
              }
            }}
            onDislikeClick={() => {
              if (!authenticationToken) {
                // TODO:
                // replace this with a custom modal dialog component
                alert("You need to sign in first to like this comment.");

                return;
              }

              if (comment.disliked) {
                trackEvent("comment_dislike_click", { to: "unlike" });

                unlikeComment(comment.id);
              } else {
                trackEvent("comment_dislike_click", { to: "dislike" });

                dislikeComment(comment.id);
              }
            }}
            key={comment.id}
          />
        ))}
        form={myself ? <AnswerCardCommentForm user={myself} /> : undefined}
        key={answer.id}
      />
    ));
  }

  return <div {...props}>{answerElements}</div>;
}

const _AnswerCard = styled(AnswerCard)`
  &:nth-of-type(n + 2) {
    margin-top: 32px;
  }
`;
