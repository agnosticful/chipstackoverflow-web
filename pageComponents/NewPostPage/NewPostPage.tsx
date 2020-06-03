import * as React from "react";
import styled from "styled-components";
import BetSizeInput from "@@/components/BetSizeInput";
import Button, { ButtonVariant } from "@@/components/Button";
import HeadBar from "@@/components/HeadBar";
import PlayingCard from "@@/components/PortraitPlayingCard";
import TextArea from "@@/components/TextArea";
import TextInput, { TextInputSize } from "@@/components/TextInput";
import { MOBILE_MEDIA } from "@@/constants/mediaquery";
import useAnalytics from "@@/hooks/useAnalytics";
import useAuthentication from "@@/hooks/useAuthentication";
import usePostCreation from "@@/hooks/usePostCreation";
import useMyself from "@@/hooks/useMyself";
import { HandStreet } from "@@/models/Hand";
import GameTypeSelect from "./GameTypeSelect";
import HeroPositionSelect from "./HeroPositionSelect";
import PlayerActionSelectors from "./PlayerActionSelectors";
import PlayerLengthSelect from "./PlayerLengthSelect";

export default function NewPostPage() {
  const { signIn, signOut } = useAuthentication();
  const { trackEvent } = useAnalytics();
  const { myself, isLoading: isMyselfLoading } = useMyself();

  const { post } = usePostCreation();

  return (
    <Root>
      <_HeadBar
        user={myself ?? undefined}
        authenticationChecking={isMyselfLoading}
        onSignInButtonClick={() => {
          signIn();

          trackEvent("sign_in_click", {
            object_id: "head_bar_sign_in_button",
          });
        }}
        onSignOutButtonClick={() => {
          signOut();

          trackEvent("sign_out_click", {
            object_id: "head_bar_sign_out_button",
          });
        }}
      />

      <Content>
        <Headline>Create a New Post</Headline>

        <SectionTitle>Title</SectionTitle>
        <TextInput
          size={TextInputSize.large}
          placeholder="e.g. I called to a fullhouse. What should I have done?"
        />

        <SectionTitle>What you want to review?</SectionTitle>
        <TextArea placeholder="e.g. That was tough situation. 1 BB is 0.5 USD at the time. So I needed to call for 702 USD at the end." />

        <SectionTitle>Game Situation</SectionTitle>
        <GameSituation>
          <PlayerLengthSelect />
          <GameTypeSelect />
        </GameSituation>

        <SectionTitle>Blinds and Anti</SectionTitle>
        <Blinds>
          Small Blind:&nbsp;
          <BetSizeInput defaultValue={0} />
          Big Blind:&nbsp;
          <BetSizeInput defaultValue={1} disabled />
          Anti:&nbsp;
          <BetSizeInput defaultValue={0} />
        </Blinds>

        <SectionTitle>Your cards and position</SectionTitle>
        <HeroInfo>
          You have:&nbsp;
          <PlayingCard />
          <PlayingCard />
          at:&nbsp;
          <HeroPositionSelect playerLength={2} />
        </HeroInfo>

        <SectionTitle>Preflop</SectionTitle>
        <PlayerActionSelectors
          playerLength={post.playerLength}
          street={HandStreet.preflop}
          playerActions={post.preflop}
        />

        {0 < post.flop.length ? (
          <>
            <SectionTitle>Flop</SectionTitle>
            <PlayerActionSelectors
              playerLength={post.playerLength}
              street={HandStreet.flop}
              playerActions={post.flop}
            />
          </>
        ) : null}

        {0 < post.flop.length ? (
          <>
            <SectionTitle>Turn</SectionTitle>
            <PlayerActionSelectors
              playerLength={post.playerLength}
              street={HandStreet.turn}
              playerActions={post.turn}
            />
          </>
        ) : null}

        {0 < post.flop.length ? (
          <>
            <SectionTitle>River</SectionTitle>
            <PlayerActionSelectors
              playerLength={post.playerLength}
              street={HandStreet.river}
              playerActions={post.river}
            />
          </>
        ) : null}

        <Actions>
          <Button variant={ButtonVariant.secondary}>Cancel</Button>
          <Button>Leave a Post</Button>
        </Actions>
      </Content>
    </Root>
  );
}

const Root = styled.div`
  display: grid;
  min-width: 375px;
  grid-template-columns: minmax(64px, auto) minmax(375px, 1024px) minmax(
      64px,
      auto
    );
  grid-template-areas: "header header header" ". content .";
`;

const _HeadBar = styled(HeadBar)`
  grid-area: header;
`;

const Content = styled.section`
  grid-area: content;
  padding: 64px 0 128px;
`;

const Headline = styled.h2`
  margin-bottom: 32px;
  font-size: 32px;

  ${MOBILE_MEDIA} {
    font-size: 24px;
  }
`;

const SectionTitle = styled.h3`
  margin-top: 24px;
  margin-bottom: 16px;
  font-size: 20px;
`;

const GameSituation = styled.div`
  display: flex;

  & > div:first-child {
    margin-right: 16px;
  }
`;

const Blinds = styled.div`
  display: flex;
  align-items: center;

  & > div {
    margin-right: 16px;
  }
`;

const HeroInfo = styled.div`
  display: flex;
  align-items: center;

  & > * {
    margin-right: 16px;
  }
`;

const Actions = styled.div`
  display: flex;
  justify-content: flex-end;

  & > button:first-child {
    margin-right: 16px;
  }
`;
