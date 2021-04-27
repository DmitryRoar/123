import { BaseEntity } from "typeorm";
export default class UserEntity extends BaseEntity {
    id: string;
    username: string;
    password: string;
}
