import * as React from "react";
import styled from "styled-components";
import AnswerCard, { AnswerCardContentLoader } from "@@/components/AnswerCard";
import usePost from "@@/hooks/usePost";
import { PostId } from "@@/models/Post";
import PostAnswer from "./PostAnswer";

interface Props extends React.Attributes {
  postId: PostId;
  className?: string;
  style?: React.CSSProperties;
}

export default function PostAnswers({ postId, ...props }: Props) {
  const { post, isLoading } = usePost(postId);

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
      <_PostAnswer answer={answer} key={answer.id} />
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
