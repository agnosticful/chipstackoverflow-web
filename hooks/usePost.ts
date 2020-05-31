import { useApolloClient } from "@apollo/react-hooks";
import * as React from "react";
import { atom, useRecoilState } from "recoil";
import useAuthentication from "@@/hooks/useAuthentication";
import Answer from "@@/models/Answer";
import Comment, { CommentId } from "@@/models/Comment";
import Post, { PostId } from "@@/models/Post";
import getPostById from "@@/repositories/getPostById";
import dislikeComment from "@@/repositories/dislikeComment";
import likeComment from "@@/repositories/likeComment";
import unlikeComment from "@@/repositories/unlikeComment";

const postState = atom({
  key: "Post",
  default: {
    post: null as Post | null,
    isLoading: false,
    isInitialized: false,
  },
});

export default function usePost(id: PostId) {
  const apolloClient = useApolloClient();
  const { authenticationToken } = useAuthentication();

  const [{ post, isLoading, isInitialized }, setPostState] = useRecoilState(
    postState
  );

  React.useEffect(() => {
    setPostState((previousState) => ({ ...previousState, isLoading: true }));

    getPostById(id, { apolloClient, authenticationToken }).then((post) => {
      setPostState({ post, isLoading: false, isInitialized: true });
    });

    return () => {
      setPostState({ post: null, isLoading: false, isInitialized: false });
    };
  }, [id, apolloClient, authenticationToken]);

  return {
    post,
    isLoading: isLoading || !isInitialized,
    likeComment: React.useCallback(
      (id: CommentId) => {
        likeComment(id, { apolloClient, authenticationToken });

        setPostState(({ post, ...previousState }) => {
          if (!post) {
            throw new Error(
              "You shouldn't reach here. likeComment() was called when post is not set in the state."
            );
          }

          return {
            ...previousState,
            post: {
              ...post,
              likes: post.likes + 1,
              answers: post.answers.map((answer) => ({
                ...answer,
                comments: answer.comments.map((comment) => {
                  if (comment.id === id) {
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
            },
          };
        });
      },
      [apolloClient, authenticationToken]
    ),
    dislikeComment: React.useCallback(
      (id: CommentId) => {
        dislikeComment(id, { apolloClient, authenticationToken });

        setPostState(({ post, ...previousState }) => {
          if (!post) {
            throw new Error(
              "You shouldn't reach here. dislikeComment() was called when post is not set in the state."
            );
          }

          return {
            ...previousState,
            post: {
              ...post,
              likes: post.likes + 1,
              answers: post.answers.map((answer) => ({
                ...answer,
                comments: answer.comments.map((comment) => {
                  if (comment.id === id) {
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
            },
          };
        });
      },
      [apolloClient, authenticationToken]
    ),
    unlikeComment: React.useCallback(
      (id: CommentId) => {
        unlikeComment(id, { apolloClient, authenticationToken });

        setPostState(({ post, ...previousState }) => {
          if (!post) {
            throw new Error(
              "You shouldn't reach here. unlikeComment() was called when post is not set in the state."
            );
          }

          let targetAnswer!: Answer;
          let targetComment!: Comment;

          for (const answer of post.answers) {
            for (const comment of answer.comments) {
              if (comment.id === id) {
                targetAnswer = { ...answer };
                targetComment = { ...comment };
              }
            }
          }

          return {
            ...previousState,
            post: {
              ...post,
              likes: targetComment.liked ? post.likes - 1 : post.likes,
              dislikes: targetComment.disliked
                ? post.dislikes - 1
                : post.dislikes,
              answers: post.answers.map((answer) => {
                if (answer.id === targetAnswer.id) {
                  return {
                    ...answer,
                    comments: answer.comments.map((comment) => {
                      if (comment.id === targetComment.id) {
                        return {
                          ...comment,
                          likes: comment.liked
                            ? comment.likes - 1
                            : comment.likes,
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
            },
          };
        });
      },
      [apolloClient, authenticationToken]
    ),
  };
}
