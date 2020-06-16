import * as React from "react";
import AnswerCard, {
  AnswerCardContent,
  AnswerCardCommentForm,
  AnswerCardCommentFormFilling,
} from "@@/components/AnswerCard";
import useAnswerReaction from "@@/hooks/useAnswerReaction";
import useAuthentication from "@@/hooks/useAuthentication";
import useMyself from "@@/hooks/useMyself";
import Answer from "@@/models/Answer";
import { PostId } from "@@/models/Post";
import useAnalytics from "@@/hooks/useAnalytics";
import CommentListItem from "./CommentListItem";

interface Props extends React.Attributes {
  postId: PostId;
  answer: Answer;
  className?: string;
  style?: React.CSSProperties;
}

export default function AnswerListItem({ postId, answer, ...props }: Props) {
  const { signIn } = useAuthentication();
  const { trackEvent } = useAnalytics();
  const { myself } = useMyself();
  const { like, dislike, unlike } = useAnswerReaction({
    postId,
    answerId: answer.id,
  });

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
          onLikeClick={() => {
            if (answer.liked) {
              trackEvent("answer_like_click", { to: "unlike" });

              unlike();
            } else {
              trackEvent("answer_like_click", { to: "like" });

              like();
            }
          }}
          onDislikeClick={() => {
            if (answer.disliked) {
              trackEvent("answer_dislike_click", { to: "unlike" });

              unlike();
            } else {
              trackEvent("answer_dislike_click", { to: "dislike" });

              dislike();
            }
          }}
        />
      }
      comments={answer.comments.map((comment) => (
        <CommentListItem
          postId={postId}
          answerId={answer.id}
          comment={comment}
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
