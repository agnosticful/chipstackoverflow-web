import * as React from "react";
import styled from "styled-components";

interface Props extends React.Attributes {
  messages: string[];
  className?: string;
  style?: React.CSSProperties;
}

export default function ValidationMessages({ messages, ...props }: Props) {
  return (
    <Validations {...props}>
      {messages.map((message, i) => (
        <Validation key={i}>{message}</Validation>
      ))}
    </Validations>
  );
}

const Validations = styled.ul`
  margin: 8px 0;
  padding-left: 8px;
`;

const Validation = styled.li`
  list-style: none;
  font-size: 12px;
`;
