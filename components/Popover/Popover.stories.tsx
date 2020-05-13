import { action } from "@storybook/addon-actions";
import { number, select, boolean } from "@storybook/addon-knobs";
import * as React from "react";
import styled from "styled-components";
import Popover, {
  PopoverControlContext,
  PopoverTrigger,
  PopoverPlacement,
} from "@@/components/Popover";

export default {
  title: "Popover",
  component: Popover,
};

export const example = () => (
  <div style={{ padding: 128 }}>
    <Popover
      placement={select("placement", PLACEMENTS, PopoverPlacement.top)}
      distance={number("distance", 8)}
      skidding={number("skidding", 0)}
      trigger={select("trigger", TRIGGERS, undefined)}
      stickyMainAxis={boolean("stickyMainAxis", true)}
      stickyCrossAxis={boolean("stickyCrossAxis", false)}
      animationDuration={number("animationDuration", 200)}
      hidden={boolean("hidden", false)}
      onShow={action("onShow")}
      onHide={action("onHide")}
      render={(isShown) => (
        <PopoverContent
          _shown={isShown}
          animationDuration={number("animationDuration", 200)}
        >
          Popover content shows alongside the target
        </PopoverContent>
      )}
    >
      <span>This is Popover target</span>
    </Popover>
  </div>
);

export const distanceAndSkidding = () => (
  <div style={{ padding: 128 }}>
    <Popover
      distance={32}
      render={(isShown) => (
        <PopoverContent _shown={isShown}>
          Popover content shows 32px distance from the target
        </PopoverContent>
      )}
    >
      <span>This is Popover target</span>
    </Popover>
  </div>
);

export const showWhileHover = () => (
  <div style={{ padding: 128 }}>
    <Popover
      trigger={PopoverTrigger.mouseenter}
      render={(isShown) => (
        <PopoverContent _shown={isShown}>Ta-da!</PopoverContent>
      )}
    >
      <span>Hover on me to show</span>
    </Popover>
  </div>
);

export const showOnClick = () => (
  <div style={{ padding: 128 }}>
    <Popover
      trigger={PopoverTrigger.click}
      render={(isShown) => (
        <PopoverContent _shown={isShown}>How can I help you?</PopoverContent>
      )}
    >
      <span>Click me to show</span>
    </Popover>
  </div>
);

export const sticky = () => {
  const outerRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    outerRef.current!.scrollTo(768, 768);
  });

  return (
    <div
      style={{
        width: 512,
        height: 512,
        border: "1px #ccc solid",
        overflow: "scroll",
      }}
      ref={outerRef}
    >
      <div
        style={{
          display: "flex",
          width: 2048,
          height: 2048,
          placeContent: "center",
          placeItems: "center",
        }}
      >
        <Popover
          stickyBoundaryRef={outerRef}
          render={(isShown) => (
            <PopoverContent _shown={isShown}>
              You can scroll the view
              <br />
              but this content sticks not to hide
            </PopoverContent>
          )}
        >
          <span>Trigger Element</span>
        </Popover>
      </div>
    </div>
  );
};

export const controlled = () => {
  const [isPopoverShown, setPopoverShown] = React.useState(true);

  return (
    <div style={{ padding: 128 }}>
      <Popover
        render={(isShown) => (
          <PopoverContent _shown={isShown}>
            This popover is controlled by another element
          </PopoverContent>
        )}
        hidden={!isPopoverShown}
      >
        <span>Popover target</span>
      </Popover>

      <div style={{ marginTop: 64 }}>
        <button onClick={() => setPopoverShown(!isPopoverShown)}>
          Toggle Popover
        </button>
      </div>
    </div>
  );
};

export const controlInContent = () => {
  return (
    <div style={{ padding: 128 }}>
      <Popover
        trigger={PopoverTrigger.mouseenter}
        render={(isShown) => (
          <PopoverContent _shown={isShown}>
            <p>Clicking popover content happens nothing, but</p>

            <p>
              <PopoverControlContext.Consumer>
                {({ hide }) => (
                  <button onClick={hide}>
                    This button closes this popover
                  </button>
                )}
              </PopoverControlContext.Consumer>
            </p>
          </PopoverContent>
        )}
      >
        <span>Hover on me to show</span>
      </Popover>
    </div>
  );
};

export const customAnimationDuration = () => (
  <div style={{ padding: 128 }}>
    <Popover
      trigger={PopoverTrigger.mouseenter}
      animationDuration={1500}
      render={(isShown) => (
        <PopoverContentLongTransition _shown={isShown}>
          This popover shows in 1500ms (verrry slowly)
        </PopoverContentLongTransition>
      )}
    >
      <span>Hover on me to show</span>
    </Popover>
  </div>
);

const PLACEMENTS = {
  "PopoverPlacment.auto": PopoverPlacement.auto,
  "PopoverPlacment.start": PopoverPlacement.start,
  "PopoverPlacment.end": PopoverPlacement.end,
  "PopoverPlacment.top": PopoverPlacement.top,
  "PopoverPlacment.bottom": PopoverPlacement.bottom,
  "PopoverPlacment.right": PopoverPlacement.right,
  "PopoverPlacment.left": PopoverPlacement.left,
  "PopoverPlacment.topStart": PopoverPlacement.topStart,
  "PopoverPlacment.topEnd": PopoverPlacement.topEnd,
  "PopoverPlacment.bottomStart": PopoverPlacement.bottomStart,
  "PopoverPlacment.bottomEnd": PopoverPlacement.bottomEnd,
  "PopoverPlacment.rightStart": PopoverPlacement.rightStart,
  "PopoverPlacment.rightEnd": PopoverPlacement.rightEnd,
  "PopoverPlacment.leftStart": PopoverPlacement.leftStart,
  "PopoverPlacment.leftEnd": PopoverPlacement.leftEnd,
};

const TRIGGERS = {
  "none (not set)": undefined,
  "PopoverTrigger.click": PopoverTrigger.click,
  "PopoverTrigger.mouseenter": PopoverTrigger.mouseenter,
};

const PopoverContent = styled.div<{
  _shown: boolean;
  animationDuration?: number;
}>`
  padding: 16px;
  background-color: white;
  border-radius: 4px;
  box-shadow: 0px 0px 12px #222f3e1f, 0px 12px 24px #222f3e0f;
  transform: ${({ _shown }) =>
    _shown ? "translateY(0) scale(1)" : "translateY(-8px) scale(0.95)"};
  opacity: ${({ _shown }) => (_shown ? "1" : "0")};
  transition-property: opacity, transform;
  transition-duration: ${({ animationDuration }) => animationDuration ?? 200}ms;
  transition-timing-function: ease-in-out;
`;

const PopoverContentLongTransition = styled(PopoverContent)`
  transition-duration: 1500ms;
`;
