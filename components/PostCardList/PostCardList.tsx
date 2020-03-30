import * as React from "react";
import styled from "styled-components";
import { MOBILE_MEDIA } from "../../constants/mediaquery";
import ShowLastUpdateContext from "./ShowLastUpdateContext";

interface Props extends React.Attributes {
  showLastUpdate?: boolean;
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
}

export default function PostCardList({ showLastUpdate, children }: Props) {
  return (
    <Root>
      <ShowLastUpdateContext.Provider value={showLastUpdate ? true : false}>
        {children}
      </ShowLastUpdateContext.Provider>
    </Root>
  );
}

const Root = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  grid-gap: 16px;

  ${MOBILE_MEDIA} {
    grid-template-columns: 100%;
  }
`;
