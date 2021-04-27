import { Injectable } from '@nestjs/common';
import UserEntity from '../../entities/User.entity';
import AuthDto from './dto/auth.dto';

@Injectable()
export default class AuthService {
	async login(data: AuthDto) {
		const user = await UserEntity.findOne({
			where: {
				username: data.name,
				password: data.password
			},
		});

		if (user) {
			return user;
		} else {
			return false;
		}
	}

	async changePassword(old: string, newPass: string) {
		console.log(old, newPass)
		const user = await UserEntity.findOne({
			where: {
				password: old,
			},
		});

		if (!user)
			return {
				err: 'Старый пароль - неверен',
			};

		user.password = newPass;
		await user.save();

		return true;
	}
}
