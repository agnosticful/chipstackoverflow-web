import * as React from "react";
import styled from "styled-components";
import useAuthentication from "../hooks/useAuthentication";

export default function Home() {
  const { isFirstChecking, signIn, signOut, user } = useAuthentication();

  if (isFirstChecking) {
    return <div>checking in...</div>;
  }

  if (user) {
    return (
      <div>
        Welcome back, {user.name}!
        <button onClick={() => signOut()}>sign out</button>
      </div>
    );
  }

  return (
    <Root>
      Hello!
      <button onClick={() => signIn()}>sign in</button>
    </Root>
  );
}

const Root = styled.span`
  color: red;
`;
