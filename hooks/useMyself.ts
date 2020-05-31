import { useApolloClient } from "@apollo/react-hooks";
import * as React from "react";
import { atom, useRecoilValue, useSetRecoilState } from "recoil";
import useAuthentication from "@@/hooks/useAuthentication";
import { Myself } from "@@/models/User";
import getMyself from "@@/repositories/getMyself";

const myselfState = atom({
  key: "Myself",
  default: {
    myself: null as Myself | null,
    isLoading: false,
    isInitialized: false,
  },
});

export default function useMyself() {
  const { myself, isLoading, isInitialized } = useRecoilValue(myselfState);

  return { myself, isLoading: isLoading || !isInitialized };
}

export function useMyselfObservation() {
  const { authenticationToken, isLoading } = useAuthentication();
  const apolloClient = useApolloClient();
  const setMyselfState = useSetRecoilState(myselfState);

  React.useEffect(() => {
    if (isLoading) {
      return;
    }

    setMyselfState((previousState) => ({ ...previousState, isLoading: true }));

    getMyself({ apolloClient, authenticationToken }).then((myself) => {
      setMyselfState({ myself, isLoading: false, isInitialized: true });
    });
  }, [authenticationToken, isLoading]);
}
