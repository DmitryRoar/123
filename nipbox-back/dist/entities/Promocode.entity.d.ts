import { BaseEntity } from "typeorm";
export default class Promocode extends BaseEntity {
    id: string;
    codeName: string;
    precentage: number;
}
