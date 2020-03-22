import * as React from "react";
import styled from "styled-components";
import { MOBILE_MEDIA } from "../../constants/mediaquery";
import BetSizeInput from "../../components/BetSizeInput";
import Button, { ButtonVariant } from "../../components/Button";
import FootBar from "../../components/FootBar";
import HeadBar from "../../components/HeadBar";
import Option from "../../components/Select/Option";
import Select from "../../components/Select";
import SelectablePlayingCard from "../../components/SelectablePlayingCard";
import StreetActionSelector from "../../components/StreetActionSelector";
import TextArea from "../../components/TextArea";
import TextInput from "../../components/TextInput";
import { TextInputSize } from "../../components/TextInput/TextInput";
import { GameType } from "../../models/GameSituation";

export default function CreateNewPostPage() {
  return (
    <>
      <HeadBar />

      <Main>
        <Title>Creating a New Post</Title>

        <PartTitle>Title</PartTitle>
        <TextInput
          size={TextInputSize.large}
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
          <Select>
            <Option value={"2"}>2 players</Option>
            <Option value={"3"}>3 players</Option>
            <Option value={"4"}>4 players</Option>
            <Option value={"5"}>5 players</Option>
            <Option value={"6"}>6 players</Option>
            <Option value={"7"}>7 players</Option>
            <Option value={"8"}>8 players</Option>
            <Option value={"9"}>9 players</Option>
            <Option value={"10"}>10 players</Option>
          </Select>
          <Select>
            <Option value={GameType.cash}>{GameType.cash}</Option>
            <Option value={GameType.tournament}>{GameType.tournament}</Option>
          </Select>
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
            <Select>
              <Option value="sb">SB</Option>
              <Option value="bb">BB</Option>
              <Option value="utg">UTG</Option>
              <Option value="ep2">EP2</Option>
              <Option value="mp1">MP1</Option>
              <Option value="mp2">MP2</Option>
              <Option value="mp3">MP3</Option>
              <Option value="lp1">LP1</Option>
              <Option value="lp2">LP2</Option>
              <Option value="btn">BTN</Option>
            </Select>
          </div>
        </YourCardSAndPosition>

        <PartTitle>Preflop</PartTitle>
        <PlayerActions>
          <SmallTitle>UTG:</SmallTitle>
          <div>
            <StreetActionSelector />
          </div>
          <SmallTitle>EP2:</SmallTitle>
          <div>
            <StreetActionSelector />
          </div>
          <SmallTitle>MP1:</SmallTitle>
          <div>
            <StreetActionSelector />
          </div>
          <SmallTitle>MP2:</SmallTitle>
          <div>
            <StreetActionSelector />
          </div>
          <SmallTitle>MP3:</SmallTitle>
          <div>
            <StreetActionSelector />
          </div>
          <SmallTitle>LP1:</SmallTitle>
          <div>
            <StreetActionSelector />
          </div>
          <SmallTitle>LP2:</SmallTitle>
          <div>
            <StreetActionSelector />
          </div>
          <SmallTitle>BTN:</SmallTitle>
          <div>
            <StreetActionSelector />
          </div>
          <SmallTitle>SB(You):</SmallTitle>
          <div>
            <StreetActionSelector />
          </div>
          <SmallTitle>BB:</SmallTitle>
          <div>
            <StreetActionSelector />
          </div>
        </PlayerActions>

        <PartTitle>
          Flop <SmallTitle>(X players)</SmallTitle>
        </PartTitle>

        <CommunityCardsArea>
          <SmallTitle>Cards:</SmallTitle>
          <CommunityCards>
            <SelectablePlayingCard />
            <SelectablePlayingCard />
            <SelectablePlayingCard />
          </CommunityCards>
        </CommunityCardsArea>

        <PlayerActions>
          <SmallTitle>SB(You):</SmallTitle>
          <div>
            <StreetActionSelector />
          </div>
          <SmallTitle>BB:</SmallTitle>
          <div>
            <StreetActionSelector />
          </div>
          <SmallTitle>UTG:</SmallTitle>
          <div>
            <StreetActionSelector />
          </div>
          <SmallTitle>EP2:</SmallTitle>
          <div>
            <StreetActionSelector />
          </div>
          <SmallTitle>MP1:</SmallTitle>
          <div>
            <StreetActionSelector />
          </div>
          <SmallTitle>MP2:</SmallTitle>
          <div>
            <StreetActionSelector />
          </div>
          <SmallTitle>MP3:</SmallTitle>
          <div>
            <StreetActionSelector />
          </div>
          <SmallTitle>LP1:</SmallTitle>
          <div>
            <StreetActionSelector />
          </div>
          <SmallTitle>LP2:</SmallTitle>
          <div>
            <StreetActionSelector />
          </div>
          <SmallTitle>BTN:</SmallTitle>
          <div>
            <StreetActionSelector />
          </div>
        </PlayerActions>

        <PartTitle>
          Turn <SmallTitle>(Heads-up)</SmallTitle>
        </PartTitle>

        <CommunityCardsArea>
          <SmallTitle>Card:</SmallTitle>
          <div>
            <SelectablePlayingCard />
          </div>
        </CommunityCardsArea>

        <PlayerActions>
          <SmallTitle>SB(You):</SmallTitle>
          <div>
            <StreetActionSelector />
          </div>
          <SmallTitle>BB:</SmallTitle>
          <div>
            <StreetActionSelector />
          </div>
          <SmallTitle>UTG:</SmallTitle>
          <div>
            <StreetActionSelector />
          </div>
          <SmallTitle>EP2:</SmallTitle>
          <div>
            <StreetActionSelector />
          </div>
          <SmallTitle>MP1:</SmallTitle>
          <div>
            <StreetActionSelector />
          </div>
          <SmallTitle>MP2:</SmallTitle>
          <div>
            <StreetActionSelector />
          </div>
          <SmallTitle>MP3:</SmallTitle>
          <div>
            <StreetActionSelector />
          </div>
          <SmallTitle>LP1:</SmallTitle>
          <div>
            <StreetActionSelector />
          </div>
          <SmallTitle>LP2:</SmallTitle>
          <div>
            <StreetActionSelector />
          </div>
          <SmallTitle>BTN:</SmallTitle>
          <div>
            <StreetActionSelector />
          </div>
        </PlayerActions>

        <PartTitle>
          River <SmallTitle>(Heads-up)</SmallTitle>
        </PartTitle>

        <CommunityCardsArea>
          <SmallTitle>Card:</SmallTitle>
          <div>
            <SelectablePlayingCard />
          </div>
        </CommunityCardsArea>

        <PlayerActions>
          <SmallTitle>SB(You):</SmallTitle>
          <div>
            <StreetActionSelector />
          </div>
          <SmallTitle>BB:</SmallTitle>
          <div>
            <StreetActionSelector />
          </div>
          <SmallTitle>UTG:</SmallTitle>
          <div>
            <StreetActionSelector />
          </div>
          <SmallTitle>EP2:</SmallTitle>
          <div>
            <StreetActionSelector />
          </div>
          <SmallTitle>MP1:</SmallTitle>
          <div>
            <StreetActionSelector />
          </div>
          <SmallTitle>MP2:</SmallTitle>
          <div>
            <StreetActionSelector />
          </div>
          <SmallTitle>MP3:</SmallTitle>
          <div>
            <StreetActionSelector />
          </div>
          <SmallTitle>LP1:</SmallTitle>
          <div>
            <StreetActionSelector />
          </div>
          <SmallTitle>LP2:</SmallTitle>
          <div>
            <StreetActionSelector />
          </div>
          <SmallTitle>BTN:</SmallTitle>
          <div>
            <StreetActionSelector />
          </div>
        </PlayerActions>

        <PartTitle>
          Showdown <SmallTitle>(Total pot: 1405 BB)</SmallTitle>
        </PartTitle>

        <PlayersHand>
          <SmallTitle>SB(You):</SmallTitle>
          <PlayerHand>
            <SelectablePlayingCard />
            <SelectablePlayingCard />
          </PlayerHand>
          <SmallTitle>BB:</SmallTitle>
          <PlayerHand>
            <SelectablePlayingCard />
            <SelectablePlayingCard />
          </PlayerHand>
          <SmallTitle>UTG:</SmallTitle>
          <PlayerHand>
            <SelectablePlayingCard />
            <SelectablePlayingCard />
          </PlayerHand>
          <SmallTitle>EP2:</SmallTitle>
          <PlayerHand>
            <SelectablePlayingCard />
            <SelectablePlayingCard />
          </PlayerHand>
          <SmallTitle>MP1:</SmallTitle>
          <PlayerHand>
            <SelectablePlayingCard />
            <SelectablePlayingCard />
          </PlayerHand>
          <SmallTitle>MP2:</SmallTitle>
          <PlayerHand>
            <SelectablePlayingCard />
            <SelectablePlayingCard />
          </PlayerHand>
          <SmallTitle>MP3:</SmallTitle>
          <PlayerHand>
            <SelectablePlayingCard />
            <SelectablePlayingCard />
          </PlayerHand>
          <SmallTitle>LP1:</SmallTitle>
          <PlayerHand>
            <SelectablePlayingCard />
            <SelectablePlayingCard />
          </PlayerHand>
          <SmallTitle>LP2:</SmallTitle>
          <PlayerHand>
            <SelectablePlayingCard />
            <SelectablePlayingCard />
          </PlayerHand>
          <SmallTitle>BTN:</SmallTitle>
          <PlayerHand>
            <SelectablePlayingCard />
            <SelectablePlayingCard />
          </PlayerHand>
        </PlayersHand>

        <SubmitSection>
          <Button variant={ButtonVariant.secondary}>Cancel</Button>
          <Button variant={ButtonVariant.primary}>Leave a Post</Button>
        </SubmitSection>
      </Main>
      <FootBar />
    </>
  );
}

const Main = styled.main`
  width: 80%;
  margin: 0 auto;

  ${MOBILE_MEDIA} {
    width: 95%;
  }
`;

const Title = styled.h1`
  font-family: inherit;
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

const PlayerActions = styled.div`
  display: grid;
  grid-template-columns: 90px 1fr;
  grid-gap: 16px;

  & > span {
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }

  ${MOBILE_MEDIA} {
    grid-template-columns: 1fr;

    & > span {
      display: inline-block;
    }
  }
`;

const CommunityCardsArea = styled.section`
  display: grid;
  grid-template-columns: 90px 200px;
  grid-gap: 16px;
  margin-bottom: 32px;

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
    grid-template-columns: 40px 1fr;
  }
`;

const CommunityCards = styled.div`
  & > div:first-child,
  & > div:nth-child(2) {
    margin-right: 8px;
  }
`;

const PlayersHand = styled.div`
  display: grid;
  grid-template-columns: 90px 150px;
  grid-gap: 16px;

  & > span {
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }

  ${MOBILE_MEDIA} {
    grid-template-columns: 60px 1fr;
  }
`;

const SubmitSection = styled.section`
  display: flex;
  justify-content: flex-end;
  margin: 120px 0;

  & > button {
    margin: 16px;
  }

  ${MOBILE_MEDIA} {
    margin: 60px 0;

    & > button {
      margin: 8px;
    }
  }
`;
