import { useApolloClient } from "@apollo/react-hooks";
import * as React from "react";
import useAuthentication from "@@/hooks/useAuthentication";
import usePost from "@@/hooks/usePost";
import Answer, { AnswerId } from "@@/models/Answer";
import { PostId } from "@@/models/Post";
import Comment, { CommentId } from "@@/models/Comment";
import likeComment from "@@/repositories/likeComment";
import dislikeComment from "@@/repositories/dislikeComment";
import unlikeComment from "@@/repositories/unlikeComment";

export default function useCommentReaction({
  postId,
  answerId,
  commentId,
}: {
  postId: PostId;
  answerId: AnswerId;
  commentId: CommentId;
}) {
  const apolloClient = useApolloClient();
  const { authenticationToken } = useAuthentication();
  const { updateLocally: updatePostLocally } = usePost({ postId });

  const like = React.useCallback(() => {
    if (!authenticationToken) {
      return;
    }

    likeComment({
      postId,
      answerId,
      commentId,
      apolloClient,
      authenticationToken,
    });

    updatePostLocally((post) => {
      if (!post) {
        return post;
      }

      return {
        ...post,
        likes: post.likes + 1,
        answers: post.answers.map((answer) => ({
          ...answer,
          comments: answer.comments.map((comment) => {
            if (comment.id === commentId) {
              return {
                ...comment,
                likes: comment.likes + 1,
                dislikes: comment.disliked
                  ? comment.dislikes - 1
                  : comment.dislikes,
                liked: true,
                disliked: false,
              };
            }

            return comment;
          }),
        })),
      };
    });
  }, [postId, answerId, commentId, apolloClient, authenticationToken]);

  const dislike = React.useCallback(() => {
    if (!authenticationToken) {
      return;
    }

    dislikeComment({
      postId,
      answerId,
      commentId,
      apolloClient,
      authenticationToken,
    });

    updatePostLocally((post) => {
      if (!post) {
        return post;
      }

      return {
        ...post,
        likes: post.likes + 1,
        answers: post.answers.map((answer) => ({
          ...answer,
          comments: answer.comments.map((comment) => {
            if (comment.id === commentId) {
              return {
                ...comment,
                likes: comment.liked ? comment.likes - 1 : comment.likes,
                dislikes: comment.dislikes + 1,
                liked: false,
                disliked: true,
              };
            }

            return comment;
          }),
        })),
      };
    });
  }, [postId, answerId, commentId, apolloClient, authenticationToken]);

  const unlike = React.useCallback(() => {
    if (!authenticationToken) {
      return;
    }

    unlikeComment({
      postId,
      answerId,
      commentId,
      apolloClient,
      authenticationToken,
    });

    updatePostLocally((post) => {
      if (!post) {
        return post;
      }

      let targetAnswer!: Answer;
      let targetComment!: Comment;

      for (const answer of post.answers) {
        for (const comment of answer.comments) {
          if (comment.id === commentId) {
            targetAnswer = { ...answer };
            targetComment = { ...comment };
          }
        }
      }

      return {
        ...post,
        likes: targetComment.liked ? post.likes - 1 : post.likes,
        dislikes: targetComment.disliked ? post.dislikes - 1 : post.dislikes,
        answers: post.answers.map((answer) => {
          if (answer.id === targetAnswer.id) {
            return {
              ...answer,
              comments: answer.comments.map((comment) => {
                if (comment.id === commentId) {
                  return {
                    ...comment,
                    likes: comment.liked ? comment.likes - 1 : comment.likes,
                    dislikes: comment.disliked
                      ? comment.dislikes - 1
                      : comment.dislikes,
                    liked: false,
                    disliked: false,
                  };
                }

                return comment;
              }),
            };
          }

          return answer;
        }),
      };
    });
  }, [postId, answerId, commentId, apolloClient, authenticationToken]);

  return { like, dislike, unlike };
}
