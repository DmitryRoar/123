import { Body, Controller, Get, HttpException, HttpStatus, Post, Res, UseGuards } from '@nestjs/common';
import { Response } from 'express';
import { AuthGuard } from '../../common/guards/auth.guard';
import AuthService from './auth.service';
import AuthDto from './dto/auth.dto';

@Controller('auth')
export default class AuthController {
	constructor(private authService: AuthService) {}

	@Post('login')
	async login(@Body() dto: AuthDto, @Res() res: Response) {
		const user = await this.authService.login(dto);
		if (!user) {
			throw new HttpException('No such user', HttpStatus.UNAUTHORIZED);
		}

		res.cookie('username', user.username);
		res.cookie('password', user.password);

		res.send({
			succes: true,
		});
	}

	@UseGuards(AuthGuard)
	@Post('change')
	async change(@Body() dto: { old: string; newPass: string }) {
		return await this.authService.changePassword(dto.old, dto.newPass);
	}
	@UseGuards(AuthGuard)
	@Get('check')
	async checkAuth() {
		return true;
	}
}
