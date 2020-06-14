export default interface User {
  id: UserId;
  name: UserName;
  imageURL: URL;
}

export type UserId = string & {
  _UserIdBrand: never;
};

export type UserName = string & {
  _UserNameBrand: never;
};
