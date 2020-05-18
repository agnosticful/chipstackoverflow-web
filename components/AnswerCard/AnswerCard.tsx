import * as React from "react";
import styled from "styled-components";
import Card from "@@/components/Card";
import { Props as AnswerCardContentProps } from "./AnswerCardContent";
import { Props as AnswerCardCommentFormProps } from "./AnswerCardCommentForm";

interface Props extends React.Attributes {
  answer: React.ReactElement<AnswerCardContentProps>;
  comments:
    | React.ReactElement<AnswerCardContentProps>
    | React.ReactElement<AnswerCardContentProps>[];
  form?: React.ReactElement<AnswerCardCommentFormProps>;
  className?: string;
  style?: React.CSSProperties;
}

/**
 * An UI that shows answer and its comments
 */
export default function AnswerCard({
  answer,
  comments,
  form,
  ...props
}: Props) {
  return (
    <Root {...props}>
      <Answer>{answer}</Answer>

      <Comments>{comments}</Comments>

      {form ? <Form>{form}</Form> : null}
    </Root>
  );
}

const Root = styled(Card)`
  display: grid;
  grid-template-columns: 64px 1fr 96px;
  grid-template-areas: "answer answer ." ". comments comments" ". comment-form comment-form";
  padding: 32px;
`;

const Answer = styled.div`
  grid-area: answer;
  margin-top: -16px;
`;

const Comments = styled.div`
  grid-area: comments;

  > * {
    margin-top: 32px;

    :first-of-type {
      margin-top: 64px;
    }
  }
`;

const Form = styled.div`
  grid-area: comment-form;
  margin-top: calc(64px - 16px);
`;
