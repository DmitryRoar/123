import { Response } from 'express';
import AuthService from './auth.service';
import AuthDto from './dto/auth.dto';
export default class AuthController {
    private authService;
    constructor(authService: AuthService);
    login(dto: AuthDto, res: Response): Promise<void>;
    change(dto: {
        old: string;
        newPass: string;
    }): Promise<true | {
        err: string;
    }>;
    checkAuth(): Promise<boolean>;
}
