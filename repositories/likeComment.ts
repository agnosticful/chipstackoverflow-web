import { ApolloClient, gql } from "apollo-boost";
import { AnswerId } from "@@/models/Answer";
import { CommentId } from "@@/models/Comment";
import { PostId } from "@@/models/Post";

export default async function likeComment({
  postId,
  answerId,
  commentId,
  apolloClient,
  authenticationToken,
}: {
  postId: PostId;
  answerId: AnswerId;
  commentId: CommentId;
  apolloClient: ApolloClient<any>;
  authenticationToken: string;
}): Promise<void> {
  await apolloClient.mutate({
    mutation: MUTATION,
    variables: { postId, answerId, commentId },
    context: { headers: { authorization: `Bearer ${authenticationToken}` } },
  });
}

const MUTATION = gql`
  mutation($postId: ID!, $answerId: ID!, $commentId: ID!) {
    likeComment(postId: $postId, answerId: $answerId, commentId: $commentId)
  }
`;
