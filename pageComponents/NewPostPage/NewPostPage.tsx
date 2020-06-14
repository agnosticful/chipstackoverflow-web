import { useRouter } from "next/router";
import * as React from "react";
import styled from "styled-components";
import BetSizeInput from "@@/components/BetSizeInput";
import Button, { ButtonVariant } from "@@/components/Button";
import HeadBar from "@@/components/HeadBar";
import SelectablePlayingCard from "@@/components/SelectablePlayingCard";
import TextArea from "@@/components/TextArea";
import TextInput, { TextInputSize } from "@@/components/TextInput";
import { MOBILE_MEDIA } from "@@/constants/mediaquery";
import useAnalytics from "@@/hooks/useAnalytics";
import useAuthentication from "@@/hooks/useAuthentication";
import usePostCreation from "@@/hooks/usePostCreation";
import useMyself from "@@/hooks/useMyself";
import GameTypeSelect from "./GameTypeSelect";
import HeroPositionSelect from "./HeroPositionSelect";
import PlayerLengthSelect from "./PlayerLengthSelect";
import PlayerStackSizeInputs from "./PlayerStackSizeInput";
import StreetActionInput from "./StreetActionInput";
import PlayerHandSelectors from "./PlayerHandSelectors";

export default function NewPostPage() {
  const { signIn, signOut } = useAuthentication();
  const { trackEvent } = useAnalytics();
  const { myself, isLoading: isMyselfLoading } = useMyself();
  const router = useRouter();

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

        <ItemTitle>Title</ItemTitle>
        <TextInput
          size={TextInputSize.large}
          placeholder='e.g. I called to a fullhouse. What should I have done?'
        />

        <ItemTitle>What you want to review?</ItemTitle>
        <TextArea placeholder='e.g. That was tough situation. 1 BB is 0.5 USD at the time. So I needed to call for 702 USD at the end.' />

        <ItemTitle>Game Type</ItemTitle>
        <GameTypeSelect />

        <ItemTitle>Number of Player</ItemTitle>
        <PlayerLengthSelect />

        <SectionTitle>Stack Sizes</SectionTitle>
        <PlayerStackSizeInputs playerStackSizes={post.playerStackSizes} />

        <SectionTitle>{`Blinds & Anti`}</SectionTitle>
        <Blinds>
          <HorizontalLabel>
            <HorizontalItemTitle>Small:</HorizontalItemTitle>
            <BetSizeInput defaultValue={0} />
          </HorizontalLabel>

          <HorizontalLabel>
            <HorizontalItemTitle>Big:</HorizontalItemTitle>
            <BetSizeInput defaultValue={1} disabled />
          </HorizontalLabel>

          <HorizontalLabel>
            <HorizontalItemTitle>Anti:</HorizontalItemTitle>
            <BetSizeInput defaultValue={0} />
          </HorizontalLabel>
        </Blinds>

        <SectionTitle>Your cards and position</SectionTitle>
        <HeroInfo>
          <HorizontalLabel>
            <HorizontalItemTitle>Hand:</HorizontalItemTitle>
            <HeroHand>
              <_SelectablePlayingCard />
              <_SelectablePlayingCard />
            </HeroHand>
          </HorizontalLabel>

          <HorizontalLabel>
            <HorizontalItemTitle>at:</HorizontalItemTitle>
            <HeroPositionSelect playerLength={2} />
          </HorizontalLabel>
        </HeroInfo>

        <SectionTitle>Preflop</SectionTitle>
        <StreetActionInput
          playerLength={post.playerLength}
          actions={post.preflop}
        />

        {0 < post.flop.length ? (
          <>
            <SectionTitle>Flop</SectionTitle>
            <StreetActionInput
              playerLength={post.playerLength}
              actions={post.flop}
            />
          </>
        ) : null}

        {0 < post.flop.length ? (
          <>
            <SectionTitle>Turn</SectionTitle>
            <StreetActionInput
              playerLength={post.playerLength}
              actions={post.turn}
            />
          </>
        ) : null}

        {0 < post.flop.length ? (
          <>
            <SectionTitle>River</SectionTitle>
            <StreetActionInput
              playerLength={post.playerLength}
              actions={post.river}
            />
          </>
        ) : null}

        {0 < post.showdownActivePlayer.length ? (
          <>
            <SectionTitle>Showdown</SectionTitle>
            <PlayerHandSelectors
              playerLength={post.playerLength}
              playerHands={post.playerHands}
              activePlayerIndexes={post.showdownActivePlayer}
            />
          </>
        ) : null}

        <Actions>
          <Button
            variant={ButtonVariant.secondary}
            onClick={() => {
              router.replace("/new", "/");
            }}
          >
            Cancel
          </Button>
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
  font-size: 40px;
`;

const SectionTitle = styled.h3`
  margin: 64px 0 16px;
  font-size: 32px;

  ${MOBILE_MEDIA} {
    font-size: 24px;
  }
`;

const ItemTitle = styled.label`
  display: block;
  margin-top: 24px;
  margin-bottom: 8px;
  font-size: 16px;
  font-weight: 500;
`;

const HorizontalLabel = styled.div`
  display: flex;
  margin-right: 16px;
  align-items: center;

  &:last-child {
    margin-right: 0;
  }

  ${MOBILE_MEDIA} {
    margin-right: 0;
    margin-bottom: 16px;

    &:last-child {
      margin-bottom: 0;
    }
  }
`;

const HorizontalItemTitle = styled.label`
  display: block;
  width: 50px;
  margin-right: 8px;
  text-align: right;
  font-size: 16px;
  font-weight: 500;
`;

const Blinds = styled.div`
  display: flex;
  align-items: center;

  ${MOBILE_MEDIA} {
    flex-direction: column;
    align-items: flex-start;
  }
`;

const HeroInfo = styled.div`
  display: flex;
  align-items: center;

  & > * {
    margin-right: 16px;
  }

  ${MOBILE_MEDIA} {
    flex-direction: column;
    align-items: flex-start;

    & > * {
      margin-right: 0;
    }
  }
`;

const HeroHand = styled.div`
  & > div:first-child {
    margin-right: 8px;
  }
`;

const _SelectablePlayingCard = styled(SelectablePlayingCard)`
  width: 48px;
`;

const Actions = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 80px;

  & > button:first-child {
    margin-right: 16px;
  }
`;
