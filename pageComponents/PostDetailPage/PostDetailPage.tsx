import * as React from "react";
import styled from "styled-components";
import HeadBar from "@@/components/HeadBar";
import useAnalytics from "@@/hooks/useAnalytics";
import useAuthentication from "@@/hooks/useAuthentication";
import useMyself from "@@/hooks/useMyself";
import { PostId } from "@@/models/Post";
import HandPlayerSection from "./HandPlayerSection";
import AnswerList from "./AnswerList";
import PostBody from "./PostBody";
import PostTitle from "./PostTitle";
import NewAnswerForm from "./NewAnswerForm";

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
  const { trackEvent } = useAnalytics();
  const { myself, isLoading: isMyselfLoading } = useMyself();

  return (
    <Root {...props}>
      <_HeadBar
        user={myself ?? undefined}
        authenticationChecking={isMyselfLoading}
        onSignInButtonClick={() => {
          signIn();

          trackEvent("sign_in_click", {
            object_id: "head_bar_sign_in_button",
          });
        }}
        onSignOutButtonClick={() => {
          signOut();

          trackEvent("sign_out_click", {
            object_id: "head_bar_sign_out_button",
          });
        }}
      />

      <Content>
        <PostTitle postId={postId} />

        <_HandPlayerSection
          postId={postId}
          defaultSnapshotIndex={defaultSnapshotIndex}
        />

        <_PostBody postId={postId} />

        <Rule />

        <_NewAnswerForm postId={postId} />

        <SectionHeading>Answers</SectionHeading>

        <_AnswerList postId={postId} />
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

const Rule = styled.hr`
  margin: 64px 0;
  border: none;
  border-top: 1px #c8d6e5 solid;
`;

const _NewAnswerForm = styled(NewAnswerForm)`
  margin-top: 64px;
`;

const SectionHeading = styled.h2`
  margin-top: 32px;
  font-size: 28px;
  font-weight: bold;
`;

const _AnswerList = styled(AnswerList)`
  margin-top: 32px;
`;
