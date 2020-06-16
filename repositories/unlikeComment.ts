import { ApolloClient, gql } from "apollo-boost";
import { CommentId } from "@@/models/Comment";
import { PostId } from "@@/models/Post";
import { AnswerId } from "@@/models/Answer";

export default async function unlikeComment({
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
    unlikeComment(postId: $postId, answerId: $answerId, commentId: $commentId)
  }
`;
