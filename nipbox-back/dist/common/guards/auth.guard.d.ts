import { CanActivate, ExecutionContext } from '@nestjs/common';
import AuthService from 'src/modules/auth/auth.service';
export declare class AuthGuard implements CanActivate {
    private authService;
    constructor(authService: AuthService);
    canActivate(context: ExecutionContext): Promise<boolean>;
}
