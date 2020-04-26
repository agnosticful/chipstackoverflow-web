import * as React from "react";
import styled from "styled-components";

interface Props extends React.Attributes {
  messages: string[];
  className?: string;
  style?: React.CSSProperties;
}

export default function ValidationMessages({ messages, ...props }: Props) {
  return (
    <Messages {...props}>
      {messages.map((message, i) => (
        <Message key={i}>{message}</Message>
      ))}
    </Messages>
  );
}

const Messages = styled.ul`
  margin: 8px 0;
  padding-left: 8px;
`;

const Message = styled.li`
  list-style: none;
  font-size: 12px;
`;
