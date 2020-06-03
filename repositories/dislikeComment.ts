import { ApolloClient, gql } from "apollo-boost";
import { CommentId } from "@@/models/Comment";

export default async function dislikeComment(
  commentId: CommentId,
  {
    apolloClient,
    authenticationToken,
  }: {
    apolloClient: ApolloClient<any>;
    authenticationToken: string | null;
  }
): Promise<void> {
  await apolloClient.mutate({
    mutation: MUTATION,
    variables: { commentId },
    context: { headers: { authorization: `Bearer ${authenticationToken}` } },
  });
}

const MUTATION = gql`
  mutation($commentId: ID!) {
    dislikeComment(id: $commentId)
  }
`;
