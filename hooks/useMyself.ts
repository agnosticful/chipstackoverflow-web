import { useApolloClient } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import constate from "constate";
import * as React from "react";
import { Myself } from "../models/User";
import { toMyself } from "../serializers/graphql/user";
import useAuthentication from "./useAuthentication";

export const [MyselfProvider, useMyself] = constate(() => {
  const apolloClient = useApolloClient();
  const { authenticationToken } = useAuthentication();
  const [myself, setMyself] = React.useState<Myself | null>(null);
  const [isLoading, setLoading] = React.useState<boolean>(true);

  React.useEffect(() => {
    if (authenticationToken) {
      setLoading(true);

      apolloClient
        .query({ query: MYSELF_QUERY })
        .then(({ data }) => {
          setMyself(toMyself(data.myself));
          setLoading(false);
        })
        .catch(() => {
          setMyself(null);
          setLoading(false);
        });
    } else {
      setMyself(null);
      setLoading(false);
    }
  }, [apolloClient, authenticationToken]);

  return { myself, isLoading };
});

const MYSELF_QUERY = gql`
  {
    myself {
      id
      email
      name
      profileImageURL
    }
  }
`;

export default useMyself;
