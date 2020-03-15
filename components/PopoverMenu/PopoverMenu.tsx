import Tippy from "@tippyjs/react";
import * as React from "react";
import styled from "styled-components";
import "tippy.js/dist/tippy.css";
import "tippy.js/animations/shift-away-subtle.css";
import "tippy.js/themes/light.css";
import PopoverMenuControlContext from "./PopoverMenuControlContext";

interface Props extends React.Attributes {
  /** The items show inside. Preferred to use `<PopoverMenuItem>` */
  content: React.ReactNode;
  className?: string;
  popoverClassName?: string;
  style?: React.CSSProperties;
  children: React.ReactElement<any>;
}

/**
 * Popover menu UI component with interaction.
 */
export default function PopoverMenu({
  content,
  popoverClassName,
  children,
  ...props
}: Props) {
  const [isPopoverShown, setPopoverShown] = React.useState(false);
  const onRequestShow = React.useCallback(() => setPopoverShown(true), []);
  const onRequestHide = React.useCallback(() => setPopoverShown(false), []);

  return (
    <_Tippy
      theme="light"
      animation="shift-away-subtle"
      trigger="manual"
      interactive
      placement="bottom-start"
      arrow
      content={
        <PopoverMenuControlContext.Provider value={{ close: onRequestHide }}>
          {content}
        </PopoverMenuControlContext.Provider>
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
  min-width: 192px;
  padding: 8px 0;

  & > .tippy-content {
    padding: 0;
  }
`;

const Wrapper = styled.div`
  display: inline-block;
`;
