import { ApolloClient, gql } from "apollo-boost";
import Answer, { AnswerBody } from "@@/models/Answer";
import { PostId } from "@@/models/Post";
import { toAnswer } from "@@/serializers/graphql/answer";

export default async function createAnswer({
  postId,
  body,
  apolloClient,
  authenticationToken,
}: {
  postId: PostId;
  body: AnswerBody;
  apolloClient: ApolloClient<any>;
  authenticationToken: string;
}): Promise<Answer> {
  const { data } = await apolloClient.mutate({
    mutation: MUTATION,
    variables: { postId, body },
    context: { headers: { authorization: `Bearer ${authenticationToken}` } },
  });

  return toAnswer(data.createAnswer);
}

const MUTATION = gql`
  mutation($postId: ID!, $body: String!) {
    createAnswer(postId: $postId, body: $body) {
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
  }
`;
