import Tippy from "@tippyjs/react";
import * as React from "react";
import styled from "styled-components";
import {
  SPADE_COLOR,
  HEART_COLOR,
  DIAMOND_COLOR,
  CLUB_COLOR
} from "../../constants/color";
import { Rank, Suit } from "../../models/PlayingCard";
import SuitIcon from "../SuitIcon";
import RankIcon from "../RankIcon";

interface Props extends React.Attributes {
  initialRank?: Rank;
  initialSuit?: Suit;
  onChange?: (playingCard: { rank: Rank; suit: Suit }) => void;
  className?: string;
  /** The className will be attached on the popover element. */
  popoverClassName?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
}

/**
 * An UI component to select rank and suit for a playing card.
 */
export default function PlayingCardSelector({
  initialRank = Rank.ace,
  initialSuit = Suit.spade,
  onChange = () => {},
  popoverClassName,
  children,
  ...props
}: Props) {
  const [rank, setRank] = React.useState(initialRank);
  const [suit, setSuit] = React.useState(initialSuit);
  const [isPopoverShown, setPopoverShown] = React.useState(false);
  const onRequestShow = React.useCallback(() => setPopoverShown(true), []);
  const onRequestHide = React.useCallback(() => setPopoverShown(false), []);

  return (
    <_Tippy
      theme="light"
      animation="shift-away-subtle"
      trigger="manual"
      interactive
      placement="top-start"
      arrow
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
      visible={isPopoverShown}
      onHide={onRequestHide}
      className={popoverClassName}
    >
      <Wrapper onClick={onRequestShow} {...props}>
        {children}
      </Wrapper>
    </_Tippy>
  );
}

const _Tippy = styled(Tippy)`
  padding: 0;

  & > .tippy-content {
    padding: 0;
  }
`;

const Content = styled.div`
  position: relative;
`;

const Wrapper = styled.div`
  display: inline-block;
`;

const SuitButtons = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 25%);
  width: 100%;
`;

const SuitButton = styled.div<{ suit: Suit; active: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 48px;
  cursor: pointer;
  background-color: ${({ suit, active }) =>
    active ? `${SUIT_COLORS[suit]}1f` : "transparent"};

  :first-of-type {
    border-top-left-radius: 4px;
  }

  :last-of-type {
    border-top-right-radius: 4px;
  }

  :hover {
    background-color: ${({ suit }) => SUIT_COLORS[suit]}1f;
  }
`;

const RankButtons = styled.div`
  display: grid;
  grid-template-columns: repeat(7, auto);
  padding: 16px;
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
