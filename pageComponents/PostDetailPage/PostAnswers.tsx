import * as React from "react";
import styled from "styled-components";
import AnswerCard, {
  AnswerCardContent,
  AnswerCardCommentForm,
  AnswerCardContentLoader,
} from "@@/components/AnswerCard";
import useMyself from "@@/hooks/useMyself";
import usePost from "@@/hooks/usePost";
import { PostId } from "@@/models/Post";

interface Props extends React.Attributes {
  postId: PostId;
  className?: string;
  style?: React.CSSProperties;
}

export default function PostAnswers({ postId, ...props }: Props) {
  const { myself } = useMyself();
  const { post, isLoading: isPostLoading } = usePost(postId);

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
