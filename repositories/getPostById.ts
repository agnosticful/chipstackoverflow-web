import { ApolloClient, gql } from "apollo-boost";
import Post, { PostId } from "@@/models/Post";
import { toPost } from "@@/serializers/graphql/post";

export default async function getPostById(
  postId: PostId,
  {
    apolloClient,
    authenticationToken,
  }: {
    apolloClient: ApolloClient<any>;
    authenticationToken: string | null;
  }
): Promise<Post> {
  const { data } = await apolloClient.query({
    query: QUERY,
    variables: { postId },
    context: { headers: { authorization: `Bearer ${authenticationToken}` } },
  });

  return data.post ? toPost(data.post) : data.post;
}

const QUERY = gql`
  query getPostById($postId: ID!) {
    post(postId: $postId) {
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
        imageURL
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
          imageURL
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
            imageURL
          }
          createdAt
          lastUpdatedAt
        }
        createdAt
        lastUpdatedAt
      }
      createdAt
      lastUpdatedAt
    }
  }
`;
