import * as React from "react";
import ContentLoader from "react-content-loader";
import styled from "styled-components";
import Card from "../Card";

interface Props extends React.Attributes {
  className?: string;
  style?: React.CSSProperties;
}

export default function PostCardListItemLoader({ ...props }: Props) {
  return (
    <Card {...props}>
      <Loader>
        <HeroHand />

        <TitleFirstLine />
        <TitleSecondLine />
        <TitleThirdLine />

        <LikeIcon />
        <LikeNumber />

        <PlayAtTitle />
        <EndedAtTitle />
        <FinalPotTitle />
        <PostedTitle />

        <PlayAtValue />
        <EndedAtValue />
        <FinalPotValue />
        <PostedValue />
      </Loader>
    </Card>
  );
}

const Loader = styled(ContentLoader)`
  --hero-hand-diameter: 96px;
  --margin-right-of-hero-hand: 16px;
  --title-height: 18px;
  --title-line-height: calc(var(--title-height) * 1.6);
  --like-icon-size: 24px;
  --attribute-height: 14px;
  --attribute-width: 15%;
  width: 100%;
  height: calc(
    var(--hero-hand-diameter) + 16px + var(--attribute-height) * 2 + 6px + 6px
  );
`;

const HeroHand = styled.rect`
  x: 0px;
  y: 0px;
  rx: 4px;
  ry: 4px;
  width: var(--hero-hand-diameter);
  height: var(--hero-hand-diameter);
`;

const TitleFirstLine = styled.rect`
  x: calc(var(--hero-hand-diameter) + var(--margin-right-of-hero-hand));
  y: 16px;
  rx: 4px;
  ry: 4px;
  width: 65%;
  height: var(--title-height);
`;

const TitleSecondLine = styled.rect`
  x: calc(var(--hero-hand-diameter) + var(--margin-right-of-hero-hand));
  y: calc(16px + var(--title-line-height));
  rx: 4px;
  ry: 4px;
  width: 55%;
  height: var(--title-height);
`;

const TitleThirdLine = styled.rect`
  x: calc(var(--hero-hand-diameter) + var(--margin-right-of-hero-hand));
  y: calc(16px + var(--title-line-height) * 2);
  rx: 4px;
  ry: 4px;
  width: 60%;
  height: var(--title-height);
`;

const LikeIcon = styled.rect`
  x: 4%;
  y: calc(var(--hero-hand-diameter) + 16px);
  rx: 2px;
  ry: 2px;
  width: var(--like-icon-size);
  height: var(--like-icon-size);
`;

const LikeNumber = styled.rect`
  x: calc(4% + var(--like-icon-size) + 4px);
  y: calc(var(--hero-hand-diameter) + 16px + 4px);
  rx: 2px;
  ry: 2px;
  width: 24px;
  height: 16px;
`;

const PlayAtTitle = styled.rect`
  x: 22%;
  y: calc(var(--hero-hand-diameter) + 16px);
  rx: 3px;
  ry: 3px;
  width: var(--attribute-width);
  height: var(--attribute-height);
`;

const EndedAtTitle = styled.rect`
  x: 42%;
  y: calc(var(--hero-hand-diameter) + 16px);
  rx: 3px;
  ry: 3px;
  width: var(--attribute-width);
  height: var(--attribute-height);
`;

const FinalPotTitle = styled.rect`
  x: 62%;
  y: calc(var(--hero-hand-diameter) + 16px);
  rx: 3px;
  ry: 3px;
  width: var(--attribute-width);
  height: var(--attribute-height);
`;

const PostedTitle = styled.rect`
  x: 82%;
  y: calc(var(--hero-hand-diameter) + 16px);
  rx: 3px;
  ry: 3px;
  width: var(--attribute-width);
  height: var(--attribute-height);
`;

const PlayAtValue = styled.rect`
  x: 22%;
  y: calc(var(--hero-hand-diameter) + 16px + 12px + 6px);
  rx: 3px;
  ry: 3px;
  width: var(--attribute-width);
  height: var(--attribute-height);
`;

const EndedAtValue = styled.rect`
  x: 42%;
  y: calc(var(--hero-hand-diameter) + 16px + 12px + 6px);
  rx: 3px;
  ry: 3px;
  width: var(--attribute-width);
  height: var(--attribute-height);
`;

const FinalPotValue = styled.rect`
  x: 62%;
  y: calc(var(--hero-hand-diameter) + 16px + 12px + 6px);
  rx: 3px;
  ry: 3px;
  width: var(--attribute-width);
  height: var(--attribute-height);
`;

const PostedValue = styled.rect`
  x: 82%;
  y: calc(var(--hero-hand-diameter) + 16px + 12px + 6px);
  rx: 3px;
  ry: 3px;
  width: var(--attribute-width);
  height: var(--attribute-height);
`;
