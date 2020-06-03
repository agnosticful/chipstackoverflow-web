import * as React from "react";
import styled, { css } from "styled-components";
import Avatar from "@@/components/Avatar";
import { ThumbsDownIcon, ThumbsUpIcon } from "@@/components/Icon";
import User from "@@/models/User";

export interface Props extends React.Attributes {
  user: User;
  body: string;
  createDate: Date;
  likes: number;
  dislikes: number;
  liked?: boolean;
  disliked?: boolean;
  onLikeClick?: React.MouseEventHandler;
  onDislikeClick?: React.MouseEventHandler;
  className?: string;
  style?: React.CSSProperties;
}

/**
 * A part of `<AnswerCard>` that shows answers or comments
 */
export default function AnswerCardContent({
  user,
  body,
  createDate,
  likes,
  dislikes,
  liked = false,
  disliked = false,
  onLikeClick,
  onDislikeClick,
  ...props
}: Props) {
  return (
    <Root {...props}>
      <Author>
        <AuthorAvatar src={user.profileImageURL.href} />

        <AuthorName>{user.name}</AuthorName>
      </Author>

      {/* TODO: format to be relative date expression */}
      <CreationDate>{createDate.toDateString()}</CreationDate>

      <Body>
        {body.split("\n").map((line) => (
          <p>{line}</p>
        ))}
      </Body>

      <Reactions>
        <LikeButton _active={liked} onClick={onLikeClick}>
          <ThumbsUpIcon />

          {likes}
        </LikeButton>

        <DislikeButton _active={disliked} onClick={onDislikeClick}>
          <ThumbsDownIcon />

          {dislikes}
        </DislikeButton>
      </Reactions>
    </Root>
  );
}

const Root = styled.div`
  display: grid;
  grid-template-columns: 64px 1fr 1fr;
  grid-template-areas: "author author creation-date" ". body body" ". reactions reactions";
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

const CreationDate = styled.div`
  grid-area: creation-date;
  justify-self: flex-end;
  align-self: center;
  color: #576574;
  font-size: 14px;
`;

const Body = styled.div`
  grid-area: body;
  margin-bottom: 16px;
  line-height: 1.333;
  font-size: 1rem;

  > p {
    margin: 1em 0;

    :first-of-type {
      margin-top: 0;
    }

    :last-of-type {
      margin-bottom: 0;
    }
  }
`;

const Reactions = styled.div`
  grid-area: reactions;
  display: flex;
  margin-top: -8px;
  margin-bottom: -8px;
  margin-left: -8px;
`;

const reactionButtonCSS = css`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 8px;
  color: #576574;
  cursor: pointer;
  transition: color 200ms ease;

  & > svg {
    margin-right: 8px;
  }
`;

const LikeButton = styled.div<{ _active: boolean }>`
  ${reactionButtonCSS}

  color: ${({ _active }) => (_active ? "#10ac84" : "#576574")};

  &:hover {
    color: #10ac84;
  }
`;

const DislikeButton = styled.div<{ _active: boolean }>`
  ${reactionButtonCSS}

  color: ${({ _active }) => (_active ? "#ee5253" : "#576574")};

  &:hover {
    color: #ee5253;
  }
`;
