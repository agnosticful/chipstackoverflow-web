import User from "@@/models/User";

export function fromUser(user: User): Record<string, any> {
  return {
    ...user,
    profileImageURL: user.profileImageURL.toJSON(),
  };
}

export function toUser(json: Record<string, any>): User {
  return (
    {
      ...json,
      profileImageURL: new URL(json.profileImageURL),
    } as User
  );
}
