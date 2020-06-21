import { ApolloClient, gql } from "apollo-boost";
import Post from "@@/models/Post";
import PostInputType from "@@/models/PostInput";
import { toPost } from "@@/serializers/graphql/post";

export default async function createPost(
  postInputType: PostInputType,
  {
    apolloClient,
    authenticationToken,
  }: {
    apolloClient: ApolloClient<any>;
    authenticationToken: string;
  }
): Promise<Post> {
  const { data } = await apolloClient.mutate({
    mutation: MUTATION,
    variables: {
      title: postInputType.title,
      body: postInputType.body,
      gameType: postInputType.gameType,
      playerLength: postInputType.playerLength,
      playerStackSizes: postInputType.playerStackSizes,
      playerCards: postInputType.playerCards,
      communityCards: postInputType.communityCards,
      heroIndex: postInputType.heroIndex,
      smallBlindSize: postInputType.smallBlindSize,
      antiSize: postInputType.antiSize,
      preflopActions: postInputType.preflopActions,
      flopActions: postInputType.flopActions,
      turnActions: postInputType.turnActions,
      riverActions: postInputType.riverActions,
    },
    context: { headers: { authorization: `Bearer ${authenticationToken}` } },
  });

  return data.post ? toPost(data.post) : data.post;
}

const MUTATION = gql`
  mutation(
    $title: String!
    $body: String!
    $gameType: GameType!
    $playerLength: Int!
    $playerStackSizes: [Float]!
    $playerCards: [[PlayingCardInput]]!
    $communityCards: [PlayingCardInput]!
    $heroIndex: Int!
    $smallBlindSize: Float!
    $antiSize: Float!
    $preflopActions: [StreetActionInput]!
    $flopActions: [StreetActionInput]!
    $turnActions: [StreetActionInput]!
    $riverActions: [StreetActionInput]!
  ) {
    createPost(
      title: $title
      body: $body
      gameType: $gameType
      playerLength: $playerLength
      playerStackSizes: $playerStackSizes
      playerCards: $playerCards
      communityCards: $communityCards
      heroIndex: $heroIndex
      smallBlindSize: $smallBlindSize
      antiSize: $antiSize
      preflopActions: $preflopActions
      flopActions: $flopActions
      turnActions: $turnActions
      riverActions: $riverActions
    )
  }
`;
