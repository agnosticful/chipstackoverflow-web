import * as React from "react";
import AnswerCard, {
  AnswerCardContent,
  AnswerCardCommentForm,
  AnswerCardCommentFormFilling,
} from "@@/components/AnswerCard";
import useAuthentication from "@@/hooks/useAuthentication";
import useMyself from "@@/hooks/useMyself";
import Answer from "@@/models/Answer";

interface Props extends React.Attributes {
  answer: Answer;
  onAnswerLikeClick?: React.MouseEventHandler;
  onAnswerDislikeClick?: React.MouseEventHandler;
  className?: string;
  style?: React.CSSProperties;
}

export default function PostAnswer({
  answer,
  onAnswerLikeClick,
  onAnswerDislikeClick,
  ...props
}: Props) {
  const { signIn } = useAuthentication();
  const { myself } = useMyself();

  return (
    <AnswerCard
      answer={
        <AnswerCardContent
          user={answer.author}
          body={answer.body}
          createDate={answer.createdAt}
          likes={answer.likes}
          dislikes={answer.dislikes}
          liked={answer.liked}
          disliked={answer.disliked}
          onLikeClick={onAnswerLikeClick}
          onDislikeClick={onAnswerDislikeClick}
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
      form={
        myself ? (
          <AnswerCardCommentForm user={myself} />
        ) : (
          <AnswerCardCommentFormFilling onSignUpButtonClick={() => signIn()} />
        )
      }
      {...props}
    />
  );
}
