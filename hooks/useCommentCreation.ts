import { useApolloClient } from "@apollo/react-hooks";
import * as React from "react";
import { AnswerId } from "@@/models/Answer";
import { CommentBody } from "@@/models/Comment";
import { PostId } from "@@/models/Post";
import useAuthentication from "@@/hooks/useAuthentication";
import usePost from "@@/hooks/usePost";
import createComment from "@@/repositories/createComment";

export default function useCommentCreation({
  postId,
  answerId,
}: {
  postId: PostId;
  answerId: AnswerId;
}) {
  const apolloClient = useApolloClient();
  const { authenticationToken } = useAuthentication();
  const { updateLocally } = usePost({ postId });
  const [body, setBody] = React.useState("");
  const [
    bodyValidationErrorTypes,
    setBodyValidationErrorTypes,
  ] = React.useState<CommentBodyValidationErrorType[]>([
    CommentBodyValidationErrorType.tooShort,
  ]);
  const [isSubmitting, setSubmitting] = React.useState(false);

  const _setBody = (body: string) => {
    let validationErrorTypes = [];

    if (body.length < 8) {
      validationErrorTypes.push(CommentBodyValidationErrorType.tooShort);
    }

    if (body.length > 65535) {
      validationErrorTypes.push(CommentBodyValidationErrorType.tooLong);
    }

    setBodyValidationErrorTypes(validationErrorTypes);
    setBody(body);
  };

  const submit = async () => {
    if (!authenticationToken) {
      throw new Error(
        "You called useCommentCreation().submit() with null authentication token. It shouldn't happen here."
      );
    }

    setSubmitting(true);

    const comment = await createComment({
      postId,
      answerId,
      body: body as CommentBody,
      apolloClient,
      authenticationToken,
    });

    updateLocally((post) => {
      if (!post) {
        return post;
      }

      return {
        ...post,
        answers: post.answers.map((answer) => {
          if (answer.id === answerId) {
            return {
              ...answer,
              comments: [comment, ...answer.comments],
            };
          }

          return answer;
        }),
      };
    });

    setSubmitting(false);
  };

  return {
    body,
    isValid: bodyValidationErrorTypes.length === 0,
    bodyValidationErrorTypes,
    isSubmitting,
    setBody: _setBody,
    submit,
  };
}

export enum CommentBodyValidationErrorType {
  tooShort,
  tooLong,
}
