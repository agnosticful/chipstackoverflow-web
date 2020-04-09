import * as React from "react";
import { Subscription } from "rxjs";
import UserPrivate from "../models/UserPrivate";
import useRepository from "./useRepository";

export default function useAuthentication(): {
  user: UserPrivate | null;
  isFirstChecking: boolean;
  signIn: (objectId: string) => void;
  signOut: () => void;
} {
  const {
    anonymizeUserForLogging,
    logEvent,
    identifyUserForLogging,
    onAuthenticationStateChanged,
    signIn: _signIn,
    signOut: _signOut,
    subscribeUserById,
  } = useRepository();
  const [user, setUser] = React.useState<UserPrivate | null>(null);
  const [isFirstChecking, setFirstChecking] = React.useState(true);

  const signIn = React.useCallback((objectId: string) => {
    logEvent("sign_in", { object_id: objectId });

    _signIn();
  }, []);

  const signOut = React.useCallback(() => {
    logEvent("sign_out");

    _signOut();
  }, []);

  React.useEffect(() => {
    let userSubscription: Subscription | undefined;

    const subscription = onAuthenticationStateChanged.subscribe(
      (userPrivateAttributes) => {
        if (userSubscription) {
          userSubscription.unsubscribe();
        }

        if (userPrivateAttributes) {
          const onUserChanged = subscribeUserById(userPrivateAttributes.id);

          userSubscription = onUserChanged.subscribe((user) => {
            if (!user) {
              return;
            }

            const userPrivate = { ...user, ...userPrivateAttributes };

            identifyUserForLogging(userPrivate);
            setUser(userPrivate);
            setFirstChecking(false);
          });

          return;
        }

        anonymizeUserForLogging();
        setUser(null);
        setFirstChecking(false);
      }
    );

    return () => {
      userSubscription?.unsubscribe();
      subscription.unsubscribe();
    };
  }, []);

  return { user, isFirstChecking, signIn, signOut };
}
