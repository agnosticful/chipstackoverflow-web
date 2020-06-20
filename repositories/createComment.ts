import { ApolloClient, gql } from "apollo-boost";
import { AnswerId } from "@@/models/Answer";
import Comment, { CommentBody } from "@@/models/Comment";
import { PostId } from "@@/models/Post";
import { toComment } from "@@/serializers/graphql/comment";

export default async function createComment({
  postId,
  answerId,
  body,
  apolloClient,
  authenticationToken,
}: {
  postId: PostId;
  answerId: AnswerId;
  body: CommentBody;
  apolloClient: ApolloClient<any>;
  authenticationToken: string;
}): Promise<Comment> {
  const { data } = await apolloClient.mutate({
    mutation: MUTATION,
    variables: { postId, answerId, body },
    context: { headers: { authorization: `Bearer ${authenticationToken}` } },
  });

  return toComment(data.createComment);
}

const MUTATION = gql`
  mutation($postId: ID!, $answerId: ID!, $body: String!) {
    createComment(postId: $postId, answerId: $answerId, body: $body) {
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
  }
`;
