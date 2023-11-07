import { Injectable, CanActivate, ExecutionContext, UnauthorizedException} from "@nestjs/common";
import { AppAuthService} from "src/app_auth/app_auth.service";


@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private readonly authService:AppAuthService) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const req = context.switchToHttp().getRequest();
        console.log("cookie:", req.cookies)
        
        // 从cookie中拿出uid、token
        if (req.cookies == null || req.cookies.uid == null) {
            throw new UnauthorizedException();
        }
        
        if (req.cookies.access_token == null){
            throw new UnauthorizedException()
        }

        const uid:string = req.cookies.uid
        const token:string = req.cookies.access_token
        const bid:string = req.cookies.bid

        // 查询登录态
        let authObj = this.authService.signIn(bid, uid, token)
        if (authObj == null){
            throw new UnauthorizedException()
        }

        return true
    }
}