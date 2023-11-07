import { Injectable, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { loginRsp } from 'proto/auth/login';
import { Logger } from 'winston';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { RedisService } from 'nestjs-redis';
import { JwtService } from '@nestjs/jwt';
import { WxAccessToken } from 'dto/auth/wx_access_token.entity';


@Injectable()
export class AppAuthService {
    constructor(@InjectRepository(WxAccessToken)
    private readonly authRepository:Repository<WxAccessToken>, 
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
    private readonly redisService: RedisService,
    private jwtService: JwtService){}

    async signIn(bid:string, uid: string, token: string){
        // 写登录时间
        var ts = Date.now() / 1000;
        const rst:loginRsp = {
            LastLogin: ts,
        }

        return rst
    }

    async checkSign(bid:string, uid:string, token:string){
        
    }

    genJwt(uid:string, token:string):string{
        return ""
    }
}
