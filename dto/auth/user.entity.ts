export class User {
  id: string;
  userId: number;
  email: string;
  picture: string;
  username: string;
  authType: number;
  jwtToken: string;
  created: number;
  expired: number;
}

export const TbUserName = 'tb_user_info';
