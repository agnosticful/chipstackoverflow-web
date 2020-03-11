export default interface User {
  id: UserId;
  name: UserName;
  profileImageURL: URL;
}

export interface UserId extends String {
  _UserIdBrand: never;
}

export interface UserName extends String {
  _UserNameBrand: never;
}
