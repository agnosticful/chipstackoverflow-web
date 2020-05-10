import User, { Myself } from "../../models/User";

export function toUser(value: any): User {
  return {
    id: value.id,
    name: value.name,
    profileImageURL: new URL(value.profileImageURL),
  };
}

export function toMyself(value: any): Myself {
  return {
    ...toUser(value),
    email: value.email,
  };
}
