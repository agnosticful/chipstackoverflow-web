import * as React from "react";

export enum PostType {
  recent,
  lastUpdate
}

export default React.createContext<PostType>(null as any);
