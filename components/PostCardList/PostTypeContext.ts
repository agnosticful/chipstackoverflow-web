import * as React from "react";

export enum PostType {
  recent,
  popular
}

export default React.createContext<PostType>(null as any);
