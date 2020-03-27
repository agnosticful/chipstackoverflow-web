import calculateFinalPot from "./calculateFinalPot";

describe("calculateFinalPot()", () => {
  it("returns final pot when ended street is preflop", () => {
    expect(
      calculateFinalPot({
        playerLength: 3,
        smallBlindSize: 0.5,
        antiSize: 0,
        preflopActions: [
          { playerIndex: 2, betSize: 0 },
          { playerIndex: 0, betSize: 1 },
          { playerIndex: 1, betSize: 2 }
        ]
      })
    ).toBe(3);
  });

  it("returns final pot when ended street is preflop. antiSize is set 0.5BB", () => {
    expect(
      calculateFinalPot({
        playerLength: 3,
        smallBlindSize: 0.5,
        antiSize: 0.5,
        preflopActions: [
          { playerIndex: 2, betSize: 0 },
          { playerIndex: 0, betSize: 1 },
          { playerIndex: 1, betSize: 2 }
        ]
      })
    ).toBe(4.5);
  });

  it("returns final pot when ended street is preflop. sb fold at first action.", () => {
    expect(
      calculateFinalPot({
        playerLength: 3,
        smallBlindSize: 0.5,
        antiSize: 0,
        preflopActions: [
          { playerIndex: 2, betSize: 0 },
          { playerIndex: 0, betSize: 0 },
          { playerIndex: 1, betSize: 2 }
        ]
      })
    ).toBe(2.5);
  });

  it("returns final pot when ended street is preflop. bb fold at first action.", () => {
    expect(
      calculateFinalPot({
        playerLength: 3,
        smallBlindSize: 0.5,
        antiSize: 0,
        preflopActions: [
          { playerIndex: 2, betSize: 0 },
          { playerIndex: 0, betSize: 6 },
          { playerIndex: 1, betSize: 0 },
          { playerIndex: 0, betSize: 2 },
          { playerIndex: 1, betSize: 4 }
        ]
      })
    ).toBe(13);
  });

  it("returns final pot when ended street is preflop. sb and bb fold at first action.", () => {
    expect(
      calculateFinalPot({
        playerLength: 3,
        smallBlindSize: 0.5,
        antiSize: 0,
        preflopActions: [
          { playerIndex: 2, betSize: 1 },
          { playerIndex: 0, betSize: 0 },
          { playerIndex: 1, betSize: 0 }
        ]
      })
    ).toBe(2.5);
  });

  it("returns final pot when ended street is preflop. sb and bb fold at first action. anti is set 1BB", () => {
    expect(
      calculateFinalPot({
        playerLength: 3,
        smallBlindSize: 0.7,
        antiSize: 1,
        preflopActions: [
          { playerIndex: 2, betSize: 1 },
          { playerIndex: 0, betSize: 0 },
          { playerIndex: 1, betSize: 0 }
        ]
      })
    ).toBe(5.7);
  });

  it("returns final pot when ended street is flop", () => {
    expect(
      calculateFinalPot({
        playerLength: 5,
        smallBlindSize: 0.5,
        antiSize: 0,
        preflopActions: [
          { playerIndex: 2, betSize: 1 },
          { playerIndex: 3, betSize: 1 },
          { playerIndex: 4, betSize: 1 },
          { playerIndex: 0, betSize: 1 },
          { playerIndex: 1, betSize: 1 }
        ],
        flopActions: [
          { playerIndex: 0, betSize: 0 },
          { playerIndex: 1, betSize: 0 },
          { playerIndex: 2, betSize: 0 },
          { playerIndex: 3, betSize: 0 },
          { playerIndex: 4, betSize: 1 }
        ]
      })
    ).toBe(6);
  });

  it("returns final pot when ended street is flop. antiSize is set 0.2BB", () => {
    expect(
      calculateFinalPot({
        playerLength: 5,
        smallBlindSize: 0.5,
        antiSize: 0.2,
        preflopActions: [
          { playerIndex: 2, betSize: 3 },
          { playerIndex: 3, betSize: 3 },
          { playerIndex: 4, betSize: 3 },
          { playerIndex: 0, betSize: 3 },
          { playerIndex: 1, betSize: 3 }
        ],
        flopActions: [
          { playerIndex: 0, betSize: 3 },
          { playerIndex: 1, betSize: 0 },
          { playerIndex: 2, betSize: 0 },
          { playerIndex: 3, betSize: 0 },
          { playerIndex: 4, betSize: 0 }
        ]
      })
    ).toBe(19);
  });

  it("returns final pot when ended street is flop. sb fold at first action.", () => {
    expect(
      calculateFinalPot({
        playerLength: 5,
        smallBlindSize: 0.5,
        antiSize: 0,
        preflopActions: [
          { playerIndex: 2, betSize: 3 },
          { playerIndex: 3, betSize: 3 },
          { playerIndex: 4, betSize: 3 },
          { playerIndex: 0, betSize: 0 },
          { playerIndex: 1, betSize: 3 }
        ],
        flopActions: [
          { playerIndex: 1, betSize: 0 },
          { playerIndex: 2, betSize: 0 },
          { playerIndex: 3, betSize: 7 },
          { playerIndex: 4, betSize: 0 },
          { playerIndex: 1, betSize: 0 },
          { playerIndex: 2, betSize: 0 }
        ]
      })
    ).toBe(19.5);
  });

  it("returns final pot when ended street is flop. bb fold at first action.", () => {
    expect(
      calculateFinalPot({
        playerLength: 5,
        smallBlindSize: 0.5,
        antiSize: 0,
        preflopActions: [
          { playerIndex: 2, betSize: 0 },
          { playerIndex: 3, betSize: 3 },
          { playerIndex: 4, betSize: 0 },
          { playerIndex: 0, betSize: 3 },
          { playerIndex: 1, betSize: 0 }
        ],
        flopActions: [
          { playerIndex: 0, betSize: 0 },
          { playerIndex: 3, betSize: 1 },
          { playerIndex: 0, betSize: 0 }
        ]
      })
    ).toBe(8);
  });

  it("returns final pot when ended street is flop. sb and bb fold at first action. antiSize is set 0.5BB.", () => {
    expect(
      calculateFinalPot({
        playerLength: 5,
        smallBlindSize: 0.5,
        antiSize: 0.5,
        preflopActions: [
          { playerIndex: 2, betSize: 7 },
          { playerIndex: 3, betSize: 7 },
          { playerIndex: 4, betSize: 0 },
          { playerIndex: 0, betSize: 0 },
          { playerIndex: 1, betSize: 0 }
        ],
        flopActions: [
          { playerIndex: 2, betSize: 0 },
          { playerIndex: 3, betSize: 1 },
          { playerIndex: 2, betSize: 0 }
        ]
      })
    ).toBe(19);
  });

  it("returns final pot when ended street is turn", () => {
    expect(
      calculateFinalPot({
        playerLength: 2,
        smallBlindSize: 0.5,
        antiSize: 0,
        preflopActions: [
          { playerIndex: 0, betSize: 1 },
          { playerIndex: 1, betSize: 1 }
        ],
        flopActions: [
          { playerIndex: 0, betSize: 2 },
          { playerIndex: 1, betSize: 2 }
        ],
        turnActions: [
          { playerIndex: 0, betSize: 1 },
          { playerIndex: 1, betSize: 2 },
          { playerIndex: 0, betSize: 0 }
        ]
      })
    ).toBe(9);
  });

  it("returns final pot when ended street is turn. antiSize is set 0.7BB", () => {
    expect(
      calculateFinalPot({
        playerLength: 3,
        smallBlindSize: 0.5,
        antiSize: 0.7,
        preflopActions: [
          { playerIndex: 2, betSize: 1 },
          { playerIndex: 0, betSize: 1 },
          { playerIndex: 1, betSize: 1 }
        ],
        flopActions: [
          { playerIndex: 0, betSize: 2 },
          { playerIndex: 1, betSize: 2 },
          { playerIndex: 2, betSize: 2 }
        ],
        turnActions: [
          { playerIndex: 0, betSize: 0 },
          { playerIndex: 1, betSize: 2 },
          { playerIndex: 2, betSize: 0 },
          { playerIndex: 0, betSize: 0 }
        ]
      })
    ).toBe(13.1);
  });

  it("returns final pot when ended street is turn. sb fold at first action.", () => {
    expect(
      calculateFinalPot({
        playerLength: 3,
        smallBlindSize: 0.5,
        antiSize: 0,
        preflopActions: [
          { playerIndex: 2, betSize: 1 },
          { playerIndex: 0, betSize: 0 },
          { playerIndex: 1, betSize: 1 }
        ],
        flopActions: [
          { playerIndex: 1, betSize: 2 },
          { playerIndex: 2, betSize: 2 }
        ],
        turnActions: [
          { playerIndex: 1, betSize: 1 },
          { playerIndex: 2, betSize: 2 },
          { playerIndex: 1, betSize: 0 }
        ]
      })
    ).toBe(9.5);
  });

  it("returns final pot when ended street is turn. bb fold at first action. antiSize is set 0.2BB", () => {
    expect(
      calculateFinalPot({
        playerLength: 3,
        smallBlindSize: 0.5,
        antiSize: 0.2,
        preflopActions: [
          { playerIndex: 2, betSize: 1 },
          { playerIndex: 0, betSize: 2 },
          { playerIndex: 1, betSize: 0 },
          { playerIndex: 2, betSize: 2 }
        ],
        flopActions: [
          { playerIndex: 0, betSize: 1 },
          { playerIndex: 2, betSize: 1 }
        ],
        turnActions: [
          { playerIndex: 0, betSize: 1 },
          { playerIndex: 2, betSize: 2 },
          { playerIndex: 0, betSize: 0 }
        ]
      })
    ).toBe(11.6);
  });

  it("returns final pot when ended street is turn. sb and bb fold at first action.", () => {
    expect(
      calculateFinalPot({
        playerLength: 4,
        smallBlindSize: 0.5,
        antiSize: 0,
        preflopActions: [
          { playerIndex: 2, betSize: 1 },
          { playerIndex: 3, betSize: 1 },
          { playerIndex: 0, betSize: 0 },
          { playerIndex: 1, betSize: 0 }
        ],
        flopActions: [
          { playerIndex: 2, betSize: 1 },
          { playerIndex: 3, betSize: 1 }
        ],
        turnActions: [
          { playerIndex: 2, betSize: 1 },
          { playerIndex: 3, betSize: 2 },
          { playerIndex: 2, betSize: 0 }
        ]
      })
    ).toBe(8.5);
  });

  it("returns final pot when ended street is river", () => {
    expect(
      calculateFinalPot({
        playerLength: 5,
        smallBlindSize: 0.5,
        antiSize: 0,
        preflopActions: [
          { playerIndex: 2, betSize: 30 },
          { playerIndex: 3, betSize: 30 },
          { playerIndex: 4, betSize: 0 },
          { playerIndex: 0, betSize: 30 },
          { playerIndex: 1, betSize: 30 }
        ],
        flopActions: [
          { playerIndex: 0, betSize: 20 },
          { playerIndex: 1, betSize: 20 },
          { playerIndex: 2, betSize: 20 },
          { playerIndex: 3, betSize: 0 }
        ],
        turnActions: [
          { playerIndex: 0, betSize: 20 },
          { playerIndex: 1, betSize: 20 },
          { playerIndex: 2, betSize: 20 }
        ],
        riverActions: [
          { playerIndex: 0, betSize: 0 },
          { playerIndex: 1, betSize: 20 },
          { playerIndex: 2, betSize: 0 },
          { playerIndex: 0, betSize: 0 }
        ]
      })
    ).toBe(260);
  });

  it("returns final pot when ended street river. antiSize is set 0.5BB", () => {
    expect(
      calculateFinalPot({
        playerLength: 5,
        smallBlindSize: 0.5,
        antiSize: 0.5,
        preflopActions: [
          { playerIndex: 2, betSize: 4 },
          { playerIndex: 3, betSize: 4 },
          { playerIndex: 4, betSize: 0 },
          { playerIndex: 0, betSize: 4 },
          { playerIndex: 1, betSize: 4 }
        ],
        flopActions: [
          { playerIndex: 0, betSize: 2 },
          { playerIndex: 1, betSize: 2 },
          { playerIndex: 2, betSize: 2 },
          { playerIndex: 3, betSize: 0 }
        ],
        turnActions: [
          { playerIndex: 0, betSize: 2 },
          { playerIndex: 1, betSize: 2 },
          { playerIndex: 2, betSize: 2 }
        ],
        riverActions: [
          { playerIndex: 0, betSize: 0 },
          { playerIndex: 1, betSize: 2 },
          { playerIndex: 2, betSize: 0 },
          { playerIndex: 0, betSize: 0 }
        ]
      })
    ).toBe(32.5);
  });

  it("returns final pot when ended street river. sb fold at first action.", () => {
    expect(
      calculateFinalPot({
        playerLength: 4,
        smallBlindSize: 0.5,
        antiSize: 0,
        preflopActions: [
          { playerIndex: 2, betSize: 1 },
          { playerIndex: 3, betSize: 1 },
          { playerIndex: 0, betSize: 0 },
          { playerIndex: 1, betSize: 1 }
        ],
        flopActions: [
          { playerIndex: 1, betSize: 2 },
          { playerIndex: 2, betSize: 2 },
          { playerIndex: 3, betSize: 0 }
        ],
        turnActions: [
          { playerIndex: 1, betSize: 2 },
          { playerIndex: 2, betSize: 2 }
        ],
        riverActions: [
          { playerIndex: 1, betSize: 2 },
          { playerIndex: 2, betSize: 0 }
        ]
      })
    ).toBe(13.5);
  });

  it("returns final pot when ended street river. bb fold at first action. antiSize is set 0.5BB", () => {
    expect(
      calculateFinalPot({
        playerLength: 4,
        smallBlindSize: 0.5,
        antiSize: 0.5,
        preflopActions: [
          { playerIndex: 2, betSize: 1 },
          { playerIndex: 3, betSize: 1 },
          { playerIndex: 0, betSize: 1 },
          { playerIndex: 1, betSize: 0 }
        ],
        flopActions: [
          { playerIndex: 0, betSize: 1 },
          { playerIndex: 2, betSize: 1 },
          { playerIndex: 3, betSize: 0 }
        ],
        turnActions: [
          { playerIndex: 0, betSize: 1 },
          { playerIndex: 2, betSize: 1 }
        ],
        riverActions: [
          { playerIndex: 0, betSize: 1 },
          { playerIndex: 2, betSize: 0 }
        ]
      })
    ).toBe(11);
  });

  it("returns final pot when ended street river. sb and bb fold at first action.", () => {
    expect(
      calculateFinalPot({
        playerLength: 4,
        smallBlindSize: 0.5,
        antiSize: 0,
        preflopActions: [
          { playerIndex: 2, betSize: 1 },
          { playerIndex: 3, betSize: 1 },
          { playerIndex: 0, betSize: 0 },
          { playerIndex: 1, betSize: 0 }
        ],
        flopActions: [
          { playerIndex: 2, betSize: 1 },
          { playerIndex: 3, betSize: 1 }
        ],
        turnActions: [
          { playerIndex: 2, betSize: 0 },
          { playerIndex: 3, betSize: 0 }
        ],
        riverActions: [
          { playerIndex: 2, betSize: 0 },
          { playerIndex: 3, betSize: 1 },
          { playerIndex: 2, betSize: 0 }
        ]
      })
    ).toBe(6.5);
  });

  it("returns final pot when ended showdown.", () => {
    expect(
      calculateFinalPot({
        playerLength: 5,
        smallBlindSize: 0.5,
        antiSize: 0,
        preflopActions: [
          { playerIndex: 2, betSize: 2 },
          { playerIndex: 3, betSize: 2 },
          { playerIndex: 4, betSize: 0 },
          { playerIndex: 0, betSize: 2 },
          { playerIndex: 1, betSize: 2 }
        ],
        flopActions: [
          { playerIndex: 0, betSize: 1 },
          { playerIndex: 1, betSize: 1 },
          { playerIndex: 2, betSize: 1 },
          { playerIndex: 3, betSize: 0 }
        ],
        turnActions: [
          { playerIndex: 0, betSize: 1 },
          { playerIndex: 1, betSize: 1 },
          { playerIndex: 2, betSize: 1 }
        ],
        riverActions: [
          { playerIndex: 0, betSize: 0 },
          { playerIndex: 1, betSize: 0 },
          { playerIndex: 2, betSize: 0 }
        ]
      })
    ).toBe(14);
  });
});
