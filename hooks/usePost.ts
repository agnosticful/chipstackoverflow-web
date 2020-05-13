import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import constate from "constate";
import { PostId } from "@@/models/Post";
import { toPost } from "@@/serializers/graphql/post";

export const [PostProvider, usePost] = constate(({ id }: { id: PostId }) => {
  const { data, loading } = useQuery(QUERY, { variables: { id } });

  return {
    post: data?.post ? toPost(data?.post) : null,
    isLoading: loading,
  };
});

const QUERY = gql`
  query getPostById($id: ID!) {
    post(id: $id) {
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
      author {
        id
        name
        profileImageURL
      }
      answers {
        id
        body
        likes
        dislikes
        liked
        disliked
        author {
          id
          name
          profileImageURL
        }
        comments {
          id
          body
          likes
          dislikes
          liked
          disliked
          author {
            id
            name
            profileImageURL
          }
        }
      }
      createdAt
      updatedAt
    }
  }
`;

export default usePost;
