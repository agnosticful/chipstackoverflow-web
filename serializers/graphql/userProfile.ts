import UserProfile from "@@/models/UserProfile";

export function toUserProfile(value: any): UserProfile {
  return {
    id: value.id,
    name: value.name,
    imageURL: new URL(value.imageURL),
  };
}
