import { ApolloClient, gql } from "apollo-boost";
import { AnswerId } from "@@/models/Answer";
import { PostId } from "@@/models/Post";

export default async function unlikeAnswer({
  postId,
  answerId,
  apolloClient,
  authenticationToken,
}: {
  postId: PostId;
  answerId: AnswerId;
  apolloClient: ApolloClient<any>;
  authenticationToken: string;
}): Promise<void> {
  await apolloClient.mutate({
    mutation: MUTATION,
    variables: { postId, answerId },
    context: { headers: { authorization: `Bearer ${authenticationToken}` } },
  });
}

const MUTATION = gql`
  mutation($postId: ID!, $answerId: ID!) {
    unlikeAnswer(postId: $postId, answerId: $answerId)
  }
`;
