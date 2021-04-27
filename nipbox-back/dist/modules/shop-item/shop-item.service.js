"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const uuid_1 = require("uuid");
const ShopItem_entity_1 = require("../../entities/ShopItem.entity");
const file_service_1 = require("../file/file.service");
let ShopItemService = class ShopItemService {
    constructor(fileService) {
        this.fileService = fileService;
    }
    async getShopItem(id) {
        return await ShopItem_entity_1.default.findOne({
            where: {
                id: id,
            },
        });
    }
    async excludeAndTake(id, amount) {
        const items = await ShopItem_entity_1.default.createQueryBuilder()
            .where(`id != ${id}`)
            .orderBy('random()')
            .take(amount)
            .getMany();
        return items;
    }
    async getShopItems() {
        return await ShopItem_entity_1.default.find({
            where: {
                hidden: false,
            },
        });
    }
    async uploadSlide(id, slide) {
        const item = await ShopItem_entity_1.default.findOne({
            where: {
                id: id,
            },
        });
        if (item && slide) {
            const id = uuid_1.v4();
            this.fileService.saveFile(`slide-${id}.png`, 'shopitem-slide', slide);
            item.media.imgs.push(`slide-${id}.png`);
            await item.save();
        }
    }
    async removeSlide(id, slideName) {
        const item = await ShopItem_entity_1.default.findOne({
            where: {
                id: id,
            },
        });
        const index = item.media.imgs.findIndex((s) => s === slideName);
        item.media.imgs.splice(index, 1);
        await item.save();
    }
    async changeOrder(ordered) {
        ordered.forEach((i, index) => {
            ShopItem_entity_1.default.update({
                id: i.id,
            }, {
                order: index,
            });
        });
        return true;
    }
    async createShopItem(dto, opened, closed) {
        const shopItem = new ShopItem_entity_1.default();
        shopItem.amountDesc = dto.amountDesc;
        shopItem.name = dto.name;
        shopItem.desc = dto.desc;
        shopItem.weight = dto.weight;
        shopItem.order = 0;
        shopItem.mini = dto.mini;
        shopItem.height = dto.height;
        shopItem.width = dto.width;
        shopItem.length = dto.length;
        shopItem.seoDesc = dto.seoDesc;
        shopItem.seoTags = dto.seoTags;
        shopItem.price = parseInt(dto.price.toString());
        await shopItem.save();
        if (opened) {
            this.fileService.saveFile(`opened-${shopItem.id}.png`, 'shopitem', opened);
            shopItem.media.opened = `opened-${shopItem.id}.png`;
        }
        if (closed) {
            this.fileService.saveFile(`closed-${shopItem.id}.png`, 'shopitem', closed);
            shopItem.media.closed = `closed-${shopItem.id}.png`;
        }
        shopItem.order = parseInt(shopItem.id);
        await shopItem.save();
        return shopItem;
    }
    async editShopItem(dto, oepend, closed) {
        const item = await ShopItem_entity_1.default.findOne({ where: { id: dto.id } });
        item.amountDesc = dto.amountDesc;
        item.desc = dto.desc;
        item.mini = dto.mini;
        item.price = dto.price;
        item.weight = dto.weight;
        item.height = dto.height;
        item.width = dto.width;
        item.length = dto.length;
        console.log(dto.seoDesc);
        item.seoDesc = dto === null || dto === void 0 ? void 0 : dto.seoDesc;
        item.seoTags = dto === null || dto === void 0 ? void 0 : dto.seoTags;
        await item.save();
        if (oepend) {
            this.fileService.saveFile(`opened-${dto.id}.png`, 'shopitem', oepend);
        }
        if (closed) {
            this.fileService.saveFile(`closed-${dto.id}.png`, 'shopitem', closed);
        }
        return true;
    }
    async removeShopItem(id) {
        await ShopItem_entity_1.default.update({
            id: id,
        }, {
            hidden: true
        });
        return true;
    }
};
ShopItemService = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [file_service_1.default])
], ShopItemService);
exports.default = ShopItemService;
//# sourceMappingURL=shop-item.service.js.map