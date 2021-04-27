import { BaseEntity } from "typeorm";
export default class Review extends BaseEntity {
    id: string;
    avatarLink: string;
    text: string;
    name: string;
    link: string;
}
