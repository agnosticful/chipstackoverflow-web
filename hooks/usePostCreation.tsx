import { HandAction } from "@@/models/Hand";
import Post from "@@/models/Post";

export default function usePostCreation() {
  const post: {
    playerLength: number;
    preflop: HandAction[];
    flop: HandAction[];
    turn: HandAction[];
    river: HandAction[];
  } = {
    playerLength: 2,
    preflop: [],
    flop: [],
    turn: [],
    river: [],
  };

  const postValidation = {
    a: new Set(),
    b: new Set(),
    c: new Set(),
    validated: false,
  };

  const createPost = (): Promise<Post> => {
    return new Promise(() => {});
  };

  return {
    post,
    postValidation,
    createPost,
  };
}
