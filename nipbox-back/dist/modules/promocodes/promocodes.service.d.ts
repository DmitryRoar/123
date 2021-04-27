import Promocode from '../../entities/Promocode.entity';
export default class PromocodesService {
    findByName(name: string): Promise<Promocode>;
    create(name: string, precentage: number): Promise<boolean>;
    all(): Promise<Promocode[]>;
    remove(id: string): Promise<boolean>;
}
