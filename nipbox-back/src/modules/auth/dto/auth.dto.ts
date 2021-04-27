import { IsNotEmpty, IsString } from "class-validator";

export default class AuthDto {
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsString()
    password: string;
}