import * as React from "react";
import MultilineTextSubmissionForm, {
  MultilineTextSubmissionFormProps,
} from "@@/components/MultilineTextSubmissionForm";

export type Props = MultilineTextSubmissionFormProps;

/**
 * A part of `<AnswerCard>` that represents to create a new comment.
 */
export default function AnswerCardCommentForm({
  placeholder = "What do you think?",
  buttonLabel = "Leave a comment",
  submittingButtonLabel = "Sending...",
  ...props
}: Props) {
  return (
    <MultilineTextSubmissionForm
      placeholder={placeholder}
      buttonLabel={buttonLabel}
      submittingButtonLabel={submittingButtonLabel}
      {...props}
    />
  );
}
