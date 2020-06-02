import * as React from "react";
import styled from "styled-components";
import Button, { ButtonVariant } from "@@/components/Button";

interface Props extends React.Attributes {
  onSignUpButtonClick?: React.MouseEventHandler;
  className?: string;
  style?: React.CSSProperties;
}

export default function AnswerCardCommentFormFilling({
  onSignUpButtonClick = () => {},
  ...props
}: Props) {
  return (
    <Root {...props}>
      {"Leave a comment?"}

      <_Button variant={ButtonVariant.primary} onClick={onSignUpButtonClick}>
        Sign up with Google
      </_Button>

      {"first!"}
    </Root>
  );
}

const Root = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding-bottom: 32px;
`;

const _Button = styled(Button)`
  margin: 0 8px;
`;
