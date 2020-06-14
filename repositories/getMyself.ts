import { ApolloClient, ApolloError, gql } from "apollo-boost";
import User from "@@/models/UserProfile";
import { toUserProfile } from "@@/serializers/graphql/userProfile";

export default async function getMyself({
  apolloClient,
  authenticationToken,
}: {
  apolloClient: ApolloClient<any>;
  authenticationToken: string | null;
}): Promise<User | null> {
  try {
    const { data } = await apolloClient.query({
      query: MYSELF_QUERY,
      context: { headers: { authorization: `Bearer ${authenticationToken}` } },
    });

    return toUserProfile(data.myself);
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
      name
      imageURL
    }
  }
`;
