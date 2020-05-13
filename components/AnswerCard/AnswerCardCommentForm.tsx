import * as React from "react";
import styled from "styled-components";
import Avatar from "@@/components/Avatar";
import Button from "@@/components/Button";
import { LoadingIcon, SendIcon } from "@@/components/Icon";
import TextArea from "@@/components/TextArea";
import User from "@@/models/User";

export interface Props extends React.Attributes {
  user: User;
  defaultValue?: string;
  submitting?: boolean;
  invalid?: boolean;
  invalidReason?: string;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>, body: string) => void;
  onSubmit?: (e: React.SyntheticEvent<HTMLElement>, body: string) => void;
  className?: string;
  style?: React.CSSProperties;
}

/**
 * A part of `<AnswerCard>` that represents to create a new comment.
 */
export default function AnswerCardCommentForm({
  user,
  defaultValue = "",
  submitting,
  invalid,
  invalidReason,
  onChange = () => undefined,
  onSubmit = () => undefined,
  ...props
}: Props) {
  const [textAreaId, setTextAreaId] = React.useState(Math.random());
  const [body, setBody] = React.useState(defaultValue);
  const onBodyChange = React.useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setBody(e.currentTarget.value);
      onChange(e, e.currentTarget.value);
    },
    [onChange]
  );
  const onSubmitClick = React.useCallback(
    (e: React.MouseEvent<HTMLElement>) => {
      setBody("");
      setTextAreaId(Math.random());
      onSubmit(e, body);
    },
    [onSubmit, body]
  );

  return (
    <Root {...props}>
      <Author>
        <AuthorAvatar src={user.profileImageURL.href} />

        <AuthorName>{user.name}</AuthorName>
      </Author>

      <_TextArea
        placeholder="Leave your comment ..."
        defaultValue={defaultValue}
        disabled={submitting || invalid}
        onChange={onBodyChange}
        key={textAreaId}
      />

      {invalidReason ? <HelpfulMessage>{invalidReason}</HelpfulMessage> : null}

      <SubmitButton disabled={submitting || invalid} onClick={onSubmitClick}>
        {submitting ? <LoadingIcon /> : <SendIcon />}

        {submitting ? "Submitting..." : "Submit"}
      </SubmitButton>
    </Root>
  );
}

const Root = styled.div`
  display: grid;
  grid-template-columns: 64px 1fr;
  grid-template-areas: "author author author" ". textarea textarea" ". helpful-message submit-button";
`;

const Author = styled.div`
  grid-area: author;
  display: grid;
  grid-template-columns: auto auto;
  grid-template-areas: "avatar name";
  justify-content: flex-start;
  align-items: center;
  column-gap: 16px;
`;

const AuthorAvatar = styled(Avatar)`
  grid-area: avatar;
  width: 48px;
  height: 48px;
`;

const AuthorName = styled.div`
  grid-area: name;
  font-size: 16px;
  font-weight: 700;
`;

const _TextArea = styled(TextArea)`
  grid-area: textarea;
`;

const HelpfulMessage = styled.div`
  grid-area: helpful-message;
  margin-top: 16px;
  color: #576574;
  font-size: 12px;
`;

const SubmitButton = styled(Button)`
  grid-area: submit-button;
  justify-self: flex-end;
  margin-top: 16px;
`;
