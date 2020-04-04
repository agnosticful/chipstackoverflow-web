import * as React from "react";
import styled from "styled-components";
import ContentLoader from "react-content-loader";

export interface Props extends React.Attributes {
  className?: string;
  style?: React.CSSProperties;
}

/**
 * A part of `<AnswerCard>` that shows loading placeholder as answers or comments
 */
export default function AnswerCardContentLoader({ ...props }: Props) {
  return (
    <Root {...props}>
      <UserAvatar />

      <UserName />

      <CreationDate />

      <BodyFirstLine />
      <BodySecondLine />
      <BodyThirdLine />
      <BodyFourthLine />
      <BodyFifthLine />

      <LikeIcon />
      <LikeNumber />

      <DislikeIcon />
      <DislikeNumber />
    </Root>
  );
}

const Root = styled(ContentLoader)`
  --avatar-diameter: 48px;
  --margin-right-of-avatar: 16px;
  --body-height: 16px;
  --body-line-height: calc(16px * 1.333);
  --reaction-icon-size: 24px;
  width: 100%;
  height: calc(
    var(--avatar-diameter) + var(--body-line-height) * 5 + 16px +
      var(--reaction-icon-size)
  );
`;

const UserAvatar = styled.circle`
  cx: calc(var(--avatar-diameter) / 2);
  cy: calc(var(--avatar-diameter) / 2);
  r: calc(var(--avatar-diameter) / 2);
`;

const UserName = styled.rect`
  --height: 16px;
  x: calc(var(--avatar-diameter) + var(--margin-right-of-avatar));
  y: calc((var(--avatar-diameter) - var(--height)) / 2);
  rx: 4px;
  ry: 4px;
  width: 128px;
  height: var(--height);
`;

const CreationDate = styled.rect`
  --width: 64px;
  --height: 14px;
  x: calc(100% - var(--width));
  y: calc((var(--avatar-diameter) - var(--height)) / 2);
  rx: 3px;
  ry: 3px;
  width: var(--width);
  height: var(--height);
`;

const BodyFirstLine = styled.rect`
  x: calc(var(--avatar-diameter) + var(--margin-right-of-avatar));
  y: calc(var(--avatar-diameter));
  rx: 3px;
  ry: 3px;
  width: 95%;
  height: var(--body-height);
`;

const BodySecondLine = styled.rect`
  x: calc(var(--avatar-diameter) + var(--margin-right-of-avatar));
  y: calc(var(--avatar-diameter) + var(--body-line-height));
  rx: 3px;
  ry: 3px;
  width: 85%;
  height: var(--body-height);
`;

const BodyThirdLine = styled.rect`
  x: calc(var(--avatar-diameter) + var(--margin-right-of-avatar));
  y: calc(var(--avatar-diameter) + var(--body-line-height) * 2);
  rx: 3px;
  ry: 3px;
  width: 75%;
  height: var(--body-height);
`;

const BodyFourthLine = styled.rect`
  x: calc(var(--avatar-diameter) + var(--margin-right-of-avatar));
  y: calc(var(--avatar-diameter) + var(--body-line-height) * 3);
  rx: 3px;
  ry: 3px;
  width: 90%;
  height: var(--body-height);
`;

const BodyFifthLine = styled.rect`
  x: calc(var(--avatar-diameter) + var(--margin-right-of-avatar));
  y: calc(var(--avatar-diameter) + var(--body-line-height) * 4);
  rx: 3px;
  ry: 3px;
  width: 60%;
  height: var(--body-height);
`;

const LikeIcon = styled.rect`
  x: calc(var(--avatar-diameter) + var(--margin-right-of-avatar));
  y: calc(var(--avatar-diameter) + var(--body-line-height) * 5 + 16px);
  rx: 3px;
  ry: 3px;
  width: var(--reaction-icon-size);
  height: var(--reaction-icon-size);
`;

const LikeNumber = styled.rect`
  x: calc(
    var(--avatar-diameter) + var(--margin-right-of-avatar) +
      var(--reaction-icon-size) + 8px
  );
  y: calc(var(--avatar-diameter) + var(--body-line-height) * 5 + 16px + 4px);
  rx: 3px;
  ry: 3px;
  width: 24px;
  height: 16px;
`;

const DislikeIcon = styled.rect`
  x: calc(
    var(--avatar-diameter) + var(--margin-right-of-avatar) +
      var(--reaction-icon-size) + 8px + 24px + 16px
  );
  y: calc(var(--avatar-diameter) + var(--body-line-height) * 5 + 16px);
  rx: 3px;
  ry: 3px;
  width: var(--reaction-icon-size);
  height: var(--reaction-icon-size);
`;

const DislikeNumber = styled.rect`
  x: calc(
    var(--avatar-diameter) + var(--margin-right-of-avatar) +
      var(--reaction-icon-size) + 8px + 24px + 16px + var(--reaction-icon-size) +
      8px
  );
  y: calc(var(--avatar-diameter) + var(--body-line-height) * 5 + 16px + 4px);
  rx: 3px;
  ry: 3px;
  width: 24px;
  height: 16px;
`;
