import ShopItemEntity from '../../entities/ShopItem.entity';
import FileService from '../file/file.service';
import CreateShopItemDto from './dto/create-shop-item.dto';
import EditShopItemDto from './dto/edit-shop-item.dto';
export default class ShopItemService {
    private fileService;
    constructor(fileService: FileService);
    getShopItem(id: string): Promise<ShopItemEntity>;
    excludeAndTake(id: string, amount: number): Promise<ShopItemEntity[]>;
    getShopItems(): Promise<ShopItemEntity[]>;
    uploadSlide(id: string, slide: any): Promise<void>;
    removeSlide(id: string, slideName: string): Promise<void>;
    changeOrder(ordered: {
        order: number;
        id: string;
    }[]): Promise<boolean>;
    createShopItem(dto: CreateShopItemDto, opened: any, closed: any): Promise<ShopItemEntity>;
    editShopItem(dto: EditShopItemDto, oepend: any, closed: any): Promise<boolean>;
    removeShopItem(id: string): Promise<boolean>;
}
