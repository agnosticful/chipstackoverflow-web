import * as React from "react";
import User, { UserId } from "../models/User";
import useRepository from "./useRepository";

export default function useUserById(
  userId: UserId
): {
  user: User | null;
  isFirstLoading: boolean;
} {
  const { subscribeUserById } = useRepository();
  const [user, setUser] = React.useState<User | null>(null);
  const [isFirstLoading, setFirstLoading] = React.useState(true);

  React.useEffect(() => {
    setFirstLoading(true);

    const subscription = subscribeUserById(userId).subscribe(user => {
      if (!user) {
        throw new Error(`The user (id: ${userId}) doesn't exist.`);
      }

      setUser(user);
      setFirstLoading(false);
    });

    return () => subscription.unsubscribe();
  }, [userId]);

  return { user, isFirstLoading };
}
