import CreateShopItemDto from './dto/create-shop-item.dto';
import EditShopItemDto from './dto/edit-shop-item.dto';
import OrderChangeDto from './dto/order-change.dto';
import ShopItemService from './shop-item.service';
export default class ShopItemController {
    private shopItemService;
    constructor(shopItemService: ShopItemService);
    create(data: CreateShopItemDto, files: any): Promise<import("../../entities/ShopItem.entity").default>;
    uploadSlide(body: any, file: any): Promise<void>;
    order(dto: OrderChangeDto): Promise<boolean>;
    removeSlide(body: any): Promise<void>;
    edit(data: EditShopItemDto, files: any): Promise<boolean>;
    excludeAndTake(id: string, amount: string): Promise<import("../../entities/ShopItem.entity").default[]>;
    remove(id: string): Promise<boolean>;
    getOne(id: string): Promise<import("../../entities/ShopItem.entity").default>;
    getAll(): Promise<import("../../entities/ShopItem.entity").default[]>;
}
