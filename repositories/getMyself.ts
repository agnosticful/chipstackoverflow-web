import { ApolloClient, ApolloError, gql } from "apollo-boost";
import { Myself } from "@@/models/User";
import { toMyself } from "@@/serializers/graphql/user";

export default async function getMyself({
  apolloClient,
  authenticationToken,
}: {
  apolloClient: ApolloClient<any>;
  authenticationToken: string | null;
}): Promise<Myself | null> {
  try {
    const { data } = await apolloClient.query({
      query: MYSELF_QUERY,
      context: { headers: { authorization: `Bearer ${authenticationToken}` } },
    });

    return toMyself(data.myself);
  } catch (error) {
    if (
      error instanceof ApolloError &&
      error.message.includes("Authentication is required")
    ) {
      return null;
    }

    throw error;
  }
}

const MYSELF_QUERY = gql`
  {
    myself {
      id
      email
      name
      profileImageURL
    }
  }
`;
