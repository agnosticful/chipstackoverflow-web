import * as React from "react";
import styled from "styled-components";
import { MOBILE_MEDIA } from "../../constants/mediaquery";
import BetSizeInput from "../../components/BetSizeInput";
import Button, { ButtonVariant } from "../../components/Button";
import SelectablePlayingCard from "../../components/SelectablePlayingCard";
import TextArea from "../../components/TextArea";
import TextInput from "../../components/TextInput";
import { TextInputSize } from "../../components/TextInput/TextInput";
import useCreatePost from "../../hooks/useCreatePost";
import FlopActions from "./FlopActions";
import GameTypeSelect from "./GameTypeSelect";
import HeroPositionSelect from "./HeroPositionSelect";
import PlayerLengthSelect from "./PlayerLengthSelect";
import PreflopActions from "./PreflopActions";
import RiverActions from "./RiverActions";
import Showdown from "./Showdown";
import TurnActions from "./TurnActions";

export default function NewPostForm() {
  const {
    preflop,
    flop,
    turn,
    river,
    totalPotSize,
    comunityCards,
    showdown,
  } = useCreatePost();

  return (
    <>
      <Title>Creating a New Post</Title>

      <PartTitle>Title</PartTitle>
      <TextInputLarge
        size={TextInputSize.large}
        placeholder="e.g. I called to a fullhouse. What should I have done?"
      />
      <TextInputMedium
        size={TextInputSize.medium}
        placeholder="e.g. I called to a fullhouse. What should I have done?"
      />

      <PartTitle>What do you want to review?</PartTitle>
      <TextArea
        rows={5}
        maxRows={Infinity}
        resizable={false}
        placeholder="e.g. That was tough situation. 1 BB is 0.5 USD at the time. So I needed to call for 702 USD at the end."
      />

      <PartTitle>Game Situation</PartTitle>
      <GameSituation>
        <PlayerLengthSelect />
        <GameTypeSelect />
      </GameSituation>

      <PartTitle>Blinds and Anti</PartTitle>
      <BlindsAndAnti>
        <SmallTitle>Small Blind:</SmallTitle>
        <BetSizeInput placeholder="0.5" />
        <SmallTitle>Big Blind:</SmallTitle>
        <BetSizeInput defaultValue={1} />
        <SmallTitle>Anti:</SmallTitle>
        <BetSizeInput placeholder="0.2" />
      </BlindsAndAnti>

      <PartTitle>Your cards and position</PartTitle>
      <YourCardSAndPosition>
        <SmallTitle>You have:</SmallTitle>
        <PlayerHand>
          <SelectablePlayingCard />
          <SelectablePlayingCard />
        </PlayerHand>
        <SmallTitle>at:</SmallTitle>

        <div>
          <HeroPositionSelect />
        </div>
      </YourCardSAndPosition>

      <PreflopActions preflopActions={preflop} />

      <FlopActions communityCards={comunityCards.flop} flopActions={flop} />

      <TurnActions communityCard={comunityCards.turn} turnActions={turn} />

      <RiverActions communityCard={comunityCards.river} riverActions={river} />

      <Showdown totalPotSize={totalPotSize} playerCards={showdown} />

      <SubmitSection>
        <Button variant={ButtonVariant.secondary}>Cancel</Button>
        <Button variant={ButtonVariant.primary}>Leave a Post</Button>
      </SubmitSection>
    </>
  );
}

const Title = styled.h1`
  font-family: inherit;
  font-size: 32px;
`;

const PartTitle = styled.h2`
  font-family: inherit;
  margin-top: 80px;

  & > span {
    font-size: 16px;
    font-weight: 400;
  }

  ${MOBILE_MEDIA} {
    margin-top: 40px;
  }
`;

const SmallTitle = styled.span`
  font-family: inherit;
`;

const TextInputLarge = styled(TextInput)`
  display: block;

  ${MOBILE_MEDIA} {
    display: none;
  }
`;

const TextInputMedium = styled(TextInput)`
  display: none;

  ${MOBILE_MEDIA} {
    display: block;
  }
`;

const GameSituation = styled.section`
  display: grid;
  grid-template-columns: 200px 200px;
  grid-gap: 16px;

  ${MOBILE_MEDIA} {
    grid-template-columns: 200px;
    grid-template-rows: 1fr 1fr;
  }
`;

const BlindsAndAnti = styled.section`
  display: grid;
  grid-template-columns: 90px 100px 90px 100px 90px 100px;
  grid-gap: 16px;

  & > span {
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }

  ${MOBILE_MEDIA} {
    grid-template-columns: 90px 100px;
    grid-template-rows: 1fr 1fr 1fr;
  }
`;

const YourCardSAndPosition = styled.section`
  display: grid;
  grid-template-columns: 90px 150px 90px 150px;
  grid-gap: 16px;

  & > span {
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }

  & > div {
    display: flex;
    justify-content: start;
    align-items: center;
    height: 100%;
    width: 100%;
  }

  ${MOBILE_MEDIA} {
    grid-template-columns: 90px 150px;
    grid-template-rows: 1fr 1fr;
  }
`;

const PlayerHand = styled.div`
  & > div:first-child {
    margin-right: 8px;
  }
`;

const SubmitSection = styled.section`
  display: flex;
  justify-content: flex-end;
  margin-top: 120px;

  & > button {
    margin: 16px;
  }

  ${MOBILE_MEDIA} {
    margin-top: 60px;

    & > button {
      margin: 8px;
    }
  }
`;
