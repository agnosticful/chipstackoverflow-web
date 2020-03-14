import * as React from "react";
import { Subscription } from "rxjs";
import User from "../models/User";
import useRepository from "./useRepository";

export default function useAuthentication(): {
  user: User | null;
  isFirstChecking: boolean;
  signIn: (objectId: string) => void;
  signOut: () => void;
} {
  const {
    logEvent,
    onAuthenticationStateChanged,
    setUserIdForLogging,
    signIn: _signIn,
    signOut,
    subscribeUserById
  } = useRepository();
  const [user, setUser] = React.useState<User | null>(null);
  const [isFirstChecking, setFirstChecking] = React.useState(true);

  const signIn = React.useCallback((objectId: string) => {
    logEvent("sign_in", { object_id: objectId });

    _signIn();
  }, []);

  React.useEffect(() => {
    let userSubscription: Subscription | void;

    const subscription = onAuthenticationStateChanged.subscribe(userId => {
      if (userSubscription) {
        userSubscription.unsubscribe();
      }

      if (userId) {
        const onUserChanged = subscribeUserById(userId);

        userSubscription = onUserChanged.subscribe(user => {
          setUser(user);
          setFirstChecking(false);
        });

        return;
      }

      setFirstChecking(false);
      setUser(null);
    });

    return () => subscription.unsubscribe();
  }, []);

  return { user, isFirstChecking, signIn, signOut };
}
