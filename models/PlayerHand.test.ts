import PlayingCard from "@@/models/PlayingCard";
import Rank from "@@/models/Rank";
import Suit from "@@/models/Suit";
import PlayerHand, {
  chooseBestStraightFlush,
  chooseBestFourOfAKind,
  chooseBestFullHouse,
  chooseBestFlush,
  chooseBestStraight,
  chooseBestThreeOfAKind,
  chooseBestTwoPairs,
  chooseBestOnePair,
  chooseBestHighCard,
  PlayerHandType,
} from "./PlayerHand";

describe("PlayerHand", () => {
  it("#cards are the chosen ones to make it hand", () => {
    expect(
      new PlayerHand({
        holeCards: toPlayingCards("3s2s") as any,
        communityCards: toPlayingCards("AsKd6s5s4s") as any,
      }).cards
    ).toEqual(toPlayingCards("6s5s4s3s2s"));

    expect(
      new PlayerHand({
        holeCards: toPlayingCards("AsKs") as any,
        communityCards: toPlayingCards("KhKd6s5s4s") as any,
      }).cards
    ).toEqual(toPlayingCards("AsKs6s5s4s"));

    expect(
      new PlayerHand({
        holeCards: toPlayingCards("As2s") as any,
        communityCards: toPlayingCards("Kd9s5h4s3s") as any,
      }).cards
    ).toEqual(toPlayingCards("As9s4s3s2s"));

    expect(
      new PlayerHand({
        holeCards: toPlayingCards("7h6d") as any,
        communityCards: toPlayingCards("Ad5h4s3s2h") as any,
      }).cards
    ).toEqual(toPlayingCards("7h6d5h4s3s"));
  });

  it("#type is an enum value that shows its type", () => {
    expect(
      new PlayerHand({
        holeCards: toPlayingCards("3s2s") as any,
        communityCards: toPlayingCards("KhKd6s5s4s") as any,
      }).type
    ).toBe(PlayerHandType.straightFlush);

    expect(
      new PlayerHand({
        holeCards: toPlayingCards("AsKs") as any,
        communityCards: toPlayingCards("KhKd6s5s4s") as any,
      }).type
    ).toBe(PlayerHandType.flush);

    expect(
      new PlayerHand({
        holeCards: toPlayingCards("As2s") as any,
        communityCards: toPlayingCards("Kd9s5h4s3s") as any,
      }).type
    ).toBe(PlayerHandType.flush);

    expect(
      new PlayerHand({
        holeCards: toPlayingCards("7h6d") as any,
        communityCards: toPlayingCards("Kd9s5h4s3s") as any,
      }).type
    ).toBe(PlayerHandType.straight);
  });

  it("#power is comparable that indicates its strongness", () => {
    expect(
      new PlayerHand({
        holeCards: toPlayingCards("3s2s") as any,
        communityCards: toPlayingCards("KhKd6s5s4s") as any,
      }).power
    ).toBeGreaterThan(
      new PlayerHand({
        holeCards: toPlayingCards("AsKs") as any,
        communityCards: toPlayingCards("KhKd6s5s4s") as any,
      }).power
    );

    expect(
      new PlayerHand({
        holeCards: toPlayingCards("As2s") as any,
        communityCards: toPlayingCards("Kd9s5h4s3s") as any,
      }).power
    ).toBeGreaterThan(
      new PlayerHand({
        holeCards: toPlayingCards("7h6d") as any,
        communityCards: toPlayingCards("Kd9s5h4s3s") as any,
      }).power
    );
  });
});

describe("chooseBestStraightFlush", () => {
  it.each<[string, string | null]>([
    ["AsKsQsJsTs9s8s", "AsKsQsJsTs"],
    ["AsKcQsJsTs9s8s", "QsJsTs9s8s"],
    ["AsQsJsTs9s8s7s", "QsJsTs9s8s"],
    ["AsQcJdTs9s8s7s", null],
  ])(`(%s) returns %s`, (arg, expected) => {
    const { cardsBySuit } = buildCards(toPlayingCards(arg)!);

    expect(chooseBestStraightFlush(cardsBySuit)).toEqual(
      toPlayingCards(expected)
    );
  });
});

describe("chooseBestFourOfAKind", () => {
  it.each<[string, string | null]>([
    ["AsAhAdAcKsQsJs", "AsAhAdAcKs"],
    ["AsAhAdKsKhKdKc", "KsKhKdKcAs"],
    ["AsAhAdKhKcKdQd", null],
  ])(`(%s) returns %s`, (arg, expected) => {
    const { cardsByRank } = buildCards(toPlayingCards(arg)!);

    expect(chooseBestFourOfAKind(cardsByRank)).toEqual(
      toPlayingCards(expected)
    );
  });
});

describe("chooseBestFullHouse", () => {
  it.each<[string, string | null]>([
    ["AhAdKsKhKdQsQh", "KsKhKdAhAd"],
    ["AsKsKhKcQsJhJd", "KsKhKcJhJd"],
    ["AsAhAcKhQsJh8s", null],
    ["AdKsKhKcTh9s5d", null],
  ])(`(%s) returns %s`, (arg, expected) => {
    const { cardsByRank } = buildCards(toPlayingCards(arg)!);

    expect(chooseBestFullHouse(cardsByRank)).toEqual(toPlayingCards(expected));
  });
});

describe("chooseBestFlush", () => {
  it.each<[string, string | null]>([
    ["AhAdKsKhQhJhTh", "AhKhQhJhTh"],
    ["AsKsJd8s7c6s2s", "AsKs8s6s2s"],
    ["AsAhKhKcQsQdJh", null],
  ])(`(%s) returns %s`, (arg, expected) => {
    const { cardsBySuit } = buildCards(toPlayingCards(arg)!);

    expect(chooseBestFlush(cardsBySuit)).toEqual(toPlayingCards(expected));
  });
});

describe("chooseBestStraight", () => {
  it.each<[string, string | null]>([
    ["AhAdKsKhQhJhTh", "AhKsQhJhTh"],
    ["AsJdTc9d8s7c6s", "JdTc9d8s7c"],
    ["AsAhKhKcQsQdJh", null],
  ])(`(%s) returns %s`, (arg, expected) => {
    const { cardsByRank } = buildCards(toPlayingCards(arg)!);

    expect(chooseBestStraight(cardsByRank)).toEqual(toPlayingCards(expected));
  });
});

describe("chooseBestThreeOfAKind", () => {
  it.each<[string, string | null]>([
    ["AhAdKsKhKdQsQh", "KsKhKdAhQs"],
    ["AsAhAcKhQsJh8s", "AsAhAcKhQs"],
    ["AdKsKhKcTh9s5d", "KsKhKcAdTh"],
    ["AhAdKsKhQsQhJc", null],
  ])(`(%s) returns %s`, (arg, expected) => {
    const { cardsByRank } = buildCards(toPlayingCards(arg)!);

    expect(chooseBestThreeOfAKind(cardsByRank)).toEqual(
      toPlayingCards(expected)
    );
  });
});

describe("chooseBestTwoPairs", () => {
  it.each<[string, string | null]>([
    ["AhAdKsKhKdQsQh", "AhAdKsKhQs"],
    ["KsTsTh9d8s8d5h", "TsTh8s8dKs"],
    ["AdKsKhKcTh9s5d", null],
  ])(`(%s) returns %s`, (arg, expected) => {
    const { cardsByRank } = buildCards(toPlayingCards(arg)!);

    expect(chooseBestTwoPairs(cardsByRank)).toEqual(toPlayingCards(expected));
  });
});

describe("chooseBestOnePair", () => {
  it.each<[string, string | null]>([
    ["KsTsTh9d8s8d5h", "TsThKs9d8s"],
    ["AdKsKhKcTh9s5d", "KsKhAdTh9s"],
    ["AdKsTh9s5s4s3s", null],
  ])(`(%s) returns %s`, (arg, expected) => {
    const { cardsByRank } = buildCards(toPlayingCards(arg)!);

    expect(chooseBestOnePair(cardsByRank)).toEqual(toPlayingCards(expected));
  });
});

describe("chooseBestHighCard", () => {
  it.each<[string, string | null]>([
    ["KsTsTh9d8s8d5h", "KsTs9d8s5h"],
    ["AdKsKhKcTh9s5d", "AdKsTh9s5d"],
    ["AdKsTh9s5s4s3s", "AdKsTh9s5s"],
  ])(`(%s) returns %s`, (arg, expected) => {
    const { cardsByRank } = buildCards(toPlayingCards(arg)!);

    expect(chooseBestHighCard(cardsByRank)).toEqual(toPlayingCards(expected));
  });
});

function toPlayingCards(value: string | null): PlayingCard[] | null {
  if (value === null) return null;

  const cards = [];

  for (let i = 0; i < value.length; i += 2) {
    cards.push({
      rank: CHAR_RANKS[value[i]],
      suit: CHAR_SUITS[value[i + 1]],
    });
  }

  return cards;
}

const CHAR_RANKS: Record<string, Rank> = {
  A: Rank.ace,
  "2": Rank.deuce,
  "3": Rank.three,
  "4": Rank.four,
  "5": Rank.five,
  "6": Rank.six,
  "7": Rank.seven,
  "8": Rank.eight,
  "9": Rank.nine,
  T: Rank.ten,
  J: Rank.jack,
  Q: Rank.queen,
  K: Rank.king,
};

const CHAR_SUITS: Record<string, Suit> = {
  s: Suit.spade,
  h: Suit.heart,
  d: Suit.diamond,
  c: Suit.club,
};

function buildCards(
  cards: PlayingCard[]
): {
  cardsByRank: Map<Rank, PlayingCard[]>;
  cardsBySuit: Map<Suit, PlayingCard[]>;
} {
  // const cards = cardsStrings.map(toPlayingCard);
  const cardsBySuit = new Map<Suit, PlayingCard[]>();
  const cardsByRank = new Map<Rank, PlayingCard[]>();

  for (const card of cards) {
    if (!cardsBySuit.has(card.suit)) {
      cardsBySuit.set(card.suit, []);
    }

    cardsBySuit.get(card.suit)!.push(card);

    if (!cardsByRank.has(card.rank)) {
      cardsByRank.set(card.rank, []);
    }

    cardsByRank.get(card.rank)!.push(card);
  }

  return { cardsBySuit, cardsByRank };
}
