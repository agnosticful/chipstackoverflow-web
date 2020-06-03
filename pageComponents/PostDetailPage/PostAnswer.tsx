import * as React from "react";
import AnswerCard, {
  AnswerCardContent,
  AnswerCardCommentForm,
  AnswerCardCommentFormFilling,
} from "@@/components/AnswerCard";
import useAuthentication from "@@/hooks/useAuthentication";
import useMyself from "@@/hooks/useMyself";
import Answer from "@@/models/Answer";
import Comment from "@@/models/Comment";

interface Props extends React.Attributes {
  answer: Answer;
  onAnswerLikeClick?: React.MouseEventHandler;
  onAnswerDislikeClick?: React.MouseEventHandler;
  onCommentLikeClick?: (e: React.MouseEvent, comment: Comment) => void;
  onCommentDislikeClick?: (e: React.MouseEvent, comment: Comment) => void;
  className?: string;
  style?: React.CSSProperties;
}

export default function PostAnswer({
  answer,
  onAnswerLikeClick,
  onAnswerDislikeClick,
  onCommentLikeClick = () => {},
  onCommentDislikeClick = () => {},
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
          onLikeClick={(e) => onCommentLikeClick(e, comment)}
          onDislikeClick={(e) => onCommentDislikeClick(e, comment)}
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
