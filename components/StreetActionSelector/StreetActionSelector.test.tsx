import * as React from "react";
import { act, create } from "react-test-renderer";
import { createRenderer } from "react-test-renderer/shallow";
import StreetActionSelector from "./StreetActionSelector";

describe("<StreetActionSelector>", () => {
  it("matches with the previous snapshot", () => {
    const renderer = createRenderer();

    renderer.render(<StreetActionSelector />);
    expect(renderer.getRenderOutput()).toMatchSnapshot();
  });

  it("matches with the previous snapshot (someone raised)", () => {
    const onChange = jest.fn().mockName("onChange");
    const renderer = createRenderer();

    renderer.render(
      <StreetActionSelector tableMaxBetSize={22.5} onChange={onChange} />
    );
    expect(renderer.getRenderOutput()).toMatchSnapshot();
  });

  it("matches with the previous snapshot (big blind in preflop)", () => {
    const onChange = jest.fn().mockName("onChange");
    const renderer = createRenderer();

    renderer.render(
      <StreetActionSelector
        tableMaxBetSize={1}
        previousBetSize={1}
        onChange={onChange}
      />
    );
    expect(renderer.getRenderOutput()).toMatchSnapshot();
  });

  it("throws when props.previousBetSize is more than props.tableMaxBetSize", async () => {
    const onChange = jest.fn().mockName("onChange");
    const renderer = createRenderer();

    expect(() =>
      renderer.render(
        <StreetActionSelector
          tableMaxBetSize={1}
          previousBetSize={2}
          onChange={onChange}
        />
      )
    ).toThrow();
  });

  it('calls onChange() with props.previousBetSize when "Fold" button is clicked', async () => {
    const onChange = jest.fn().mockName("onChange");
    const renderer = create(
      <StreetActionSelector
        tableMaxBetSize={1}
        previousBetSize={0}
        onChange={onChange}
      />
    );

    const foldButton = renderer.root.find(
      node => node.props["data-test-id"] === "fold-button"
    );

    await act(async () => {
      foldButton.props.onClick();
    });

    await act(async () => {
      renderer.update(
        <StreetActionSelector
          tableMaxBetSize={3}
          previousBetSize={1}
          onChange={onChange}
        />
      );
    });

    await act(async () => {
      foldButton.props.onClick();
    });

    expect(onChange).toHaveBeenCalledTimes(2);
    expect(onChange).toHaveBeenNthCalledWith(1, 0);
    expect(onChange).toHaveBeenNthCalledWith(2, 1);
  });

  it('calls onChange() with props.tableMaxBetSize when "Call" button is clicked', async () => {
    const onChange = jest.fn().mockName("onChange");
    const renderer = create(
      <StreetActionSelector
        tableMaxBetSize={1}
        previousBetSize={0}
        onChange={onChange}
      />
    );

    const checkOrCallButton = renderer.root.find(
      node => node.props["data-test-id"] === "check-or-call-button"
    );

    await act(async () => {
      checkOrCallButton.props.onClick();
    });

    await act(async () => {
      renderer.update(
        <StreetActionSelector
          tableMaxBetSize={3}
          previousBetSize={1}
          onChange={onChange}
        />
      );
    });

    await act(async () => {
      checkOrCallButton.props.onClick();
    });

    expect(onChange).toHaveBeenCalledTimes(2);
    expect(onChange).toHaveBeenNthCalledWith(1, 1);
    expect(onChange).toHaveBeenNthCalledWith(2, 3);
  });

  it("sets defaultValue at bet size input that is sum of props.tableMaxBetSize", async () => {
    const renderer = create(
      <StreetActionSelector tableMaxBetSize={1} previousBetSize={0} />
    );

    let betSizeInput = renderer.root.find(
      node => node.props["data-test-id"] === "bet-size-input"
    );

    expect(betSizeInput.props.defaultValue).toBe(1);

    await act(async () => {
      renderer.update(
        <StreetActionSelector tableMaxBetSize={3} previousBetSize={1} />
      );
    });

    betSizeInput = renderer.root.find(
      node => node.props["data-test-id"] === "bet-size-input"
    );

    expect(betSizeInput.props.defaultValue).toBe(3);
  });

  it('calls onChange() with the bet size input\'s value when "Raise" button is clicked', async () => {
    const onChange = jest.fn().mockName("onChange");
    const betSizeInputValue = 123456789;
    const renderer = create(
      <StreetActionSelector
        tableMaxBetSize={1}
        previousBetSize={0}
        onChange={onChange}
      />,
      {
        createNodeMock: element => {
          if (element.props["data-test-id"] === "bet-size-input") {
            return {
              focus: () => undefined,
              value: betSizeInputValue
            };
          }

          return null;
        }
      }
    );

    const betOrRaiseButton = renderer.root.find(
      node => node.props["data-test-id"] === "bet-or-raise-button"
    );

    await act(async () => {
      betOrRaiseButton.props.onClick();
    });

    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange).toHaveBeenNthCalledWith(1, betSizeInputValue);
  });

  it('sets a focus on bet size input when "Raise" button is clicked', async () => {
    const focus = jest.fn().mockName("focus");
    const renderer = create(
      <StreetActionSelector tableMaxBetSize={1} previousBetSize={0} />,
      {
        createNodeMock: element => {
          if (element.props["data-test-id"] === "bet-size-input") {
            return {
              focus,
              value: null
            };
          }

          return null;
        }
      }
    );

    const betOrRaiseButton = renderer.root.find(
      node => node.props["data-test-id"] === "bet-or-raise-button"
    );

    await act(async () => {
      betOrRaiseButton.props.onClick();
    });

    expect(focus).toHaveBeenCalledTimes(1);
  });

  it("calls onChange() with the value of input element whenever its value changes", async () => {
    const onChange = jest.fn().mockName("onChange");
    const renderer = create(
      <StreetActionSelector
        tableMaxBetSize={1}
        previousBetSize={0}
        onChange={onChange}
      />
    );

    let betSizeInput = renderer!.root.find(
      node => node.props["data-test-id"] === "bet-size-input"
    );

    await act(async () => {
      betSizeInput.props.onChange({ currentTarget: { value: 20 } });
    });

    await act(async () => {
      renderer.update(
        <StreetActionSelector
          tableMaxBetSize={3}
          previousBetSize={1}
          onChange={onChange}
        />
      );
    });

    // re-obtain betSizeInput element
    // because it would be remounted whenever props.tableMaxBetSize changes
    betSizeInput = renderer!.root.find(
      node => node.props["data-test-id"] === "bet-size-input"
    );

    await act(async () => {
      betSizeInput.props.onChange({ currentTarget: { value: 43 } });
    });

    expect(onChange).toHaveBeenCalledTimes(2);
    expect(onChange).toHaveBeenNthCalledWith(1, 20);
    expect(onChange).toHaveBeenNthCalledWith(2, 43);
  });
});
