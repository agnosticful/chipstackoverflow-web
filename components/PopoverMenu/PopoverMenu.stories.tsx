import { action } from "@storybook/addon-actions";
import * as React from "react";
import Button from "../Button";
import { SignOutIcon } from "../Icon";
import PopoverMenu from "./PopoverMenu";
import PopoverMenuItem from "./PopoverMenuItem";

export default {
  title: "PopoverMenu",
  component: PopoverMenu,
  subcomponents: { PopoverMenuItem }
};

export const example = () => (
  <div style={{ height: 200 }}>
    <PopoverMenu
      content={
        <>
          <PopoverMenuItem onClick={action('onClick ("Lorem Ipsum")')}>
            Lorem Ipsum
          </PopoverMenuItem>
          <PopoverMenuItem onClick={action('onClick ("Settings")')}>
            Settings
          </PopoverMenuItem>
          <PopoverMenuItem
            icon={<SignOutIcon />}
            onClick={action('onClick ("Sign out")')}
          >
            Sign out
          </PopoverMenuItem>
        </>
      }
    >
      <Button>Click me to show</Button>
    </PopoverMenu>
  </div>
);

export const scrollPlayground = () => (
  <div
    style={{
      display: "flex",
      width: 2560,
      height: 2560,
      alignItems: "center",
      justifyContent: "center"
    }}
  >
    <PopoverMenu
      content={
        <>
          <PopoverMenuItem onClick={action('onClick ("Lorem Ipsum")')}>
            Lorem Ipsum
          </PopoverMenuItem>
          <PopoverMenuItem onClick={action('onClick ("Settings")')}>
            Settings
          </PopoverMenuItem>
          <PopoverMenuItem
            icon={<SignOutIcon />}
            onClick={action('onClick ("Sign out")')}
          >
            Sign out
          </PopoverMenuItem>
        </>
      }
    >
      <Button>Click me to show</Button>
    </PopoverMenu>
  </div>
);
