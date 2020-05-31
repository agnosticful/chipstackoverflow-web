import * as React from "react";
import styled from "styled-components";
import HeadBar from "@@/components/HeadBar";
import useAuthentication from "@@/hooks/useAuthentication";
import useMyself from "@@/hooks/useMyself";
import usePost from "@@/hooks/usePost";
import { PostId } from "@@/models/Post";
import HandPlayerSection from "./HandPlayerSection";
import PostAnswers from "./PostAnswers";
import PostBody from "./PostBody";
import PostTitle from "./PostTitle";

interface Props extends React.Attributes {
  postId: PostId;
  defaultSnapshotIndex?: number;
}

export default function PostDetailPage({
  postId,
  defaultSnapshotIndex = 0,
  ...props
}: Props) {
  const { signIn, signOut } = useAuthentication();
  const { myself, isLoading: isMyselfLoading } = useMyself();
  const { post, isLoading: isPostLoading } = usePost(postId);

  return (
    <Root {...props}>
      <_HeadBar
        user={myself ?? undefined}
        authenticationChecking={isMyselfLoading}
        onSignInButtonClick={(_, objectId) => signIn(objectId)}
        onSignOutButtonClick={() => signOut()}
      />

      <Content>
        <PostTitle value={post?.title} loading={isPostLoading} />

        <_HandPlayerSection
          hand={post?.hand}
          heroIndex={post?.heroIndex}
          defaultSnapshotIndex={defaultSnapshotIndex}
          loading={isPostLoading}
        />

        <_PostBody value={post?.body} loading={isPostLoading} />

        <_PostAnswers answers={post?.answers} loading={isPostLoading} />
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
  padding: 64px 0 128px;
`;

const _HandPlayerSection = styled(HandPlayerSection)`
  margin-top: 64px;
`;

const _PostBody = styled(PostBody)`
  margin-top: 64px;
`;

const _PostAnswers = styled(PostAnswers)`
  margin-top: 64px;
`;
