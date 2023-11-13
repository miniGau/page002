export interface IAuth {
  userId: number;
  authType: number;
  token: string;
  created: number;
  expired: number;
}

export interface IUser {
  id: string;
  userId: number;
  email: string;
  picture: string;
  userName: string;
}
