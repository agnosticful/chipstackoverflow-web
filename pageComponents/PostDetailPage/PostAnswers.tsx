import * as React from "react";
import styled from "styled-components";
import AnswerCard, { AnswerCardContentLoader } from "@@/components/AnswerCard";
import useAnalytics from "@@/hooks/useAnalytics";
import useAuthentication from "@@/hooks/useAuthentication";
import usePost from "@@/hooks/usePost";
import { PostId } from "@@/models/Post";
import PostAnswer from "./PostAnswer";

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
  const { post, isLoading, likeAnswer, dislikeAnswer, unlikeAnswer } = usePost(
    postId
  );

  let answerElements = Array.from({ length: 3 }, (_, i) => (
    <LoadingAnswerCard
      answer={<AnswerCardContentLoader />}
      comments={<AnswerCardContentLoader />}
      key={i}
    />
  ));

  if (!isLoading) {
    if (!post) {
      // while isPostLoading=false, post should not be null.
      throw new Error("You shouldn't reach here.");
    }

    answerElements = post.answers.map((answer) => (
      <_PostAnswer
        answer={answer}
        onAnswerLikeClick={() => {
          if (!authenticationToken) {
            // TODO:
            // replace this with a custom modal dialog component
            alert("You need to sign in first to like this answer.");

            return;
          }

          if (answer.liked) {
            trackEvent("answer_like_click", { to: "unlike" });

            unlikeAnswer(answer.id);
          } else {
            trackEvent("answer_like_click", { to: "like" });

            likeAnswer(answer.id);
          }
        }}
        onAnswerDislikeClick={() => {
          if (!authenticationToken) {
            // TODO:
            // replace this with a custom modal dialog component
            alert("You need to sign in first to like this answer.");

            return;
          }

          if (answer.disliked) {
            trackEvent("answer_dislike_click", { to: "unlike" });

            unlikeAnswer(answer.id);
          } else {
            trackEvent("answer_dislike_click", { to: "dislike" });

            dislikeAnswer(answer.id);
          }
        }}
        key={answer.id}
      />
    ));
  }

  return <div {...props}>{answerElements}</div>;
}

const _PostAnswer = styled(PostAnswer)`
  &:nth-of-type(n + 2) {
    margin-top: 32px;
  }
`;

const LoadingAnswerCard = styled(AnswerCard)`
  &:nth-of-type(n + 2) {
    margin-top: 32px;
  }
`;
