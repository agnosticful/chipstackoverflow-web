import * as React from "react";
import styled from "styled-components";
import HeadBar from "../../components/HeadBar";
import useAuthentication from "../../hooks/useAuthentication";
import useMyself from "../../hooks/useMyself";
import usePost from "../../hooks/usePost";

interface Props extends React.Attributes {}

export default function PostDetailPage(props: Props) {
  const { signIn, signOut } = useAuthentication();
  const { myself, isLoading: isMyselfLoading } = useMyself();
  const { post, isLoading: isPostLoading } = usePost();

  console.log(post);

  if (isPostLoading || !post) {
    return <div>loading...</div>;
  }

  return (
    <Root {...props}>
      <_HeadBar
        user={myself ?? undefined}
        authenticationChecking={isMyselfLoading}
        onSignInButtonClick={(_, objectId) => signIn(objectId)}
        onSignOutButtonClick={() => signOut()}
      />

      <Content>
        <h1>(temporary implementation) {post.title}</h1>

        {post.body.split("\n").map((line, i) => (
          <p key={i}>{line}</p>
        ))}
      </Content>
    </Root>
  );
}

const Root = styled.div`
  display: grid;
  min-width: 375px;
  grid-template-columns: minmax(64px, auto) minmax(375px, 1024px) minmax(
      64px,
      auto
    );
  grid-template-areas: "header header header" ". content .";
`;

const _HeadBar = styled(HeadBar)`
  grid-area: header;
`;

const Content = styled.section`
  grid-area: content;
`;
