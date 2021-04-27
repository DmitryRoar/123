import CreatePromocodeDto from "./dto/create-promocode.dto";
import PromocodesService from "./promocodes.service";
export default class PromocodeController {
    private promocodeService;
    constructor(promocodeService: PromocodesService);
    findPromocode(name: string): Promise<import("../../entities/Promocode.entity").default>;
    all(): Promise<import("../../entities/Promocode.entity").default[]>;
    create(dto: CreatePromocodeDto): Promise<boolean>;
    remove(id: string): Promise<boolean>;
}
