import User from "./User";

export default interface UserPrivate extends User {
  email?: UserEmail;
}

export type UserEmail = string & {
  _UserEmailBrand: never;
};
