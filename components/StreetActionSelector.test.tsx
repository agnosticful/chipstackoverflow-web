import * as React from "react";
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
        minBetSizeDiff={1}
        onChange={onChange}
      />
    );
    expect(renderer.getRenderOutput()).toMatchSnapshot();
  });

  it.todo(
    "throws when props.previousBetSize that more than props.tableMaxBetSize given"
  );

  it.todo(
    'calls onChange() with props.previousBetSize when "Fold" button is clicked'
  );

  it.todo(
    'calls onChange() with props.tableMaxBetSize when "Call" button is clicked'
  );

  it.todo(
    'calls onChange() with the sum of props.tableMaxBetSize and props.minBetSizeDiff when "Raise" button is clicked'
  );

  it.todo(
    "calls onChange() with the value of input element whenever its value changes"
  );

  it.todo(
    "doesn't call onChange() even when input element's value changes as long as \"Raise\" is not selected"
  );
});
