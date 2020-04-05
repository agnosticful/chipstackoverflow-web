import * as React from "react";

interface PopoverControl {
  hide: () => void;
}

export default React.createContext<PopoverControl>(null as any);
