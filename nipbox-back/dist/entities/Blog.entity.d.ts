import { BaseEntity } from 'typeorm';
export default class BlogEntity extends BaseEntity {
    id: string;
    desc: string;
    img: string;
    text: string;
    url: string;
    groupId: string;
    isChildren: boolean;
    order: string;
}
