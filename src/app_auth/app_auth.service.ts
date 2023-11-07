import { Injectable } from '@nestjs/common';
import { loginRsp } from 'proto/auth/login';

@Injectable()
export class AppAuthService {
  async signIn(bid: string, uid: string, token: string) {
    // 写登录时间
    var ts = Date.now() / 1000;
    const rst: loginRsp = {
      LastLogin: ts,
    };

    return rst;
  }

  async checkSign(bid: string, uid: string, token: string) {}

  genJwt(uid: string, token: string): string {
    return '';
  }
}
