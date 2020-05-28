import * as React from "react";
import styled from "styled-components";
import AnswerCard, {
  AnswerCardContent,
  AnswerCardCommentForm,
  AnswerCardContentLoader,
} from "@@/components/AnswerCard";
import useMyself from "@@/hooks/useMyself";
import Answer from "@@/models/Answer";

interface Props extends React.Attributes {
  answers?: Answer[];
  loading?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

export default function PostAnswers({
  answers,
  loading = false,
  ...props
}: Props) {
  const { myself, isLoading: isMyselfLoading } = useMyself();

  let answerElements = Array.from({ length: 3 }, (_, i) => (
    <_AnswerCard
      answer={<AnswerCardContentLoader />}
      comments={<AnswerCardContentLoader />}
      key={i}
    />
  ));

  if (!loading && !isMyselfLoading) {
    if (!answers) {
      throw new Error();
    }

    answerElements = answers.map((answer) => (
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
