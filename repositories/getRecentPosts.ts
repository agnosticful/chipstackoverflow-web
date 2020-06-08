import { ApolloClient, gql } from "apollo-boost";
import { PostMinimum } from "@@/models/Post";
import { toPostMinimum } from "@@/serializers/graphql/post";

export default async function getRecentPosts({
  apolloClient,
}: {
  apolloClient: ApolloClient<any>;
}): Promise<PostMinimum[]> {
  const { data } = await apolloClient.query({
    query: QUERY,
  });

  return ((data?.recentPosts as any[]) ?? []).map((item) =>
    toPostMinimum(item)
  );
}

const QUERY = gql`
  query {
    recentPosts {
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
