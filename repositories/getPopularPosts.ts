import { ApolloClient, gql } from "apollo-boost";
import { PostMinimum } from "@@/models/Post";
import { toPostMinimum } from "@@/serializers/graphql/post";

export default async function getPopularPosts({
  apolloClient,
}: {
  apolloClient: ApolloClient<any>;
}): Promise<PostMinimum[]> {
  const { data } = await apolloClient.query({ query: QUERY });

  return ((data?.popularPosts as any[]) ?? []).map((item) =>
    toPostMinimum(item)
  );
}

const QUERY = gql`
  query {
    popularPosts {
      id
      title
      body
      gameType
      playerLength
      playerStackSizes
      playerCards {
        rank
        suit
      }
      communityCards {
        rank
        suit
      }
      heroIndex
      smallBlindSize
      antiSize
      preflopActions {
        type
        playerIndex
        betSize
      }
      flopActions {
        type
        playerIndex
        betSize
      }
      turnActions {
        type
        playerIndex
        betSize
      }
      riverActions {
        type
        playerIndex
        betSize
      }
      likes
      dislikes
      createdAt
      lastUpdatedAt
    }
  }
`;
