import UserEntity from '../../entities/User.entity';
import AuthDto from './dto/auth.dto';
export default class AuthService {
    login(data: AuthDto): Promise<false | UserEntity>;
    changePassword(old: string, newPass: string): Promise<true | {
        err: string;
    }>;
}
