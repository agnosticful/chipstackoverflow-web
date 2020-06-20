import * as React from "react";
import styled from "styled-components";
import AnswerCard, { AnswerCardContentLoader } from "@@/components/AnswerCard";
import usePost from "@@/hooks/usePost";
import { PostId } from "@@/models/Post";
import AnswerListItem from "./AnswerListItem";

interface Props extends React.Attributes {
  postId: PostId;
  className?: string;
  style?: React.CSSProperties;
}

export default function AnswerList({ postId, ...props }: Props) {
  // TODO:
  // get just isAuthenticated bool value instead of authenticationToken
  // because this code might be confusing if it was used as token, yet checking signed in or not
  const { post, isLoading } = usePost({ postId });

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
      <_AnswerListItem postId={postId} answer={answer} key={answer.id} />
    ));
  }

  return <Root {...props}>{answerElements}</Root>;
}

const Root = styled.div`
  display: flex;
  flex-direction: column;
`;

const _AnswerListItem = styled(AnswerListItem)`
  &:nth-of-type(n + 2) {
    margin-top: 32px;
  }
`;

const LoadingAnswerCard = styled(AnswerCard)`
  &:nth-of-type(n + 2) {
    margin-top: 32px;
  }
`;
