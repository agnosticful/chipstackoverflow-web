import Tippy from "@tippyjs/react/headless";
import * as React from "react";
import { Instance as TippyInstance } from "tippy.js";
import PopoverrControlContext from "./PopoverControlContext";

interface Props extends React.Attributes {
  placement?: PopoverPlacement;
  /** The main axis distance for the content from the trigger element */
  distance?: number;
  /** The cross axis distance for the content from the trigger element */
  skidding?: number;
  /** The trigger to show the content. Non-set permanently shows the content */
  trigger?: PopoverTrigger;
  /**   */
  stickyMainAxis?: boolean;
  stickyCrossAxis?: boolean;
  stickyBoundaryRef?: React.RefObject<any>;
  animationDuration?: number;
  hidden?: boolean;
  onShow?: () => void;
  onHide?: () => void;
  /** The items show inside. Preferred to use `<PopoverrMenuItem>` */
  render: (isShown: boolean) => React.ReactNode;
  children: React.ReactElement<React.RefAttributes<any>>;
}

export interface PopoverElement {
  show: () => void;
  hide: () => void;
}

export enum PopoverTrigger {
  mouseenter = "mouseenter",
  click = "click",
}

export enum PopoverPlacement {
  auto = "auto",
  start = "auto-start",
  end = "auto-end",
  top = "top",
  bottom = "bottom",
  right = "right",
  left = "left",
  topStart = "top-start",
  topEnd = "top-end",
  bottomStart = "bottom-start",
  bottomEnd = "bottom-end",
  rightStart = "right-start",
  rightEnd = "right-end",
  leftStart = "left-start",
  leftEnd = "left-end",
}

/**
 * Low-level popover control abstract component
 */
export default function Popover({
  placement = PopoverPlacement.top,
  distance = 8,
  skidding = 0,
  trigger,
  stickyMainAxis = true,
  stickyCrossAxis = true,
  stickyBoundaryRef,
  animationDuration = 200,
  hidden = false,
  onShow = () => {},
  onHide = () => {},
  render,
  children,
}: Props) {
  const [tippy, setTippy] = React.useState<TippyInstance | null>(null);
  const [hideTimeoutId, setHideTimeoutId] = React.useState<number | void>(0);
  const [isShown, setShown] = React.useState(!trigger);

  const show = React.useCallback(() => tippy?.show(), [tippy]);
  const hide = React.useCallback(() => tippy?.hide(), [tippy]);

  const onCreate = React.useCallback((tippy: TippyInstance) => {
    setTippy(tippy);
  }, []);

  const onDestroy = React.useCallback((tippy: TippyInstance) => {
    tippy.unmount();

    setTippy(null);
  }, []);

  const _onShow = React.useCallback(
    (_: TippyInstance) => {
      if (hideTimeoutId) {
        clearTimeout(hideTimeoutId);
      }

      requestAnimationFrame(() => {
        setShown(true);
        onShow();
      });
    },
    [hideTimeoutId]
  );

  const _onHide = React.useCallback(
    (_: TippyInstance) => {
      if (hideTimeoutId) {
        clearTimeout(hideTimeoutId);
      }

      setHideTimeoutId(
        setTimeout(() => {
          setHideTimeoutId(undefined);
          tippy?.unmount();
        }, animationDuration)
      );

      setShown(false);
      onHide();
    },
    [tippy, hideTimeoutId, animationDuration]
  );

  React.useEffect(() => {
    if (!trigger && !hidden) {
      show();
    } else {
      hide();
    }
  }, [trigger, hidden, show, hide]);

  return (
    <Tippy
      animation
      interactive
      placement={placement}
      trigger={trigger}
      visible={trigger ? undefined : isShown}
      render={(_) => (
        <PopoverrControlContext.Provider value={{ hide }}>
          {render(isShown)}
        </PopoverrControlContext.Provider>
      )}
      popperOptions={{
        modifiers: [
          {
            name: "offset",
            options: {
              offset: [skidding, distance],
            },
          },
          {
            name: "preventOverflow",
            options: {
              mainAxis: stickyMainAxis,
              altAxis: stickyCrossAxis,
              boundary: stickyBoundaryRef
                ? stickyBoundaryRef.current!
                : "clippingParents",
              tether: false,
            },
          },
        ],
      }}
      onCreate={onCreate}
      onDestroy={onDestroy}
      onShow={_onShow}
      onHide={_onHide}
      // WORKAROUND: onClickOutside is not defined in d.ts yet
      {...{
        onClickOutside: trigger === PopoverTrigger.click ? hide : () => {},
      }}
    >
      {children}
    </Tippy>
  );
}
