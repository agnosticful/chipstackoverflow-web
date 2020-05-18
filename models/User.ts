export default interface User {
  id: UserId;
  name: UserName;
  profileImageURL: URL;
}

export interface Myself extends User {
  email: UserEmail;
}

export type UserId = string & {
  _UserIdBrand: never;
};

export type UserName = string & {
  _UserNameBrand: never;
};

export type UserEmail = string & {
  _UserEmailBrand: never;
};
