import * as React from "react";

interface PopoverMenuControl {
  close: () => void;
}

export default React.createContext<PopoverMenuControl>(null as any);
