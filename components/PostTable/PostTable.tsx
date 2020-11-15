import * as React from "react";
import styled from "styled-components";
import { MOBILE_MEDIA } from "@@/constants/mediaquery";

interface Props extends React.Attributes {
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactElement[];
}

/**
 * Write a description here.
 */
export default function PostTable({ children, ...props }: Props) {
  return (
    <Root {...props}>
      <HeadRow {...props}>
        <HeroCardsHeadCell></HeroCardsHeadCell>

        <TitleHeadCell>Title</TitleHeadCell>

        <LikesHeadCell>Likes</LikesHeadCell>

        <CommunityCardsHeadCell>Board</CommunityCardsHeadCell>

        <HeroPositionHeadCell>Position</HeroPositionHeadCell>

        <FinalPotSizeHeadCell>Final Pot</FinalPotSizeHeadCell>

        <CreationDateHeadCell>Created</CreationDateHeadCell>
      </HeadRow>

      {children}
    </Root>
  );
}

const Root = styled.div`
  --grid-template-columns: 100px minmax(256px, 1fr) 80px 116px 60px 80px 120px;
  --grid-template-areas: "hero-cards title likes community-cards hero-position final-pot-size creation-date";
  --column-gap: 24px;
  --header-font-size: 14px;
  --cell-font-size: 16px;
  width: 100%;
  padding: 8px 0;
  border-radius: 4px;
  box-shadow: 0px 0px 12px #222f3e1f, 0px 12px 24px #222f3e0f;
  overflow-x: scroll;
  user-select: none;

  ${MOBILE_MEDIA} {
    --grid-template-columns: 80px minmax(128px, 1fr) 72px 100px 52px 64px 100px;
    --column-gap: 16px;
    --header-font-size: 12px;
    --cell-font-size: 14px;
  }
`;

const HeadRow = styled.div`
  display: grid;
  grid-template-columns: var(--grid-template-columns);
  grid-template-areas: var(--grid-template-areas);
  align-items: center;
  column-gap: var(--column-gap);
  padding: 8px var(--column-gap);
  text-decoration: none;
`;

const HeroCardsHeadCell = styled.div`
  grid-area: hero-cards;
`;

const TitleHeadCell = styled.div`
  grid-area: title;
  color: #576574;
  font-size: var(--header-font-size);
  font-weight: bold;
  text-transform: uppercase;
`;

const LikesHeadCell = styled.div`
  grid-area: likes;
  color: #576574;
  font-size: var(--header-font-size);
  font-weight: bold;
  text-transform: uppercase;
`;

const CommunityCardsHeadCell = styled.div`
  grid-area: community-cards;
  color: #576574;
  font-size: var(--header-font-size);
  font-weight: bold;
  text-transform: uppercase;
`;

const HeroPositionHeadCell = styled.div`
  grid-area: hero-position;
  color: #576574;
  font-size: var(--header-font-size);
  font-weight: bold;
  text-transform: uppercase;
`;

const FinalPotSizeHeadCell = styled.div`
  grid-area: final-pot-size;
  color: #576574;
  font-size: var(--header-font-size);
  font-weight: bold;
  text-transform: uppercase;
`;

const CreationDateHeadCell = styled.div`
  grid-area: creation-date;
  color: #576574;
  font-size: var(--header-font-size);
  font-weight: bold;
  text-transform: uppercase;
`;
