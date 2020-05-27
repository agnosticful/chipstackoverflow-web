import { useApolloClient } from "@apollo/react-hooks";
import constate from "constate";
import * as React from "react";
import useAuthentication from "@@/hooks/useAuthentication";
import { Myself } from "@@/models/User";
import getMyself from "@@/repositories/getMyself";

export const [MyselfProvider, useMyself] = constate(() => {
  const apolloClient = useApolloClient();
  const { authenticationToken } = useAuthentication();
  const [myself, setMyself] = React.useState<Myself | null>(null);
  const [isLoading, setLoading] = React.useState(true);

  React.useEffect(() => {
    setLoading(true);

    getMyself({ apolloClient, authenticationToken }).then((myself) => {
      setMyself(myself);
      setLoading(false);
    });
  }, [authenticationToken]);

  return { myself, isLoading };
});

export default useMyself;
