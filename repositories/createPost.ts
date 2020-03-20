import * as firebase from 'firebase';
import { GameType, GameStreetAction } from '../models/GameSituation';
import { PostTitle, PostBody, PostId } from '../models/Post';
import PlayingCard from '../models/PlayingCard';

export interface PostData {
  title: PostTitle;
  body: PostBody;
  gameSituation: PostingGameSituation;
}

export interface PostingGameSituation {
  type: GameType;
  playerLength: number;
  playerStackSizes: number[];
  playerCards: ({
    left: PlayingCard | null;
    right: PlayingCard | null;
  } | null)[];
  heroIndex: number;
  smallBlindSize: number;
  antiSize: number;
  preflop: {
    actions: GameStreetAction[];
  };
  flop?: {
    communityCards: {
      left: PlayingCard | null;
      center: PlayingCard | null;
      right: PlayingCard | null;
    };
    actions: GameStreetAction[];
  };
  turn?: {
    communityCard: PlayingCard | null;
    actions: GameStreetAction[];
  };
  river?: {
    communityCard: PlayingCard | null;
    actions: GameStreetAction[];
  };
}

export type CreatePost = (postData: PostData) => Promise<PostId>;

export function createCreatePost({ firebaseApp }: { firebaseApp: firebase.app.App }): CreatePost {
  return async ({ title, body, gameSituation }) => {
    const createPost = firebaseApp.functions().httpsCallable('createPost');
    const id = await createPost({
      title: title,
      body: body,
      gameSituation: gameSituation
    });

    return (id as unknown) as PostId;
  };
}
