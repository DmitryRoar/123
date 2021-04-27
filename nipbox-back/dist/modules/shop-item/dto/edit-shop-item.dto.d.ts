import CreateShopItemDto from './create-shop-item.dto';
declare const EditShopItemDto_base: import("@nestjs/mapped-types").MappedType<Partial<CreateShopItemDto>>;
export default class EditShopItemDto extends EditShopItemDto_base {
    id: string;
}
export {};
