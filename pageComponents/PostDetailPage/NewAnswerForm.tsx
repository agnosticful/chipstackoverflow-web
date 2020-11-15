import * as React from "react";
import MultilineTextSubmissionForm from "@@/components/MultilineTextSubmissionForm";
import useMyself from "@@/hooks/useMyself";
import { PostId } from "@@/models/Post";
import useAnswerCreation, {
  AnswerBodyValidationErrorType,
} from "@@/hooks/useAnswerCreation";

interface Props extends React.Attributes {
  postId: PostId;
  className?: string;
  style?: React.CSSProperties;
}

/**
 * Write a description here.
 */
export default function NewAnswerForm({ postId, ...props }: Props) {
  const { myself, isLoading: isMyselfLoading } = useMyself();
  const {
    body,
    isValid,
    bodyValidationErrorTypes,
    isSubmitting,
    setBody,
    submit,
  } = useAnswerCreation({ postId });

  if (isMyselfLoading || !myself) {
    return null;
  }

  return (
    <MultilineTextSubmissionForm
      user={myself}
      placeholder={`What would you do in the same situation?`}
      buttonLabel="Leave an answer"
      submittingButtonLabel="Sending..."
      submitting={isSubmitting}
      invalid={!isValid}
      invalidReason={
        bodyValidationErrorTypes.length === 0 || body.length === 0
          ? undefined
          : BODY_VALIDATION_ERROR_MESSAGE.get(bodyValidationErrorTypes[0])!
      }
      onChange={(_, body) => setBody(body)}
      onSubmit={() => submit()}
      {...props}
    />
  );
}

const BODY_VALIDATION_ERROR_MESSAGE = new Map([
  [AnswerBodyValidationErrorType.tooShort, "Too short to post."],
  [
    AnswerBodyValidationErrorType.tooLong,
    "Your wonderful comment is too much long! Can you shave it down little bit?",
  ],
]);
