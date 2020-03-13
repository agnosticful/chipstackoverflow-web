import { Popover } from "antd";
import * as React from "react";
import styled from "styled-components";
import {
  SPADE_COLOR,
  HEART_COLOR,
  DIAMOND_COLOR,
  CLUB_COLOR
} from "../constants/color";
import PlayingCard, { Rank, Suit } from "../models/PlayingCard";
import SuitIcon from "./SuitIcon";
import RankIcon from "./RankIcon";

interface Props extends React.Attributes {
  initialValue?: PlayingCard;
  onChange?: (playingCard: { rank: Rank; suit: Suit }) => void;
  children?: React.ReactNode;
}

export default function PlayingCardSelector({
  initialValue,
  onChange = () => {},
  children
}: Props) {
  const [rank, setRank] = React.useState(
    initialValue ? initialValue.rank : Rank.ace
  );
  const [suit, setSuit] = React.useState(
    initialValue ? initialValue.suit : Suit.spade
  );

  return (
    <Popover
      content={
        <Content>
          <SuitButtons>
            {SUITS.map(s => (
              <SuitButton
                suit={s}
                active={s === suit}
                onClick={() => {
                  setSuit(s);
                  onChange({ rank, suit: s });
                }}
              >
                <SuitButtonIcon suit={s} />
              </SuitButton>
            ))}
          </SuitButtons>

          <RankButtons>
            {RANKS.map(r => (
              <RankButton
                suit={suit}
                active={r === rank}
                onClick={() => {
                  setRank(r);
                  onChange({ rank: r, suit });
                }}
              >
                <RankButtonIcon suit={suit} rank={r} />
              </RankButton>
            ))}
          </RankButtons>
        </Content>
      }
      trigger="click"
      placement="topLeft"
      arrowPointAtCenter
    >
      {children}
    </Popover>
  );
}

const Content = styled.div`
  position: relative;
  padding-top: 36px;
`;

const SuitButtons = styled.div`
  position: absolute;
  top: -12px;
  left: -16px;
  display: grid;
  grid-template-columns: repeat(4, 25%);
  width: calc(100% + 32px);
`;

const SuitButton = styled.div<{ suit: Suit; active: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 40px;
  cursor: pointer;

  background-color: ${({ suit, active }) =>
    active ? `${SUIT_COLORS[suit]}1f` : "transparent"};

  :hover {
    background-color: ${({ suit }) => SUIT_COLORS[suit]}1f;
  }
`;

const RankButtons = styled.div`
  display: grid;
  grid-template-columns: repeat(7, auto);
`;

const RankButton = styled.div<{ suit: Suit; active: boolean }>`
  padding: 8px 8px 0px 8px;
  border-radius: 4px;
  cursor: pointer;

  background-color: ${({ suit, active }) =>
    active ? `${SUIT_COLORS[suit]}1f` : "transparent"};

  :hover {
    background-color: ${({ suit }) => SUIT_COLORS[suit]}1f;
  }
`;

const RankButtonIcon = styled(RankIcon)`
  width: 20px;
`;

const SuitButtonIcon = styled(SuitIcon)`
  width: 24px;
  height: 24px;
`;

const RANKS = [
  Rank.ace,
  Rank.deuce,
  Rank.three,
  Rank.four,
  Rank.five,
  Rank.six,
  Rank.seven,
  Rank.eight,
  Rank.nine,
  Rank.ten,
  Rank.jack,
  Rank.queen,
  Rank.king
];

const SUITS = [Suit.spade, Suit.heart, Suit.diamond, Suit.club];

const SUIT_COLORS: Record<Suit, string> = {
  [Suit.spade]: SPADE_COLOR,
  [Suit.heart]: HEART_COLOR,
  [Suit.diamond]: DIAMOND_COLOR,
  [Suit.club]: CLUB_COLOR
};
