import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Request } from 'express';
import AuthService from 'src/modules/auth/auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
	constructor(private authService: AuthService) {}

	async canActivate(context: ExecutionContext): Promise<boolean> {
		const req: Request = context.switchToHttp().getRequest();

		const { username, password } = req.cookies;

		if (typeof username == 'string' || typeof password == 'string') {
			if (
				!(await this.authService.login({
					name: username as string,
					password: password as string,
				}))
			) {
				return false;
			}
		} else {
			return false;
		}
		return true;
	}
}
