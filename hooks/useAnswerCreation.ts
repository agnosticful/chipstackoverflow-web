import { useApolloClient } from "@apollo/react-hooks";
import * as React from "react";
import { AnswerBody } from "@@/models/Answer";
import { PostId } from "@@/models/Post";
import useAuthentication from "@@/hooks/useAuthentication";
import usePost from "@@/hooks/usePost";
import createAnswer from "@@/repositories/createAnswer";

export default function useAnswerCreation({ postId }: { postId: PostId }) {
  const apolloClient = useApolloClient();
  const { authenticationToken } = useAuthentication();
  const { updateLocally } = usePost({ postId });
  const [body, setBody] = React.useState("");
  const [
    bodyValidationErrorTypes,
    setBodyValidationErrorTypes,
  ] = React.useState<AnswerBodyValidationErrorType[]>(validateBody(body));
  const [isSubmitting, setSubmitting] = React.useState(false);

  const _setBody = (body: string) => {
    setBodyValidationErrorTypes(validateBody(body));
    setBody(body);
  };

  const submit = async () => {
    if (!authenticationToken) {
      throw new Error(
        "You called useAnswerCreation().submit() with null authentication token. It shouldn't happen here."
      );
    }

    setSubmitting(true);

    const answer = await createAnswer({
      postId,
      body: body as AnswerBody,
      apolloClient,
      authenticationToken,
    });

    updateLocally((post) => {
      if (!post) {
        return post;
      }

      return {
        ...post,
        answers: [answer, ...post.answers],
      };
    });

    _setBody("");
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

function validateBody(body: string): AnswerBodyValidationErrorType[] {
  const validationErrorTypes = [];

  if (body.length < 8) {
    validationErrorTypes.push(AnswerBodyValidationErrorType.tooShort);
  }

  if (body.length > 65535) {
    validationErrorTypes.push(AnswerBodyValidationErrorType.tooLong);
  }

  return validationErrorTypes;
}

export enum AnswerBodyValidationErrorType {
  tooShort,
  tooLong,
}
