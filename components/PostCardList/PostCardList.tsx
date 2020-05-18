import * as React from "react";
import styled from "styled-components";
import { MOBILE_MEDIA } from "@@/constants/mediaquery";
import ShowLastUpdateDateContext from "./ShowLastUpdateDateContext";

interface Props extends React.Attributes {
  showLastUpdateDate?: boolean;
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
}

export default function PostCardList({
  showLastUpdateDate = false,
  children,
}: Props) {
  return (
    <Root>
      <ShowLastUpdateDateContext.Provider value={showLastUpdateDate}>
        {children}
      </ShowLastUpdateDateContext.Provider>
    </Root>
  );
}

const Root = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
  grid-gap: 16px;

  ${MOBILE_MEDIA} {
    grid-template-columns: 100%;
  }
`;
