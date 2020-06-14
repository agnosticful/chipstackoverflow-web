import UserProfile from "@@/models/UserProfile";

export function fromUserProfile(user: UserProfile): Record<string, any> {
  return {
    ...user,
    imageURL: user.imageURL.toJSON(),
  };
}

export function toUserProfile(json: Record<string, any>): UserProfile {
  return (
    {
      ...json,
      imageURL: new URL(json.imageURL),
    } as UserProfile
  );
}
