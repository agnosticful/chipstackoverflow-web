import { action } from "@storybook/addon-actions";
import * as React from "react";
import { AnswerCardCommentFormFilling } from "@@/components/AnswerCard";

export default {
  title: "AnswerCard/AnswerCardCommentFormFilling",
  component: AnswerCardCommentFormFilling,
};

export const example = () => (
  <AnswerCardCommentFormFilling
    onSignUpButtonClick={action("onSignUpButtonClick")}
  />
);
