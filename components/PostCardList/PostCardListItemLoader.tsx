import * as React from "react";
import ContentLoader from "react-content-loader";
import styled from "styled-components";
import Card from "@@/components/Card";

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
  --hero-hand-squre-side: 96px;
  --margin-right-of-hero-hand: 16px;
  --title-height: 18px;
  --title-line-height: calc(var(--title-height) * 1.6);
  --like-icon-size: 24px;
  --attribute-height: 14px;
  --attribute-width: 60px;
  width: 100%;
  height: calc(
    var(--hero-hand-squre-side) + 16px + var(--attribute-height) * 2 + 6px + 6px
  );
`;

const HeroHand = styled.rect`
  x: 0px;
  y: 0px;
  rx: 4px;
  ry: 4px;
  width: var(--hero-hand-squre-side);
  height: var(--hero-hand-squre-side);
`;

const TitleFirstLine = styled.rect`
  x: calc(var(--hero-hand-squre-side) + var(--margin-right-of-hero-hand));
  y: 16px;
  rx: 4px;
  ry: 4px;
  width: calc(100% - var(--hero-hand-squre-side) - 32px);
  height: var(--title-height);
`;

const TitleSecondLine = styled.rect`
  x: calc(var(--hero-hand-squre-side) + var(--margin-right-of-hero-hand));
  y: calc(16px + var(--title-line-height));
  rx: 4px;
  ry: 4px;
  width: calc(100% - var(--hero-hand-squre-side) - 64px);
  height: var(--title-height);
`;

const TitleThirdLine = styled.rect`
  x: calc(var(--hero-hand-squre-side) + var(--margin-right-of-hero-hand));
  y: calc(16px + var(--title-line-height) * 2);
  rx: 4px;
  ry: 4px;
  width: calc(100% - var(--hero-hand-squre-side) - 48px);
  height: var(--title-height);
`;

const LikeIcon = styled.rect`
  x: calc(8px + 16px);
  y: calc(var(--hero-hand-squre-side) + 4px + 16px);
  rx: 2px;
  ry: 2px;
  width: var(--like-icon-size);
  height: var(--like-icon-size);
`;

const LikeNumber = styled.rect`
  x: calc(8px + 16px + 4px + var(--like-icon-size) + 4px);
  y: calc(var(--hero-hand-squre-side) + 4px + 16px + 4px);
  rx: 2px;
  ry: 2px;
  width: 24px;
  height: 16px;
`;

const PlayAtTitle = styled.rect`
  x: calc(100% / 5);
  y: calc(var(--hero-hand-squre-side) + 16px);
  rx: 3px;
  ry: 3px;
  width: var(--attribute-width);
  height: var(--attribute-height);
`;

const EndedAtTitle = styled.rect`
  x: calc(100% / 5 * 2);
  y: calc(var(--hero-hand-squre-side) + 16px);
  rx: 3px;
  ry: 3px;
  width: var(--attribute-width);
  height: var(--attribute-height);
`;

const FinalPotTitle = styled.rect`
  x: calc(100% / 5 * 3);
  y: calc(var(--hero-hand-squre-side) + 16px);
  rx: 3px;
  ry: 3px;
  width: var(--attribute-width);
  height: var(--attribute-height);
`;

const PostedTitle = styled.rect`
  x: calc(100% / 5 * 4);
  y: calc(var(--hero-hand-squre-side) + 16px);
  rx: 3px;
  ry: 3px;
  width: var(--attribute-width);
  height: var(--attribute-height);
`;

const PlayAtValue = styled.rect`
  x: calc(100% / 5);
  y: calc(var(--hero-hand-squre-side) + 16px + 12px + 6px);
  rx: 3px;
  ry: 3px;
  width: var(--attribute-width);
  height: var(--attribute-height);
`;

const EndedAtValue = styled.rect`
  x: calc(100% / 5 * 2);
  y: calc(var(--hero-hand-squre-side) + 16px + 12px + 6px);
  rx: 3px;
  ry: 3px;
  width: var(--attribute-width);
  height: var(--attribute-height);
`;

const FinalPotValue = styled.rect`
  x: calc(100% / 5 * 3);
  y: calc(var(--hero-hand-squre-side) + 16px + 12px + 6px);
  rx: 3px;
  ry: 3px;
  width: var(--attribute-width);
  height: var(--attribute-height);
`;

const PostedValue = styled.rect`
  x: calc(100% / 5 * 4);
  y: calc(var(--hero-hand-squre-side) + 16px + 12px + 6px);
  rx: 3px;
  ry: 3px;
  width: var(--attribute-width);
  height: var(--attribute-height);
`;
