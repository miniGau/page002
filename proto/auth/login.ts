/**
 * 登录相关：请求路径：
 */
export class loginReq {}

export class loginRsp {
  LastLogin: number;
}

export class RegisterUserDto {
  username: string;
  email: string;
  id: string;
}
