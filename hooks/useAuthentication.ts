import * as React from "react";
import useRepository from "../core/useRepository";

export default function useAuthentication(): {
  isSignedIn: boolean;
  isFirstChecking: boolean;
  signIn: () => void;
  signOut: () => void;
} {
  const { onAuthenticationStateChanged, signIn, signOut } = useRepository();
  const [isSignedIn, setSignedIn] = React.useState(false);
  const [isFirstChecking, setFirstChecking] = React.useState(true);

  React.useEffect(() => {
    const subscription = onAuthenticationStateChanged.subscribe(iss => {
      setFirstChecking(false);
      setSignedIn(iss);
    });

    return () => subscription.unsubscribe();
  }, []);

  return { isSignedIn, isFirstChecking, signIn, signOut };
}
