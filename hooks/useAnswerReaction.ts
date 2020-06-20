import { useApolloClient } from "@apollo/react-hooks";
import * as React from "react";
import useAuthentication from "@@/hooks/useAuthentication";
import Answer, { AnswerId } from "@@/models/Answer";
import { PostId } from "@@/models/Post";
import dislikeAnswer from "@@/repositories/dislikeAnswer";
import likeAnswer from "@@/repositories/likeAnswer";
import unlikeAnswer from "@@/repositories/unlikeAnswer";
import usePost from "./usePost";

export default function useAnswerReaction({
  postId,
  answerId,
}: {
  postId: PostId;
  answerId: AnswerId;
}) {
  const apolloClient = useApolloClient();
  const { authenticationToken } = useAuthentication();
  const { updateLocally: updatePostLocally } = usePost({ postId });

  const like = React.useCallback(() => {
    if (!authenticationToken) {
      return;
    }

    likeAnswer({ postId, answerId, apolloClient, authenticationToken });

    updatePostLocally((post) => {
      if (!post) {
        return post;
      }

      return {
        ...post,
        likes: post.likes + 1,
        answers: post.answers.map((answer) => {
          if (answer.id === answerId) {
            return {
              ...answer,
              likes: answer.likes + 1,
              dislikes: answer.disliked ? answer.dislikes - 1 : answer.dislikes,
              liked: true,
              disliked: false,
            };
          }

          return answer;
        }),
      };
    });
  }, [postId, answerId, apolloClient, authenticationToken]);

  const dislike = React.useCallback(() => {
    if (!authenticationToken) {
      return;
    }

    dislikeAnswer({ postId, answerId, apolloClient, authenticationToken });

    updatePostLocally((post) => {
      if (!post) {
        return post;
      }

      return {
        ...post,
        dislikes: post.dislikes + 1,
        answers: post.answers.map((answer) => {
          if (answer.id === answerId) {
            return {
              ...answer,
              likes: answer.liked ? answer.likes - 1 : answer.likes,
              dislikes: answer.dislikes + 1,
              liked: false,
              disliked: true,
            };
          }

          return answer;
        }),
      };
    });
  }, [postId, answerId, apolloClient, authenticationToken]);

  const unlike = React.useCallback(() => {
    if (!authenticationToken) {
      return;
    }

    unlikeAnswer({ postId, answerId, apolloClient, authenticationToken });

    updatePostLocally((post) => {
      if (!post) {
        return post;
      }

      let targetAnswer!: Answer;

      for (const answer of post.answers) {
        if (answer.id === answerId) {
          targetAnswer = answer;
        }
      }

      return {
        ...post,
        likes: targetAnswer.liked ? post.likes - 1 : post.likes,
        dislikes: targetAnswer.disliked ? post.dislikes - 1 : post.dislikes,
        answers: post.answers.map((answer) => {
          if (answer.id === answerId) {
            return {
              ...answer,
              likes: answer.liked ? answer.likes - 1 : answer.likes,
              dislikes: answer.disliked ? answer.dislikes - 1 : answer.dislikes,
              liked: false,
              disliked: false,
            };
          }

          return answer;
        }),
      };
    });
  }, [postId, answerId, apolloClient, authenticationToken]);

  return { like, dislike, unlike };
}
