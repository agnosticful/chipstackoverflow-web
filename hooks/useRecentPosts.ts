import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import constate from "constate";
import { toPostMinimum } from "../serializers/graphql/post";

export const [RecentPostsProvider, useRecentPosts] = constate(() => {
  const { data, loading } = useQuery(QUERY);

  return {
    recentPosts: ((data?.recentPosts as any[]) ?? []).map((item: any) =>
      toPostMinimum(item)
    ),
    isLoading: loading,
  };
});

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
      updatedAt
    }
  }
`;

export default useRecentPosts;
