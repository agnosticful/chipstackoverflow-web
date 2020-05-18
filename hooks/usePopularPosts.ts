import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import constate from "constate";
import { toPostMinimum } from "@@/serializers/graphql/post";

export const [PopularPostsProvider, usePopularPosts] = constate(() => {
  const { data, loading } = useQuery(QUERY);

  return {
    popularPosts: ((data?.popularPosts as any[]) ?? []).map((item) =>
      toPostMinimum(item)
    ),
    isLoading: loading,
  };
});

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
      updatedAt
    }
  }
`;

export default usePopularPosts;
