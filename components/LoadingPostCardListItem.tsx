import * as React from "react";
import styled from "styled-components";
import Card from "./Card";
import { MOBILE_MEDIA } from "../constants/mediaquery";

interface Props extends React.Attributes {
  className?: string;
  style?: React.CSSProperties;
}

export default function PostCardListItem({ ...props }: Props) {
  return (
    <PostCard style={{ maxWidth: "496px" }} {...props}>
      <PlayerHandArea>
        <CardLoading />
        <CardLoading />
      </PlayerHandArea>
      <TitleArea>
        <Word />
        <Word />
        <Word />
        <Word />
        <Word />
        <Word />
        <Word />
        <Word />
      </TitleArea>
      <LikeArea>
        <IconLoading />
        <LikesLoading />
      </LikeArea>
      <Attributes>
        <AttributeArea>
          <AttributeTextLoading />
        </AttributeArea>
        <AttributeArea>
          <AttributeTextLoading />
        </AttributeArea>
        <AttributeArea>
          <AttributeTextLoading />
        </AttributeArea>
        <AttributeArea>
          <AttributeTextLoading />
        </AttributeArea>
        <AttributeArea>
          <AttributeTextLoading />
        </AttributeArea>
        <AttributeArea>
          <AttributeTextLoading />
        </AttributeArea>
        <AttributeArea>
          <AttributeTextLoading />
        </AttributeArea>
        <AttributeArea>
          <AttributeTextLoading />
        </AttributeArea>
      </Attributes>
    </PostCard>
  );
}

const PostCard = styled(Card)`
  display: grid;
  grid-template-columns: 1fr 4fr;
  grid-template-rows: 1.3fr 1fr;
  column-gap: 8px;
  row-gap: 8px;
`;

const Attributes = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  column-gap: 4px;
  row-gap: 4px;
`;

const LikesLoading = styled.div`
  display: inline-block;
  height: 16px;
  width: 30px;
  margin: 4px;
  background-color: #bfbfbf;
  animation: color-change 4s linear infinite;

  @keyframes color-change {
    0% {
      background-color: #bfbfbf;
    }
    20%,
    100% {
      background-color: #848484;
    }
    40%,
    80% {
      background-color: #7e7e7e;
    }
    60% {
      background-color: #5d5d5d;
    }
  }
`;

const Word = styled.div`
  display: inline-block;
  height: 16px;
  width: ${(Math.floor(Math.random() * (9 - 5)) + 5) * 10}px;
  margin: 4px;
  background-color: #bfbfbf;
  animation: color-change 4s linear infinite;

  @keyframes color-change {
    0% {
      background-color: #bfbfbf;
    }
    20%,
    100% {
      background-color: #848484;
    }
    40%,
    80% {
      background-color: #7e7e7e;
    }
    60% {
      background-color: #5d5d5d;
    }
  }

  ${MOBILE_MEDIA} {
    height: 12px;
  }
`;

const AttributeTextLoading = styled.div`
  display: inline-block;
  height: 12px;
  width: 60px;
  margin: 2px;
  background-color: #bfbfbf;
  animation: color-change 2s linear infinite;

  @keyframes color-change {
    0% {
      background-color: #bfbfbf;
    }
    20%,
    100% {
      background-color: #848484;
    }
    40%,
    80% {
      background-color: #7e7e7e;
    }
    60% {
      background-color: #5d5d5d;
    }
  }

  ${MOBILE_MEDIA} {
    height: 10px;
  }
`;

const CardLoading = styled.div`
  display: inline-block;
  height: 80%;
  width: 40%;
  margin: 4px;
  background-color: #bfbfbf;
  animation: color-change 4s linear infinite;

  @keyframes color-change {
    0% {
      background-color: #bfbfbf;
    }
    20%,
    100% {
      background-color: #848484;
    }
    40%,
    80% {
      background-color: #7e7e7e;
    }
    60% {
      background-color: #5d5d5d;
    }
  }
`;

const IconLoading = styled.div`
  display: inline-block;
  height: 30px;
  width: 30px;
  margin: 2px;
  background-color: #bfbfbf;
  animation: color-change 4s linear infinite;

  @keyframes color-change {
    0% {
      background-color: #bfbfbf;
    }
    20%,
    100% {
      background-color: #848484;
    }
    40%,
    80% {
      background-color: #7e7e7e;
    }
    60% {
      background-color: #5d5d5d;
    }
  }
`;

const PlayerHandArea = styled.div`
  height: 60px;
  min-width: 80px;
  text-align: center;
`;
const TitleArea = styled.div`
  height: 60px;
`;

const LikeArea = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const AttributeArea = styled.div``;
